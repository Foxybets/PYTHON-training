export interface ExamResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: 5 | 4 | 3 | 2;
  gradeLabel: string;
  verdict: string;
}

export function calculateExamGrade(score: number, total: number): ExamResult {
  const percentage = Math.round((score / total) * 100);
  let grade: 5 | 4 | 3 | 2 = 2;
  let gradeLabel = 'Неудовлетворительно';
  let verdict = 'Нужно повторить базовые правила: двоеточия, отступы и разницу между = и ==.';

  if (percentage >= 85) {
    grade = 5;
    gradeLabel = 'Отлично';
    verdict = 'Великолепный результат! Вы превосходно владеете условными конструкциями в Python и готовы к школьному экзамену на высший балл.';
  } else if (percentage >= 70) {
    grade = 4;
    gradeLabel = 'Хорошо';
    verdict = 'Хороший уровень знаний! Обратите внимание на тонкости каскадных elif и логических связок and/or.';
  } else if (percentage >= 50) {
    grade = 3;
    gradeLabel = 'Удовлетворительно';
    verdict = 'Базовые понятия усвоены, но есть ошибки в логике или синтаксисе. Рекомендуем пройти блок трассировки ещё раз.';
  }

  return {
    score,
    totalQuestions: total,
    percentage,
    grade,
    gradeLabel,
    verdict
  };
}
