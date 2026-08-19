import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY1 });
  const trendPackage = { name: "Test" };
  const systemInstruction = `Test instruction`;
  const responseSchema = {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ["SUCCESS", "NO_FIT"] },
          message: { type: Type.STRING },
          trend: { type: Type.STRING },
          trendSummary: { type: Type.STRING, nullable: true },
          metrics: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              velocity: { type: Type.STRING },
              scale: { type: Type.STRING },
              sentiment: { type: Type.STRING },
              urgency: { type: Type.STRING }
            }
          },
          allMatches: {
            type: Type.ARRAY,
            nullable: true,
            items: {
              type: Type.OBJECT,
              properties: {
                brand: { type: Type.STRING },
                fitScore: { type: Type.NUMBER },
                positioningAlignment: { type: Type.NUMBER },
                toneAlignment: { type: Type.NUMBER },
                audienceOverlap: { type: Type.NUMBER },
                statusLabel: { type: Type.STRING }
              }
            }
          },
          topMatch: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              brand: { type: Type.STRING },
              fitScore: { type: Type.NUMBER },
              positioningAlignment: { type: Type.NUMBER },
              toneAlignment: { type: Type.NUMBER },
              audienceOverlap: { type: Type.NUMBER },
            }
          },
          secondMatch: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              brand: { type: Type.STRING },
              fitScore: { type: Type.NUMBER },
            }
          },
          portfolioConflictFlag: { type: Type.BOOLEAN },
          marketPotential: { type: Type.STRING, nullable: true },
          urgencyWindow: { type: Type.STRING, nullable: true },
          riskFlags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            nullable: true
          },
          recommendedParticipationMode: { type: Type.STRING, nullable: true },
          rationale: { type: Type.STRING, nullable: true },
          howToLeverage: { type: Type.STRING, nullable: true },
          brandFitDetails: { type: Type.STRING, nullable: true },
          keyPeopleInvolved: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            nullable: true
          },
          decisionStatus: { type: Type.STRING, nullable: true }
        },
        required: ["status"]
      };

  try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: JSON.stringify(trendPackage),
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.2, // Low temperature for consistent evaluation
        }
      });
      console.log(response.text);
  } catch(e) {
      console.error(e);
  }
}
run();
