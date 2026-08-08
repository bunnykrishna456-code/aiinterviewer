export type UserRole = "candidate" | "recruiter" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  education: Education[];
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  projects: Project[];
  experience: Experience[];
  certifications: string[];
  softSkills: string[];
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  readinessScore: number;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export type InterviewType = "hr" | "technical" | "coding" | "behavioral" | "system-design" | "mixed";
export type Difficulty = "easy" | "medium" | "hard" | "expert";
export type InterviewLanguage = "english" | "hindi" | "telugu" | "tamil" | "kannada";

export interface InterviewConfig {
  company: string;
  role: string;
  experienceLevel: string;
  type: InterviewType;
  difficulty: Difficulty;
  language: InterviewLanguage;
  voice: string;
  duration: number;
}

export interface Question {
  id: string;
  text: string;
  type: InterviewType;
  difficulty: Difficulty;
  topic: string;
  followUp?: string[];
}

export interface Answer {
  questionId: string;
  text: string;
  audioUrl?: string;
  duration: number;
  timestamp: string;
}

export interface Evaluation {
  questionId: string;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  accuracyScore: number;
  completenessScore: number;
  problemSolvingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestedAnswer: string;
  resources: string[];
}

export interface IntegrityEvent {
  type: string;
  timestamp: string;
  description: string;
}

export interface InterviewReport {
  id: string;
  userId: string;
  config: InterviewConfig;
  overallScore: number;
  resumeScore: number;
  technicalScore: number;
  codingScore: number;
  hrScore: number;
  behaviorScore: number;
  communicationScore: number;
  integrityScore: number;
  hiringRecommendation: string;
  questions: Question[];
  answers: Answer[];
  evaluations: Evaluation[];
  integrityEvents: IntegrityEvent[];
  strengths: string[];
  weaknesses: string[];
  recommendedCourses: string[];
  improvementPlan: string[];
  createdAt: string;
  duration: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  score: number;
  status: "pending" | "completed" | "invited";
  interviewDate?: string;
  reports: InterviewReport[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}
