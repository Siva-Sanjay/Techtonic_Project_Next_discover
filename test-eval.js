const trendPackage = { "name": "Mental Resilience & Ritualistic Grooming", "description": "Gen Z views personal hygiene as self care" };
fetch('http://localhost:3000/api/evaluate-trend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(trendPackage)
}).then(r => r.json()).then(r => console.log(r.status, !!r.howToLeverage)).catch(console.error);
