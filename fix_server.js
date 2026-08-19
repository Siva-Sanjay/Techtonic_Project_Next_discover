import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

// The issue is that the text examples do not contain the new fields, so the LLM doesn't output them, 
// OR the LLM combines fields. Let's fix the examples in systemInstruction.

content = content.replace(/EXPECTED OUTPUT BEHAVIOR \(Map to JSON\):[\s\S]*?DECISION STATUS: Pending human review/g, 'EXPECTED OUTPUT BEHAVIOR: Return valid JSON matching the schema.');
content = content.replace(/Example 1[\s\S]*?Example 4[^\n]*\n/g, ''); // remove examples entirely if they are too long and unformatted
content = content.replace(/### Example 1[\s\S]*?### Example 4[^\n]*\n[\s\S]*?DECISION STATUS: Pending human review/g, '');

fs.writeFileSync('server.ts', content);
console.log("Fixed server.ts");
