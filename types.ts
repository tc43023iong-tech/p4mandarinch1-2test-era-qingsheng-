
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
  sentence: string; // 使用 {字} 來標註目標
}

export interface GameState {
  currentSection: SectionType;
  scores: Record<SectionType, number>;
  totalAnswered: Record<SectionType, number>;
}
