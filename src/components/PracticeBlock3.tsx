import React, { useState } from 'react';
import { BLOCK_3_TASKS } from '../utils/tasksData.ts';
import { tracePythonCode } from '../utils/pythonEvaluator.ts';
import { Code2, Play, CheckCircle2, XCircle, RotateCcw, Eye, Sparkles } from 'lucide-react';

interface PracticeBlock3Props {
  onTaskCompleted?: (taskId: string) => void;
}

export const PracticeBlock3: React.FC<PracticeBlock3Props> = ({ onTaskCompleted }) => {
  const [userCodes, setUserCodes] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    BLOCK_3_TASKS.forEach(t => { map[t.id] = t.starterCode; });
    return map;
  });

  const [testResults, setTestResults] = useState<Record<string, {
    allPassed: boolean;
    cases: { name: string; passed: boolean; expected: string; actual: string }[];
  }>>({});

  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const handleRunTests = (taskId: string) => {
    const task = BLOCK_3_TASKS.find(t => t.id === taskId);
    if (!task) return;

    const code = userCodes[taskId];
    const caseOutcomes = task.testCases.map(tc => {
      // Strip leading mock variable assignments (e.g. total = 1200 or age = 15) so testCase initialVars take effect
      let runnableCode = code;
      Object.keys(tc.initialVars).forEach(varName => {
        runnableCode = runnableCode.replace(new RegExp(`^\\s*${varName}\\s*=[^\\n]*\\n?`, 'm'), '');
      });

      // Execute the student's code with the test case initial variables
      const result = tracePythonCode(runnableCode, tc.initialVars);
      const actualJoined = result.finalOutput.join('\n').trim();
      const expectedStr = String(tc.expectedOutput).trim();
      const passed = actualJoined === expectedStr;

      return {
        name: tc.name,
        passed,
        expected: expectedStr,
        actual: actualJoined || '(ничего не выведено)'
      };
    });

    const allPassed = caseOutcomes.every(c => c.passed);
    setTestResults(prev => ({
      ...prev,
      [taskId]: {
        allPassed,
        cases: caseOutcomes
      }
    }));

    if (allPassed && onTaskCompleted) {
      onTaskCompleted(taskId);
    }
  };

  const handleResetCode = (taskId: string) => {
    const task = BLOCK_3_TASKS.find(t => t.id === taskId);
    if (!task) return;
    setUserCodes(prev => ({ ...prev, [taskId]: task.starterCode }));
    setTestResults(prev => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
              <Code2 className="w-3.5 h-3.5" />
              Экзаменационный тренажёр: Блок 3
            </div>
            <h3 className="text-xl font-bold text-white">
              «Напиши программу» (Интерактивная практика написания кода)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Напишите правильное условие и вывод. Автоматическая тестирующая система проверит ваше решение на всех граничных и тестовых данных!
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
            Пройдено тестов:{' '}
            <strong className="text-emerald-400 font-bold">
              {Object.values(testResults).filter(r => r.allPassed).length} / {BLOCK_3_TASKS.length}
            </strong>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-8">
        {BLOCK_3_TASKS.map((task, index) => {
          const result = testResults[task.id];
          const isRevealed = revealedSolutions[task.id];

          return (
            <div
              key={task.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl transition-all ${
                result
                  ? result.allPassed
                    ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                    : 'border-rose-500/60 ring-1 ring-rose-500/20'
                  : 'border-slate-800'
              }`}
            >
              {/* Task Title & Specs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-xs font-mono">
                    3.{index + 1}
                  </span>
                  <h4 className="text-base font-bold text-white">{task.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleResetCode(task.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Сбросить
                  </button>

                  <button
                    type="button"
                    onClick={() => setRevealedSolutions(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-950/40 hover:bg-purple-950/70 border border-purple-800/40 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isRevealed ? 'Скрыть эталон' : 'Эталонное решение'}
                  </button>
                </div>
              </div>

              {/* Task Description */}
              <div className="mb-4 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-line">
                {task.description}
              </div>

              {/* In-Browser Python Editor */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Редактор кода программы (Python):</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Соблюдайте отступы (4 пробела) и двоеточия!
                  </span>
                </div>
                <textarea
                  value={userCodes[task.id]}
                  onChange={(e) => setUserCodes(prev => ({ ...prev, [task.id]: e.target.value }))}
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed shadow-inner"
                  spellCheck={false}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => handleRunTests(task.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition shadow-lg shadow-emerald-900/30"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Запустить и проверить все тесты
                </button>

                {result && (
                  <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    result.allPassed
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}>
                    {result.allPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Все тесты ({result.cases.length} из {result.cases.length}) пройдены успешно!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        Пройдено {result.cases.filter(c => c.passed).length} из {result.cases.length} тестов
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Test Cases Results Matrix */}
              {result && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Результаты проверки тест-кейсов:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.cases.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        className={`p-3 rounded-lg border font-mono text-xs flex flex-col justify-between ${
                          c.passed
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                            : 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5 font-sans">
                          <span className="font-semibold text-white">{c.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {c.passed ? 'PASS ✅' : 'FAIL ❌'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 space-y-0.5">
                          <div>Ожидалось: <span className="text-white font-bold">{c.expected}</span></div>
                          <div>Получено: <span className={c.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{c.actual}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Solution */}
              {isRevealed && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-purple-900/40 space-y-3">
                  <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Эталонное решение экзаменационной задачи:
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-purple-200 border border-slate-800">
                    <pre>{task.modelSolution}</pre>
                  </div>
                  <div className="text-xs text-slate-300">
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
