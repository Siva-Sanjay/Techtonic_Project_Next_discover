const { execSync } = require('child_process');

const models = [
  "gemini-2.5-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
  "gemini-pro-latest"
];

for (const model of models) {
  try {
    console.log(`Testing ${model}...`);
    const result = execSync(`curl -s "https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=$GEMINI_API_KEY" -H 'Content-Type: application/json' -d '{"contents": [{"parts":[{"text": "Hello"}]}]}'`).toString();
    if (!result.includes('"error"')) {
      console.log(`✅ SUCCESS: ${model}`);
    } else {
      const parsed = JSON.parse(result);
      console.log(`❌ ERROR: ${model} -> ${parsed.error.code} ${parsed.error.status} - ${parsed.error.message.substring(0, 100)}`);
    }
  } catch (e) {
    console.log(`Failed to run curl for ${model}`);
  }
}
