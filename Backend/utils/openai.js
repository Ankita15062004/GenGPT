import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const getOpenAIAPIResponse = async (message) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    // Extract clean text ONLY
    const text =
      response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join("\n") || "No reply";

    return text;

  } catch (err) {
    console.error("Gemini Error:", err);
    return "Gemini Request Failed";
  }
};

export default getOpenAIAPIResponse;
