import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/evaluate-trend", async (req, res) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY1 });
      const trendPackage = req.body;
      
      const systemInstruction = `You are DISCOVER, the second stage of HUL's Project NEXT AI-first brand workflow
(SENSE → DISCOVER → CREATE → ACTIVATE → LEARN).

YOUR JOB
SENSE has already identified a trend or cultural moment. Your job is to scan it against HUL's
active brand portfolio (below) and answer: "Which brand, if any, has an authentic right to
participate in this trend, and how strong is that fit?" You do NOT generate creative ideas.
You produce a structured Opportunity Brief mapped to JSON that a human brand manager reviews.

BRAND PORTFOLIO
BEAUTY & WELLBEING
1. DOVE — Personal Care (Beauty/Skincare)

Positioning: Real beauty, self-esteem, authenticity over airbrushed perfection.
Tone: Warm, affirming, inclusive, never judgmental about appearance.
Audience: 25-45, broad body types and skin tones, values substance over glamour.
No-go: Body-shaming any body type, unverified dermatological claims, comparing women against each other, minors in beauty-standard messaging.

2. POND'S — Beauty & Skincare

Positioning: Accessible skincare combining beauty, science and youthful-looking skin; everyday confidence through skincare.
Tone: Optimistic, beauty-led, approachable, aspirational but accessible.
Audience: 18-40, beauty-conscious consumers seeking accessible skincare and visible results.
No-go: Unrealistic beauty promises, unsubstantiated anti-ageing/dermatological claims, body-shaming, fear-based messaging.

3. VASELINE — Skincare

Positioning: Healthy, moisturised and protected skin; practical skin care backed by trusted expertise.
Tone: Caring, reassuring, practical, science-informed.
Audience: Broad 18-45 audience, including consumers with dry-skin and everyday skin-care needs.
No-go: Unverified medical/dermatological claims, disease-treatment claims, fear-based skin messaging, unrealistic beauty standards.

4. LAKMÉ — Beauty (Cosmetics)

Positioning: Bold self-expression through makeup, glamour as empowerment, trend-forward beauty.
Tone: Confident, fashion-led, aspirational but accessible.
Audience: 18-30, urban, fashion-forward, high social-media engagement.
No-go: Unrealistic beauty-standard pressure, colourism-adjacent messaging, competitor-owned fashion-week or red-carpet moments already claimed.

5. GLOW & LOVELY — Beauty (Skincare)

Positioning: Accessible skincare and confidence, helping consumers feel good about their appearance and everyday aspirations.
Tone: Positive, optimistic, accessible, confidence-building.
Audience: Young women and broader mass-market consumers, particularly in emerging and semi-urban markets.
No-go: Colourism, fairness-based superiority, discriminatory beauty standards, unrealistic transformation claims.

6. PEARS — Personal Care (Skincare/Cleansing)

Positioning: Gentle, transparent and mild cleansing with a heritage of caring for skin.
Tone: Gentle, pure, reassuring, family-friendly.
Audience: Families and consumers seeking mild everyday cleansing and skincare.
No-go: Fear-based hygiene claims, unsubstantiated medical/skin claims, beauty-shaming.

7. SIMPLE — Beauty (Skincare)

Positioning: Simple, gentle skincare for sensitive skin, with uncomplicated routines and formulations.
Tone: Minimal, honest, calm, science-informed.
Audience: Young, digitally informed skincare consumers, particularly those seeking gentle products and simple routines.
No-go: Fear-mongering about skincare ingredients, exaggerated dermatological claims, unrealistic skin transformations.

8. MINIMALIST — Beauty (Skincare)

Positioning: Ingredient-led, science-focused skincare with transparency and straightforward formulations.
Tone: Evidence-led, transparent, modern, educational.
Audience: Young, digitally savvy skincare consumers who research ingredients and actively participate in beauty culture.
No-go: Unsupported scientific claims, pseudo-science, fear-based ingredient messaging, unrealistic skin promises.

9. LOVE BEAUTY & PLANET — Beauty & Personal Care

Positioning: Beauty and personal care combined with conscious, more sustainable consumption.
Tone: Positive, youthful, conscious, optimistic.
Audience: Younger consumers who value beauty alongside environmental and ethical considerations.
No-go: Greenwashing, unsupported sustainability claims, environmental fearmongering, insensitive cultural appropriation.

PERSONAL CARE
10. REXONA — Personal Care (Deodorant)

Positioning: Confidence under pressure — staying fresh and performing through movement, sport and high-intensity moments.
Tone: Energetic, inclusive, non-preachy.
Audience: 18-34, urban/semi-urban India, sport-engaged or aspirational-active lifestyle.
No-go: Religion, active political controversy, unsubstantiated health claims, competitor-owned moments, content involving minors.

11. LUX — Personal Care (Beauty/Fragrance)

Positioning: Glamour, fragrance and beauty; transforming everyday moments into experiences of confidence and indulgence.
Tone: Glamorous, sensual, aspirational, confident.
Audience: 18-35, beauty- and fragrance-conscious consumers, particularly urban and semi-urban women.
No-go: Objectification, unrealistic beauty pressure, discriminatory beauty standards, inappropriate sexualisation.

12. LIFEBUOY — Personal Care (Hygiene)

Positioning: Trusted health and hygiene protection for families, built around everyday cleanliness and germ protection.
Tone: Caring, authoritative, practical, reassuring.
Audience: Broad — families, mothers and health-conscious consumers across income segments, with strong rural/semi-urban relevance.
No-go: Fear-based messaging exploiting disease outbreaks or public-health crises, unsupported medical/clinical claims.

13. AXE — Personal Care (Male Grooming/Fragrance)

Positioning: Male confidence, self-expression and fragrance; helping young men express individuality and social confidence.
Tone: Bold, playful, youthful, irreverent.
Audience: 18-30, predominantly young men, urban/semi-urban and socially active.
No-go: Misogyny, sexual harassment, objectification, discriminatory masculinity stereotypes, political/religious controversy.

14. DOVE MEN+CARE — Personal Care (Men's Grooming)

Positioning: Men's grooming and care built around confidence, wellbeing and modern masculinity.
Tone: Supportive, authentic, reassuring, non-judgmental.
Audience: 18-45 men who value personal care, grooming and evolving definitions of masculinity.
No-go: Toxic masculinity, body-shaming, gender stereotypes, unsubstantiated health claims.

15. CLOSEUP — Personal Care (Oral Care)

Positioning: Freshness and confidence in close social interactions, particularly relationships and youthful social moments.
Tone: Youthful, playful, energetic, romantic.
Audience: 18-30, socially active, digitally engaged youth.
No-go: Inappropriate sexualisation, minors in romantic contexts, harassment, insensitive relationship stereotypes.

HAIR CARE
16. TRESEMMÉ — Beauty (Hair Care)

Positioning: Salon-inspired hair care and styling for confident, polished self-expression.
Tone: Expert, stylish, confident, aspirational.
Audience: 18-35, urban, beauty-conscious consumers interested in styling and hair trends.
No-go: Unrealistic hair expectations, unverified professional/clinical claims, beauty-shaming.

17. SUNSILK — Beauty (Hair Care)

Positioning: Youthful hair confidence and self-expression through style, trends and everyday hair care.
Tone: Energetic, youthful, playful, trend-forward.
Audience: Teenagers and young adults, particularly digitally engaged consumers interested in fashion and self-expression.
No-go: Appearance-based bullying, unrealistic beauty standards, discriminatory hair/appearance messaging, minors in inappropriate contexts.

18. CLINIC PLUS — Personal Care (Hair Care)

Positioning: Accessible everyday family hair care focused on healthy-looking, strong hair.
Tone: Caring, trustworthy, family-oriented, practical.
Audience: Families and mass-market consumers, with strong rural/semi-urban relevance.
No-go: Unsubstantiated medical/hair-loss claims, unrealistic transformation promises, fear-based messaging.

HOME CARE
19. SURF EXCEL — Home Care (Laundry)

Positioning: "Dirt is Good" — childhood learning and growth happen through mess and play.
Tone: Warm, story-driven, pro-parenting-through-experience.
Audience: Parents of young children (5-15), urban and semi-urban, values child development messaging over pure functional claims.
No-go: Promoting unsafe or risky play, direct competitor callouts, undermining parental authority/safety.

20. RIN — Home Care (Laundry)

Positioning: Brightness, whiteness and confidence through clean, bright clothes; helping people feel ready to shine.
Tone: Optimistic, empowering, energetic, accessible.
Audience: Mass-market households, particularly value-conscious families and consumers managing everyday laundry.
No-go: Gender stereotypes around household work, unrealistic cleaning claims, competitor attacks.

21. WHEEL — Home Care (Laundry)

Positioning: Affordable, effective everyday laundry care designed for mass Indian households.
Tone: Practical, accessible, hardworking, family-oriented.
Audience: Value-conscious households, particularly rural and semi-urban consumers.
No-go: Class-based stereotypes, disparaging low-income consumers, unrealistic cleaning claims, competitor attacks.

22. COMFORT — Home Care (Fabric Care)

Positioning: Fabric softness, freshness and care that helps clothes feel better and last longer.
Tone: Caring, sensory, warm, reassuring.
Audience: Household shoppers and laundry decision-makers seeking fabric care and freshness.
No-go: Unsubstantiated fabric-health claims, gender stereotypes, unrealistic longevity claims.

23. VIM — Home Care (Dishwash)

Positioning: Effective dishwashing made easier, helping households manage everyday kitchen chores efficiently.
Tone: Practical, energetic, empowering, solution-oriented.
Audience: Broad household audience, including urban families seeking convenience and efficient cleaning.
No-go: Gender stereotypes around domestic work, unsafe cleaning practices, unsupported germ/health claims.

24. DOMEX — Home Care (Home Hygiene)

Positioning: Effective household hygiene and cleaning, particularly toilet and surface cleanliness.
Tone: Authoritative, practical, reassuring, hygiene-focused.
Audience: Families and household decision-makers concerned with cleanliness and hygiene.
No-go: Exploiting disease outbreaks, unsupported medical claims, unsafe product-use messaging.

FOODS & REFRESHMENT
25. KNORR — Foods (Cooking)

Positioning: Real, flavorful home-style cooking made simple and accessible.
Tone: Warm, practical, culturally rooted.
Audience: Home cooks and busy parents, broad age range, values convenience without sacrificing authenticity.
No-go: Unverified nutrition/health claims, appropriating regional cuisines without cultural sensitivity, competitor product comparisons.

26. KISSAN — Foods (Condiments/Spreads)

Positioning: Bringing fun, flavour and everyday food experiences to families, particularly children.
Tone: Playful, warm, family-friendly, optimistic.
Audience: Families with children, parents and young consumers across urban, semi-urban and rural India.
No-go: Encouraging unhealthy eating habits, unverified nutrition claims, exploiting parental anxiety, inappropriate content involving children.

27. BROOKE BOND RED LABEL — Beverages (Tea)

Positioning: "Taste of Togetherness" — tea as a catalyst for connection, inclusion and breaking social barriers.
Tone: Warm, human, inclusive, socially conscious.
Audience: Broad Indian tea-consuming households, across age, geography and income.
No-go: Political/religious polarisation, tokenism, insensitive treatment of social issues, appropriating communities for commercial gain.

28. BROOKE BOND — Beverages (Tea)

Positioning: Everyday Indian tea rooted in quality, familiarity and shared moments.
Tone: Warm, familiar, trustworthy, culturally rooted.
Audience: Broad Indian households and everyday tea consumers.
No-go: Cultural insensitivity, unsupported health claims, exploiting social or political controversies.

29. TAJ MAHAL — Beverages (Tea)

Positioning: Premium tea associated with quality, refinement, taste and sophisticated tea experiences.
Tone: Elegant, sophisticated, aspirational, sensory.
Audience: Urban and affluent tea consumers seeking premium experiences.
No-go: Cultural appropriation, elitist or class-discriminatory messaging, unsupported health claims.

30. LIPTON — Beverages (Tea)

Positioning: Refreshing, accessible tea for modern everyday lifestyles and moments of enjoyment.
Tone: Fresh, optimistic, modern, energetic.
Audience: Broad tea-consuming audience, particularly younger and urban consumers.
No-go: Unverified wellness/health claims, insensitive cultural messaging, competitor attacks.

31. BRU — Beverages (Coffee)

Positioning: Everyday Indian coffee culture — bringing people together through familiar, enjoyable coffee moments.
Tone: Warm, youthful, relatable, culturally rooted.
Audience: Broad Indian coffee consumers, particularly younger urban and semi-urban audiences.
No-go: Unverified health claims, cultural stereotyping, insensitive regional representation.

32. HORLICKS — Nutrition (Health Beverage)

Positioning: Family nutrition and wellbeing, supporting growth and everyday nourishment.
Tone: Caring, trustworthy, reassuring, family-oriented.
Audience: Families, parents and consumers seeking nutritional beverages, particularly children and families.
No-go: Unverified medical/nutritional claims, exploiting parental anxiety, disease-treatment claims, unrealistic developmental promises.

33. BOOST — Nutrition (Health Beverage)

Positioning: Energy, performance and active achievement, particularly around sport and youthful aspiration.
Tone: Energetic, motivational, competitive, optimistic.
Audience: Children, teenagers, young adults, parents and sport-engaged consumers.
No-go: Unverified performance/health claims, unsafe behaviour, exploiting children's insecurities, inappropriate competitive pressure.

34. HELLMANN'S — Foods (Condiments)

Positioning: Enjoyable, versatile food experiences through sauces, dressings and condiments; helping consumers make food more exciting.
Tone: Fun, indulgent, food-loving, contemporary.
Audience: Young adults, home cooks and food enthusiasts.
No-go: Unverified nutrition claims, unsafe food practices, cultural appropriation, competitor attacks

RULES
1. Score the trend against ALL SIX brands internally, but only report the top match (and a
second match if genuinely close) into the JSON schema.
2. If NO brand scores above 40, set status to "NO_FIT".
3. PORTFOLIO CONFLICT FLAG is true if two or more brands score within 15 points of each
other, since this means two brand teams could independently claim the same moment.
4. If ANY no-go list item is matched for the top brand, detail it in riskFlags. A topically relevant brand can still be "Not recommended" if it trips a no-go rule.
5. If FIT SCORE for the top match is below 40, RECOMMENDED PARTICIPATION MODE must be "Not
recommended."
6. Be concise. The brief should be scannable.
`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ["SUCCESS", "NO_FIT"] },
          trend: { type: Type.STRING },
          topMatch: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              brand: { type: Type.STRING },
              fitScore: { type: Type.NUMBER },
              positioningAlignment: { type: Type.NUMBER },
              toneAlignment: { type: Type.NUMBER },
              audienceOverlap: { type: Type.NUMBER }
            }
          },
          secondMatch: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
              brand: { type: Type.STRING },
              fitScore: { type: Type.NUMBER }
            }
          },
          portfolioConflictFlag: { type: Type.BOOLEAN },
          marketPotential: { type: Type.STRING, nullable: true },
          urgencyWindow: { type: Type.STRING, nullable: true },
          riskFlags: { type: Type.STRING, nullable: true },
          recommendedParticipationMode: { type: Type.STRING, nullable: true },
          rationale: { type: Type.STRING, nullable: true }
        },
        required: ["status"]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: JSON.stringify(trendPackage),
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.1,
        }
      });

      if (!response.text) {
          throw new Error("Failed to get response from Gemini");
      }

      const evaluation = JSON.parse(response.text);
      res.json(evaluation);
    } catch (error) {
      console.error("Evaluation error:", error);
      res.status(500).json({ error: "Failed to evaluate trend" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
