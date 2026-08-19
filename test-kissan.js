const trendPackage = { 
  topic: 'Unexpected viral moment —Video clip of a student dancing with a Kissan sause bottle on his head gone viral in Instagram, and everyone doing the #KissanDance challenge',
  platforms: 'Instagram',
  velocity: 'rising',
  sentiment: 'positive',
  geography: 'India',
  audience_demographics: 'youth',
  lifecycle_stage: 'emerging',
  source_summary: 'Instagram trend'
};
fetch('http://localhost:3000/api/evaluate-trend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(trendPackage)
}).then(r => r.json()).then(r => console.log(JSON.stringify(r, null, 2))).catch(console.error);
