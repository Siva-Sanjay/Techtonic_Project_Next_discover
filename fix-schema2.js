import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');
content = content.replace(/import { GoogleGenAI, Type, Schema } from "@google\/genai";/, 'import { GoogleGenAI, Type, Schema } from "@google/genai";');
content = content.replace(/responseSchema: Schema = {/g, 'responseSchema = {');

// Fix the prompt so it knows the names of the fields.
content = content.replace(/"howToLeverage" \(how the brand can activate on this\), "brandFitDetails"/g, '"howToLeverage", "brandFitDetails"');
content = content.replace(/temperature: 0.2/g, 'temperature: 0'); // force to 0 so it's as deterministic as possible

fs.writeFileSync('server.ts', content);
console.log("Fixed server.ts");
