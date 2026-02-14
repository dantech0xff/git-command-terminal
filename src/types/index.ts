export interface TerminalEntry {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

// Learning Platform Types
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface LearningPathTopic {
  id: string;
  title: string;
  description: string;
  commands: string[];
  difficulty: DifficultyLevel;
  order: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  topics: LearningPathTopic[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: DifficultyLevel;
  relatedCommand: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  isComplete: boolean;
}

export interface LearningProgress {
  commandsExplored: string[];
  quizScores: { difficulty: DifficultyLevel; score: number; total: number; timestamp: number }[];
  completedTopics: string[];
}
