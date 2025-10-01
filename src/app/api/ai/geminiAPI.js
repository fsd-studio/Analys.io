import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAFsCpDedNK0nHBY9qFHBzTSulbSLnauNw" });


export async function geminiAnalysis({
    contents
}) {

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
          systemInstruction: "You are a helpful assistant that provides concise and clear analysis of conversations.",
        },
      }
    });
  
    if (response !== null) return response;
  } catch (error) {
    console.error("Gemini API error:", error);

    return { error: "Something went wrong. Please try again later." };
  }


  return { error: "Something went wrong. Please try again later." };
}
