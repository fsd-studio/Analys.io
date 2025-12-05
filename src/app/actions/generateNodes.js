import { GoogleGenAI } from "@google/genai";

/**
 * Initialize Gemini client
 * Store your API key safely in an environment variable:
 * process.env.GEMINI_API_KEY
 */
const ai = new GoogleGenAI({
  apiKey: "AIzaSyAeGA4iq80Uslqoyht46ppoCxleXSi7_Sk",
});

/**
 * Generate a structured argument graph from a transcript
 */
export async function generateNodes(transcriptObject) {
  try {
    /**
     * Convert transcript to structured text input
     */
    const transcriptString = transcriptObject
      .map((line) => {
        const person = line.primary ? "primary" : "secondary";
        return `${line.id} (${person}): ${line.content}`;
      })
      .join("\n");

    /**
     * JSON schema enforcing branching argument structure
     */
    const debateGraphSchema = {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: "https://example.com/schemas/debate-graph.json",
      title: "Debate Graph",
      description: "Structured argument map with correct parent targeting",
      type: "object",
      properties: {
        title: { type: "string" },
        initialNodes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              MessageID: { type: "string" },
              id: { type: "string" },
              type: {
                type: "string",
                enum: ["premise", "argument", "counterargument"],
              },
              data: {
                type: "object",
                properties: {
                  label: { type: "string" },
                  "content": {
                    "description": "The full, original message text from the transcript (corresponding to MessageID).",
                    "type": "string"
                  },
                  person: {
                    type: "string",
                    enum: ["primary", "secondary"],
                  },
                },
                required: ["label", "person"],
                
              },
              
            },
            required: ["MessageID", "id", "type", "data"],
          },
        },
              "fallacies": {
                "description": "A list of logical fallacies identified in this specific statement.",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "description": "The common name of the logical fallacy (e.g., 'Straw Man', 'Ad Hominem').",
                            "type": "string"
                        },
                        "explanation": {
                            "description": "A brief explanation of why this statement constitutes that specific fallacy.",
                            "type": "string"
                        }
                    },
                    "required": ["name", "explanation"]
                },
                "default": [] // It's an optional field
            },
        initialEdges: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              source: { type: "string" },
              target: { type: "string" },
            },
            required: ["id", "source", "target"],
          },
        },
      },
      required: ["title", "initialNodes", "initialEdges", "fallacies"],
    };

    /**
     * SYSTEM INSTRUCTIONS
     * These rules FORCE correct tree-like structure
     */
    const systemInstructions = `
You are an expert argument map generator.
Your task is to analyze a debate transcript and produce a structured JSON argument graph.
The output MUST strictly follow the provided JSON schema.
Do NOT output markdown, commentary, or explanations.
–––––––––––––––––––––––––
CORE EXTRACTION RULES
–––––––––––––––––––––––––
1. Node Types:
   - Premises introduce the main claim(s).
   - Arguments support or oppose a premise or another argument.
   - Counterarguments directly refute a specific argument or counterargument.
2. Root Rule:
   - All premises must be root-level nodes.
   - The first premise must be n0.
3. Premise Children Rule (CRITICAL):
   - Any statement that SUPPORTS or OPPOSES the MAIN PREMISE
     must attach DIRECTLY to the premise, regardless of where
     it appears in the transcript.
4. Argument Targeting Rule:
   - ONLY attach a statement to another argument if it explicitly
     replies to, refutes, qualifies, or corrects that exact argument.
   - Do NOT attach nodes based on chronological order.
5. Counterargument Rule:
   - A counterargument must attach to the specific argument it counters.
   - A counterargument to a counterargument must attach to that counterargument.
6. Single-Parent Rule (MANDATORY):
   - EACH node may have AT MOST ONE parent edge.
   - A node must NEVER attach to multiple parents.
   - If a statement could plausibly respond to more than one prior node,
     you MUST choose the strongest and most direct semantic target.
   - Do NOT duplicate nodes to attach them to multiple parents.
7. Agreement Rule:
   - If a message begins with agreement ("I agree", "True", etc.)
     but introduces a new claim,
     ignore the agreement portion and use ONLY the new claim.
8. Repetition Rule:
   - If a message semantically repeats an earlier claim without adding
     new substance, DO NOT create a new node.
9. No Forced Chains:
   - Never create linear chains by default.
   - Attachment must be semantically justified.
10. Fallacy Detection: copy the full original text of the message into the data.content field.
   - For every node, carefully analyze the claim for any logical fallacies. If one or more fallacies are found, populate the 'fallacies' array with the 'name' and a concise 'explanation' as defined in the schema. If no major fallacies are detected, the 'fallacies' array must be an empty list [].
      
–––––––––––––––––––––––––
EDGE CONSTRAINTS
–––––––––––––––––––––––––
- The graph must be a DAG.
- No cycles.
- Each node has zero or one parent.
- Multiple siblings under a premise are expected.
`;

    /**
     * User content
     */
    const apiContents = [
      {
        role: "user",
        parts: [
          {
            text: `
Analyze the following transcript and generate the argument map.
TRANSCRIPT:
${transcriptString}
`,
          },
        ],
      },
    ];

    /**
     * Gemini API call
     */
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: apiContents,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: debateGraphSchema,
        systemInstruction: systemInstructions,
      },
    });

    /**
     * Defensive parsing
     */
    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch (err) {
      console.error("Invalid JSON returned:", response.text);
      return { error: "Model returned invalid JSON." };
    }

    return parsed;

  } catch (error) {
    console.error("Gemini API failure:", error);
    return { error: error.message };
  }
}