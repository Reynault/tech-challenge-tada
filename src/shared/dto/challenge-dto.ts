export interface ScoreDto {
  time: number;
  error: number;
}

export interface ChallengeDto {
  name: string;
  description: string;
  text: string;
  difficulty: number;
  bestScore?: ScoreDto;
}

export const defaultChallenge: ChallengeDto = {
  name: '',
  description: '',
  text: '',
  difficulty: 1,
  bestScore: null
};
