import { GoogleGenAI } from "@google/genai";
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Hello",
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
