import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf-8');
content = content.replace(/1. Score the trend against ALL brands internally, but only report the top match \(and a\nsecond match if genuinely close\) into the JSON schema\./, '1. Score the trend against ALL brands internally. **If a brand is explicitly mentioned in the trend input (like Kissan), heavily weight that brand as the Top Match.**');
fs.writeFileSync('server.ts', content);
