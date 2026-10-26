import React, { useState } from 'react';
import { BLOCK_2_TASKS } from '../utils/tasksData.ts';
import { Bug, CheckCircle2, AlertTriangle, Eye, HelpCircle, Sparkles } from 'lucide-react';

interface PracticeBlock2Props {
  onTaskCompleted?: (taskId: string) => void;
}

export const PracticeBlock2: React.FC<PracticeBlock2Props> = ({ onTaskCompleted }) => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [userFoundBugs, setUserFoundBugs] = useState<Record<string, boolean>>({});

  const handleRevealSolution = (taskId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [taskId]: true }));
    setUserFoundBugs(prev => ({ ...prev, [taskId]: true }));
    if (onTaskCompleted) onTaskCompleted(taskId);
  };

  const toggleHint = (taskId: string) => {
    setRevealedHints(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-2">
              <Bug className="w-3.5 h-3.5" />
              Экзаменационный тренажёр: Блок 2
            </div>
            <h3 className="text-xl font-bold text-white">
              «Найди и исправь ошибки» (Синтаксис и логика)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Каждый фрагмент кода содержит от 1 до 3 ошибок (пропущенные двоеточия, отступы, знак `=` вместо `==` или ложные связки). Найдите их до того, как заглянуть в разбор!
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            Разобрано:{' '}
            <strong className="text-emerald-400 font-bold">
              {Object.values(userFoundBugs).filter(Boolean).length} / {BLOCK_2_TASKS.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {BLOCK_2_TASKS.map((task, index) => {
          const isRevealed = revealedSolutions[task.id];
          const hasHint = revealedHints[task.id];

          return (
            <div
              key={task.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl transition-all ${
                isRevealed ? 'border-indigo-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/30 flex items-center justify-center font-bold text-xs font-mono">
                    2.{index + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white">{task.title}</h4>
                    <span className="text-[11px] text-rose-400 font-medium">
                      Ошибок в коде: {task.bugCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleHint(task.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-800/40 transition cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {hasHint ? 'Скрыть подсказку' : 'Подсказка'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRevealSolution(task.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isRevealed ? 'Скрыть разбор' : 'Показать ошибки и решение'}
                  </button>
                </div>
              </div>

              {/* Buggy Code Box */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Исходный код с ошибкой:
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-rose-900/40 font-mono text-xs text-rose-200">
                  <pre>{task.code}</pre>
                </div>
              </div>

              {/* Hint Box */}
              {hasHint && (
                <div className="mb-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Подсказка:
                  </div>
                  <div>{task.hint}</div>
                </div>
              )}

              {/* Solution & Explanation */}
              {isRevealed && (
                <div className="mt-5 pt-4 border-t border-slate-800 space-y-4">
                  {/* Identified bugs */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                      Что здесь не так:
                    </div>
                    {task.bugDescriptions.map((desc, dIdx) => (
                      <div key={dIdx} className="text-xs text-slate-300 flex items-start gap-2 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                        <span className="text-rose-400 font-bold shrink-0">❌</span>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corrected Code */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Исправленный эталонный вариант:
                    </div>
                    <div className="bg-slate-950 rounded-xl p-4 border border-emerald-900/50 font-mono text-xs text-emerald-300">
                      <pre>{task.correctedCode}</pre>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Правило для экзамена:
                    </div>
                    <div>{task.explanation}</div>
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
