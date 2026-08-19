import fs from 'fs';
const serverCode = fs.readFileSync('server.ts', 'utf-8');
const runTestCode = fs.readFileSync('run_test.ts', 'utf-8');

// Extract the new portfolio from run_test.ts
const match = runTestCode.match(/BRAND PORTFOLIO\nBEAUTY & WELLBEING[\s\S]*?RULES & CONSTRAINTS/);
if (match) {
  const newPortfolio = match[0].replace('RULES & CONSTRAINTS', '').trim();
  
  // Replace the old portfolio in server.ts
  const updatedServerCode = serverCode.replace(/BRAND PORTFOLIO[\s\S]*?RULES/, `${newPortfolio}\n\nRULES`);
  fs.writeFileSync('server.ts', updatedServerCode);
  console.log("Updated portfolio in server.ts");
} else {
  console.log("Could not find new portfolio in run_test.ts");
}
