const trendPackage = { 
  topic: 'Unexpected viral moment — Indian grassroots football team draws a major club in a tournament, fanbase erupts online',
  platforms: 'Instagram, X, YouTube Shorts',
  velocity: 'rising fast (peaking within 72 hours)',
  sentiment: 'overwhelmingly positive, high excitement/pride',
  geography: 'India, national reach with strong Tier 2/3 city concentration',
  audience_demographics: '16-35, sport-engaged',
  lifecycle_stage: 'emerging, pre-peak',
  source_summary: 'Organic fan content, sports media pickup, several brands already reacting generically'
};
fetch('http://localhost:3000/api/evaluate-trend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(trendPackage)
}).then(r => r.json()).then(r => console.log(JSON.stringify(r, null, 2))).catch(console.error);
