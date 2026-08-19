import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');

const replacement = `
- Keep the output rationale concise and decision-oriented for a professional Brand Manager.
- Ensure the output strictly follows the JSON format without including any markdown blocks or formatting outside the JSON object.

IMPORTANT:
- For every new trend, independently evaluate all six brands.
- Always detect genuine conflicts.
- Always check no-go rules.
- Never make the final go/no-go decision.
- Always end with decisionStatus: "Pending Human Review".
- IMPORTANT: Provide a specific "howToLeverage" string.
- IMPORTANT: Provide a specific "brandFitDetails" string.
- IMPORTANT: Provide an array of strings for "keyPeopleInvolved".
\`;`;

content = content.replace(/- Keep the output rationale concise and decision-oriented for a professional Brand Manager\.[\s\S]*?- IMPORTANT: You MUST provide detailed insights for "howToLeverage", "brandFitDetails" \(deep dive into why this brand fits\), and "keyPeopleInvolved" \(key audiences, demographics, or creators driving it\)\.\n`;/, replacement);
fs.writeFileSync('server.ts', content);
