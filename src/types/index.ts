export type TabType = 'theory' | 'tracer' | 'block1' | 'block2' | 'block3' | 'cheatsheet';

export interface TraceStep {
  lineIndex: number; // 0-based
  lineNumber: number; // 1-based
  code: string;
  scope: Record<string, string | number | boolean>;
  conditionResult?: {
    expression: string;
    evaluatedTo: boolean;
    explanation: string;
  };
  outputLine?: string;
  description: string;
  isBlockEntered?: boolean;
  isBlockSkipped?: boolean;
}

export interface TraceResult {
  steps: TraceStep[];
  finalOutput: string[];
  finalScope: Record<string, string | number | boolean>;
  error?: string;
}

export interface Task1Item {
  id: string;
  title: string;
  code: string;
  question: string;
  expectedOutput: string;
  options?: string[];
  explanation: string;
  detailedAnalysis: string[];
  hints: string[];
}

export interface Task2Item {
  id: string;
  title: string;
  code: string;
  bugCount: number;
  bugDescriptions: string[];
  correctedCode: string;
  hint: string;
  explanation: string;
}

export interface TestCase {
  name: string;
  initialVars: Record<string, number | string | boolean>;
  expectedOutput: string | number;
}

export interface Task3Item {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  sampleInputDescription: string;
  testCases: TestCase[];
  modelSolution: string;
  explanation: string;
}

export interface ExamQuestion {
  id: number;
  type: 'trace' | 'syntax' | 'logic' | 'comparison';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
