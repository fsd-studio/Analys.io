import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAFsCpDedNK0nHBY9qFHBzTSulbSLnauNw" });

export async function generateNodes(
    transcriptObject
) {

  try {
    const transcriptString = transcriptObject.map((line) => {
      const speakerCategory = line.primary ? "primary" : "secondary";
      return (`${line.id} (${speakerCategory}): ${line.content}`); 
    })
    .join('\n');

    const apiContents = [
      {
        role: "user",
        parts: [
          {
            text: `Please analyze the following transcript and generate the argument map structure based strictly on the provided JSON Schema.
            The output MUST be a JSON object, with no introductory text, markdown fences (like \`\`\`json), or conversational filler.

            Transcript to analyze:
            ${transcriptString}`,
          },
        ],
      },
    ];

    const debateGraphSchema = {
      "$schema": "[https://json-schema.org/draft/2020-12/schema](https://json-schema.org/draft/2020-12/schema)",
      "$id": "[https://example.com/schemas/debate-graph.json](https://example.com/schemas/debate-graph.json)",
      "title": "Debate Graph (Flattened)",
      "description": "A structured representation of a debate or discussion, flattened for robust Gemini API output.",
      "type": "object",
      "properties": {
        "title": {
          "description": "A concise, descriptive title for the debate.",
          "type": "string"
        },
        "initialNodes": {
          "description": "A list of all statements (nodes) in the debate.",
          "type": "array",
          "items": {
            "title": "Debate Node",
            "description": "Represents a single statement or point in the debate graph.",
            "type": "object",
            "properties": {
              "MessageID": {
                "description": "MessageID: A message identifier, which references the original message given in the transript (m0, m1, m2, ...).",
                "type": "string"
              },
              "id": {
                "description": "Sequential graph ID used for linking (e.g., 'n0', 'n1').",
                "type": "string"
              },
              "type": {
                "description": "The logical type of the statement.",
                "type": "string",
                "enum": ["premise", "argument", "counterargument"]
              },
              "data": {
                "description": "Contains the content and metadata of the node.",
                "type": "object",
                "properties": {
                  "label": {
                    "description": "A brief summary of the statement.",
                    "type": "string"
                  },
                  "content": {
                    "description": "The full, original message text from the transcript (corresponding to MessageID).",
                    "type": "string"
                  },
                  "person": {
                    "description": "The speaker category.",
                    "type": "string",
                    "enum": ["primary", "secondary"]
                  }
                },
                "required": ["label", "person"]
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
            }
            },
            "required": ["MessageID", "id", "type", "data", "fallacies"]
          }
        },
        "initialEdges": {
          "description": "A list of connections (edges) between the debate nodes.",
          "type": "array",
          "items": {
            "title": "Debate Edge",
            "description": "Represents a directed link from one debate node to another.",
            "type": "object",
            "properties": {
              "id": {
                "description": "Unique identifier for the edge (e.g., 'e1', 'e2').",
                "type": "string"
              },
              "source": {
                "description": "The id of the statement this edge originates from.",
                "type": "string"
              },
              "target": {
                "description": "The id of the statement this edge points to.",
                "type": "string"
              }
            },
            "required": ["id", "source", "target"]
          }
        }
      },
      "required": ["title", "initialNodes", "initialEdges"]
    };

    const systemInstructions = `
      You are an expert Argument Map Generator. Your task is to analyze a conversation transcript and output a structured JSON argument map representing the logical flow of substantive claims only.
      
      Conversion Rules:
      1. Strict JSON Format: The output must strictly follow the provided JSON Schema. DO NOT output anything besides the final JSON object.
      2. ID Structure: Every node object must contain two primary ID fields:
         • MessageID: A message identifier, which references the original message given in the transcript (e.g., m0, m1, m2).
         • id: A sequential graph identifier, starting at n0 (e.g., n0, n1, n2).
      3. Logical Segmentation: Identify and segment only the substantive premises, arguments, and counterarguments that logically advance the debate. Exclude conversational filler or simple procedural questions (e.g., "Okay, why?", "What do you think?").
      4. Root Nodes: The first node (n0) must have "type": "premise". If there are multiples premises make a root node for each of them. NEVER have duplicate node id's
      5. Data Fields: Accurately summarize the claim in the data.label field, copy the full original text of the message into the data.content field, and identify the speaker in data.person as "primary" or "secondary" based on the transcript line's speaker category.
      6. Edge Logic (DAG): Create initialEdges using the sequential id (e.g., n0 → n1, n1 → n2) to connect arguments logically.
      7. Present edges in a logical fashion. Arguments are made for premises, therefore they should be attached to them. Counterarguments must be attached to a previous counterargument or a normal argument.
      8. Fallacy Detection: For every node, carefully analyze the claim for any logical fallacies. If one or more fallacies are found, populate the 'fallacies' array with the 'name' and a concise 'explanation' as defined in the schema. If no major fallacies are detected, the 'fallacies' array must be an empty list [].
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: apiContents,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: debateGraphSchema,
        systemInstruction: systemInstructions,
      },
    });

    const jsonString = response.text;
    
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/m);

    if (!jsonMatch) {
      console.error("Gemini API error: Response did not contain a parsable JSON object.");
      return { error: "Gemini response was not a parsable JSON object." };
    }

    const cleanedJsonString = jsonMatch[0];
    const parsedJson = JSON.parse(cleanedJsonString);

    console.log("Gemini API Raw Response:", response);
    console.log("Parsed Argument Map:", parsedJson);

    return parsedJson;

  } catch (error) {
    console.error("Gemini API error:", error);

    return { error: `Gemini API call failed: ${error.message}` };
  }
}