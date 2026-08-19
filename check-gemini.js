import { GoogleGenAI } from "@google/genai";
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY1 });
  const systemInstruction = `You are an evaluator...`; // short
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "hello",
    });
    console.log(response.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
run();
