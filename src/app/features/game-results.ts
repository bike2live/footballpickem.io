export interface GameResults {
  name: string;
  byuScore: number;
  oppScore: number;
  weekTotalScore:number;
  delta: number;
  weekLowDiffBonus: number;
  weekExactDiffBonus: number;
  weekExactScoreBonus: number;
  weekHomerPenalty: number;
  weekCheatingPenalty:number;
  updated: Date;
}

