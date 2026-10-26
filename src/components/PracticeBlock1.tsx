import React, { useState } from 'react';
import { BLOCK_1_TASKS } from '../utils/tasksData.ts';
import { CheckCircle2, XCircle, HelpCircle, Eye, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface PracticeBlock1Props {
  onOpenInTracer: (code: string) => void;
  onTaskCompleted?: (taskId: string) => void;
}

export const PracticeBlock1: React.FC<PracticeBlock1Props> = ({ onOpenInTracer, onTaskCompleted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>({});
  const [showAnalysis, setShowAnalysis] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleSelectOption = (taskId: string, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [taskId]: option }));
  };

  const handleCheck = (taskId: string, expected: string) => {
    const userAns = (selectedAnswers[taskId] || '').trim();
    const isCorrect = userAns.replace(/\r\n/g, '\n') === expected.trim().replace(/\r\n/g, '\n');
    setCheckedStatus(prev => ({ ...prev, [taskId]: isCorrect }));
    if (isCorrect && onTaskCompleted) {
      onTaskCompleted(taskId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Block Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Экзаменационный тренажёр: Блок 1
            </div>
            <h3 className="text-xl font-bold text-white">
              «Что выведет программа?» (Трассировка кода в уме)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Решите каждое задание самостоятельно, как на реальном экзамене. Если сомневаетесь — запустите код в пошаговом визуализаторе!
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            Решено верно:{' '}
            <strong className="text-emerald-400 font-bold">
              {Object.values(checkedStatus).filter(Boolean).length} / {BLOCK_1_TASKS.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-6">
        {BLOCK_1_TASKS.map((task, index) => {
          const isChecked = checkedStatus[task.id] !== undefined;
          const isCorrect = checkedStatus[task.id] === true;
          const selected = selectedAnswers[task.id];

          return (
            <div
              key={task.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl transition-all ${
                isChecked
                  ? isCorrect
                    ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                    : 'border-rose-500/60 ring-1 ring-rose-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Task Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xs font-mono">
                    {index + 1}
                  </span>
                  <h4 className="text-base font-bold text-white">{task.title}</h4>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenInTracer(task.code)}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition cursor-pointer self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Открыть в визуализаторе
                </button>
              </div>

              {/* Code Snippet */}
              <div className="mb-5 bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-200">
                <pre>{task.code}</pre>
              </div>

              {/* Question & Options */}
              <div className="mb-5">
                <div className="text-sm font-semibold text-white mb-3">
                  {task.question}
                </div>

                {task.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {task.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === opt;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(task.id, opt)}
                          className={`p-3 rounded-xl border text-left font-mono text-xs transition cursor-pointer flex items-center justify-between ${
                            isOptionSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="whitespace-pre">{opt}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isOptionSelected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-700'
                          }`}>
                            {isOptionSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions & Verification Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCheck(task.id, task.expectedOutput)}
                    disabled={!selected}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white cursor-pointer transition shadow-md"
                  >
                    Проверить ответ
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowHints(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 cursor-pointer transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Подсказка
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAnalysis(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-purple-300 hover:text-purple-200 bg-purple-950/40 hover:bg-purple-950/70 border border-purple-800/50 cursor-pointer transition"
                  >
                    Экзаменационный разбор
                  </button>
                </div>

                {isChecked && (
                  <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Верно! Отличная трассировка.
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        Неверно. Попробуйте еще раз или посмотрите разбор.
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Hints Drawer */}
              {showHints[task.id] && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Подсказка:
                  </div>
                  {task.hints.map((h, hIdx) => (
                    <div key={hIdx}>• {h}</div>
                  ))}
                </div>
              )}

              {/* Detailed Analysis Drawer */}
              {showAnalysis[task.id] && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Пошаговый экзаменационный разбор:
                  </div>
                  {task.detailedAnalysis.map((step, sIdx) => (
                    <div key={sIdx} className="text-slate-300">
                      {step}
                    </div>
                  ))}
                  <div className="mt-3 pt-2 border-t border-slate-800 text-slate-400 italic">
                    {task.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
