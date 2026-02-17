
export enum SectionType {
  HOME = 'HOME',
  TRANSLATION = 'TRANSLATION',
  NEUTRAL_TONE = 'NEUTRAL_TONE',
  ERHUA = 'ERHUA',
  VOWEL_ER = 'VOWEL_ER',
  RESULT = 'RESULT'
}

export interface QuestionPart1 {
  cantonese: string;
  options: string[];
  correctAnswer: string;
}

export interface QuestionCircle {
  sentence: string;
  targets: string[]; // characters or words to be selected
}

export interface GameState {
  currentSection: SectionType;
  scores: Record<SectionType, number>;
  totalAnswered: Record<SectionType, number>;
}
