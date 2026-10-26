import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS } from '../utils/tasksData.ts';
import { calculateExamGrade, ExamResult } from '../utils/examScorer.ts';
import { Award, Timer, CheckCircle2, XCircle, AlertCircle, RotateCcw, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface ExamModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamModeModal: React.FC<ExamModeModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes (900 seconds)
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isFinished, userAnswers]);

  if (!isOpen) return null;

  const currentQ = EXAM_QUESTIONS[currentQuestionIndex];

  const handleSelectAnswer = (qIndex: number, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qIndex]: optionIdx }));
  };

  const finishExam = () => {
    let score = 0;
    EXAM_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    const result = calculateExamGrade(score, EXAM_QUESTIONS.length);
    setExamResult(result);
    setIsFinished(true);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(900);
    setIsFinished(false);
    setExamResult(null);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Экзамен по условным конструкциям Python (10 класс)
              </h3>
              <p className="text-xs text-slate-400">
                10 экзаменационных вопросов • Школьная шкала оценивания (2–5)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isFinished && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-amber-300">
                <Timer className="w-4 h-4 text-amber-400" />
                {timeFormatted}
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exam Body */}
        {!isFinished ? (
          <div className="p-6 space-y-6">
            {/* Question Progress Tracker Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Вопрос {currentQuestionIndex + 1} из {EXAM_QUESTIONS.length}</span>
                <span>Отвечено: {Object.keys(userAnswers).length} из {EXAM_QUESTIONS.length}</span>
              </div>
              <div className="flex gap-1.5">
                {EXAM_QUESTIONS.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`flex-1 h-2 rounded-full transition cursor-pointer ${
                        isCurrent
                          ? 'bg-purple-500 ring-2 ring-purple-400/50'
                          : isAnswered
                          ? 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Current Question Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {currentQ.question}
              </div>

              {currentQ.codeSnippet && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-200">
                  <pre>{currentQ.codeSnippet}</pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500 text-purple-200 ring-1 ring-purple-500 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-700'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </button>

              {currentQuestionIndex < EXAM_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(EXAM_QUESTIONS.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition cursor-pointer shadow-md"
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishExam}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  Завершить экзамен
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-6 space-y-6">
            {/* Grade Card */}
            <div className={`p-6 rounded-3xl border text-center space-y-4 shadow-xl ${
              examResult?.grade === 5
                ? 'bg-emerald-950/40 border-emerald-500/50'
                : examResult?.grade === 4
                ? 'bg-sky-950/40 border-sky-500/50'
                : examResult?.grade === 3
                ? 'bg-amber-950/40 border-amber-500/50'
                : 'bg-rose-950/40 border-rose-500/50'
            }`}>
              <div className="inline-block p-4 rounded-full bg-slate-900/80 border border-slate-700 shadow-inner">
                <span className={`text-5xl font-black font-mono ${
                  examResult?.grade === 5
                    ? 'text-emerald-400'
                    : examResult?.grade === 4
                    ? 'text-sky-400'
                    : examResult?.grade === 3
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  ОЦЕНКА: {examResult?.grade}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {examResult?.gradeLabel} ({examResult?.score} из {examResult?.totalQuestions} верно, {examResult?.percentage}%)
                </h4>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  {examResult?.verdict}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition shadow"
                >
                  <RotateCcw className="w-4 h-4" />
                  Пройти заново
                </button>
              </div>
            </div>

            {/* Mistakes & Explanations Review */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                Подробный разбор каждого вопроса:
              </h5>

              {EXAM_QUESTIONS.map((q, qIdx) => {
                const userAns = userAnswers[qIdx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'bg-slate-950 border-emerald-900/40'
                        : 'bg-slate-950 border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-white">
                        {qIdx + 1}. {q.question}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {isCorrect ? 'Верно ✅' : 'Ошибка ❌'}
                      </span>
                    </div>

                    <div className="text-slate-400">
                      Ваш ответ: <span className={isCorrect ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                        {userAns !== undefined ? q.options[userAns] : '(пропущен)'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="text-slate-400">
                        Правильный ответ: <span className="text-emerald-400 font-bold">{q.options[q.correctIndex]}</span>
                      </div>
                    )}

                    <div className="pt-1.5 border-t border-slate-800 text-slate-400 text-[11px]">
                      💡 <strong>Объяснение:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
