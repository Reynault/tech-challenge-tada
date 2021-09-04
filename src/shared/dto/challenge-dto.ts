export interface ChallengeDto {
  name: string;
  description: string;
  text: string;
  difficulty: number;
  bestScore?: number;
}

export const defaultChallenge: ChallengeDto = {
  name: '',
  description: '',
  text: '',
  difficulty: 1
};
