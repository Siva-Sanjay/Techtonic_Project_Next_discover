import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');
content = content.replace(/howToLeverage: { type: Type.STRING, nullable: true },/, 'howToLeverage: { type: Type.STRING, description: "Actionable steps on how to leverage the trend", nullable: true },');
content = content.replace(/brandFitDetails: { type: Type.STRING, nullable: true },/, 'brandFitDetails: { type: Type.STRING, description: "Detailed explanation of why the top brand is a good fit", nullable: true },');
content = content.replace(/keyPeopleInvolved: {\s*type: Type.ARRAY,\s*items: { type: Type.STRING },\s*nullable: true\s*},/, 'keyPeopleInvolved: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key demographics, creators, or audiences driving the trend", nullable: true },');
fs.writeFileSync('server.ts', content);
