export interface TrendPackage {
  topic: string;
  platforms: string;
  velocity: string;
  sentiment: string;
  geography: string;
  audience_demographics: string;
  lifecycle_stage: string;
  source_summary: string;
}

export interface MatchDetails {
  brand: string;
  fitScore: number;
  positioningAlignment: number;
  toneAlignment: number;
  audienceOverlap: number;
}

export interface EvaluationResponse {
  status: 'SUCCESS' | 'NO_FIT';
  trend?: string;
  topMatch?: MatchDetails | null;
  secondMatch?: { brand: string; fitScore: number } | null;
  portfolioConflictFlag?: boolean;
  marketPotential?: string;
  urgencyWindow?: string;
  riskFlags?: string;
  recommendedParticipationMode?: string;
  rationale?: string;
}
