import React, { useState, useEffect } from 'react';
import { Play, SkipForward, RotateCcw, Terminal, Cpu, CheckCircle2, XCircle, Code2, Sparkles, BookOpen } from 'lucide-react';
import { tracePythonCode } from '../utils/pythonEvaluator.ts';
import { TraceResult } from '../types/index.ts';

interface CodeTracerProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

const PRESETS = [
  {
    name: 'Задание 1.1: and / or (Alpha, Beta, Gamma)',
    code: `a = 15
b = 20

if a > 10 and b < 20:
    print("Alpha")
elif a == 15 or b == 10:
    print("Beta")
else:
    print("Gamma")`
  },
  {
    name: 'Задание 1.2: Независимые if (Кратность 2, 3, 4)',
    code: `n = 12

if n % 2 == 0:
    print("Кратко 2")
if n % 3 == 0:
    print("Кратко 3")
if n % 4 == 0:
    print("Кратко 4")`
  },
  {
    name: 'Задание 1.3: Каскад с x = 5 (Положительное)',
    code: `x = 5

if x > 10:
    print("Больше 10")
elif x > 7:
    print("Больше 7")
elif x > 0:
    print("Положительное")
else:
    print("Ноль или отрицательное")`
  },
  {
    name: 'Задание 1.4: Вложенный if (x=8, y=3)',
    code: `x = 8
y = 3

if x < 10:
    if y > 5:
        print("Вариант 1")
    else:
        print("Вариант 2")
else:
    print("Вариант 3")`
  },
  {
    name: 'Задание 1.5: Накопление val (100 -> 110 -> 220)',
    code: `val = 100

if val > 50:
    val = val + 10
if val > 105:
    val = val * 2
else:
    val = val - 50

print(val)`
  }
];

export const CodeTracer: React.FC<CodeTracerProps> = ({ initialCode, onCodeChange }) => {
  const [code, setCode] = useState<string>(initialCode || PRESETS[0].code);
  const [traceResult, setTraceResult] = useState<TraceResult>(() => tracePythonCode(code));
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Sync when initialCode changes from outside
  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
      const res = tracePythonCode(initialCode);
      setTraceResult(res);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [initialCode]);

  // Re-run tracer when code changes
  const handleCodeUpdate = (newCode: string) => {
    setCode(newCode);
    const res = tracePythonCode(newCode);
    setTraceResult(res);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    if (onCodeChange) onCodeChange(newCode);
  };

  const codeLines = code.split('\n');
  const currentStep = traceResult.steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIndex < traceResult.steps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, traceResult.steps.length]);

  const handleNextStep = () => {
    if (currentStepIndex < traceResult.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleRunAll = () => {
    setIsPlaying(false);
    setCurrentStepIndex(traceResult.steps.length - 1);
  };

  // Build stdout up to current step
  const currentOutput: string[] = [];
  for (let i = 0; i <= currentStepIndex && i < traceResult.steps.length; i++) {
    if (traceResult.steps[i].outputLine !== undefined) {
      currentOutput.push(traceResult.steps[i].outputLine as string);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Preset Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Интерактивный отладчик и трассировщик
            </div>
            <h3 className="text-xl font-bold text-white">
              Пошаговая визуализация работы Python
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Смотрите, как интерпретатор Python построчно читает условия, вычисляет True/False и выводит строки в консоль.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Примеры:</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCodeUpdate(p.code)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  code.trim() === p.code.trim()
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {`1.${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Code Editor / Tracer + State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Lines & Stepper (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          {/* Controls Bar */}
          <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Шаг:
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                {traceResult.steps.length > 0 ? currentStepIndex + 1 : 0} / {traceResult.steps.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                title="Сбросить на начало"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer transition border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Сброс
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition shadow-md ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isPlaying ? 'Пауза' : 'Автошаг'}
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepIndex >= traceResult.steps.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white cursor-pointer transition shadow-md"
              >
                Шаг вперёд
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleRunAll}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 transition cursor-pointer"
              >
                К концу
              </button>
            </div>
          </div>

          {/* Stepping Code Editor View */}
          <div className="p-4 bg-slate-950 font-mono text-sm overflow-x-auto min-h-80">
            {codeLines.map((line, lineIdx) => {
              const lineNum = lineIdx + 1;
              const isCurrent = currentStep && currentStep.lineNumber === lineNum;
              const wasSkipped = isCurrent && currentStep.isBlockSkipped;

              return (
                <div
                  key={lineIdx}
                  className={`flex items-stretch rounded-md transition-all duration-150 py-1 px-2 ${
                    isCurrent
                      ? wasSkipped
                        ? 'bg-rose-950/40 border-l-4 border-rose-500 text-rose-200 shadow'
                        : 'bg-amber-500/20 border-l-4 border-amber-400 text-amber-100 shadow'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  {/* Line Number */}
                  <span className={`w-8 shrink-0 text-right pr-3 select-none text-xs font-semibold ${
                    isCurrent ? 'text-amber-300 font-bold' : 'text-slate-600'
                  }`}>
                    {lineNum}
                  </span>

                  {/* Active Indicator Arrow */}
                  <span className="w-4 shrink-0 flex items-center justify-center select-none text-xs font-bold mr-1">
                    {isCurrent ? (
                      <span className="text-amber-400 animate-pulse">▶</span>
                    ) : (
                      <span className="text-slate-800">·</span>
                    )}
                  </span>

                  {/* Code Line Text with Syntax Highlight Simulation */}
                  <span className="whitespace-pre">
                    {renderSyntaxColoredLine(line)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step Explanation Banner at bottom of code block */}
          {currentStep && (
            <div className={`p-4 border-t text-xs flex items-start gap-3 ${
              currentStep.conditionResult?.evaluatedTo === true
                ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
                : currentStep.conditionResult?.evaluatedTo === false
                ? 'bg-rose-950/30 border-rose-900/60 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <div className="mt-0.5 shrink-0">
                {currentStep.conditionResult?.evaluatedTo === true ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : currentStep.conditionResult?.evaluatedTo === false ? (
                  <XCircle className="w-4 h-4 text-rose-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-0.5">
                  Действие Python на строке {currentStep.lineNumber}:
                </div>
                <div>{currentStep.description}</div>
              </div>
            </div>
          )}

          {/* Code Edit Mode Drawer */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800">
            <details className="text-xs">
              <summary className="text-slate-400 hover:text-slate-200 cursor-pointer font-medium select-none flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Редактировать или вставить свой код Python
              </summary>
              <div className="mt-3 space-y-2">
                <textarea
                  value={code}
                  onChange={(e) => handleCodeUpdate(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Вставьте сюда любой фрагмент Python с if/elif/else..."
                />
                <p className="text-[11px] text-slate-500">
                  Поддерживаются: переменные, `if`, `elif`, `else`, `print()`, логика `and`, `or`, `not`, знаки `==`, `!=`, `&lt;`, `&gt;`, `&lt;=`, `&gt;=`.
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* Right Column: Memory Scope & Console Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Condition Inspector (if currently on a condition) */}
          {currentStep?.conditionResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Анализ текущего условия:
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400">
                  Условие: <span className="text-purple-300 font-bold">{currentStep.conditionResult.expression}</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Подстановка: {currentStep.conditionResult.explanation}
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Итог ветки:</span>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                    currentStep.conditionResult.evaluatedTo
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {currentStep.conditionResult.evaluatedTo ? 'True (Вход в ветку)' : 'False (Ветка пропущена)'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Variables in Memory (Scope) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Память программы (Переменные):
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {Object.keys(currentStep?.scope || {}).length} перем.
              </span>
            </div>

            <div className="space-y-2">
              {Object.keys(currentStep?.scope || {}).length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3 text-center bg-slate-950/50 rounded-xl border border-slate-800">
                  Пока нет созданных переменных
                </div>
              ) : (
                Object.entries(currentStep.scope).map(([name, val]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs"
                  >
                    <span className="text-sky-300 font-bold">{name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">
                        ({typeof val === 'number' ? 'int/float' : typeof val === 'boolean' ? 'bool' : 'str'})
                      </span>
                      <span className="text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {typeof val === 'string' ? `"${val}"` : String(val)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Console Output (Terminal stdout) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Терминал вывода (stdout):
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {currentOutput.length} {currentOutput.length === 1 ? 'строка' : 'строк'}
              </span>
            </div>

            <div className="p-4 bg-black/90 font-mono text-xs min-h-36 max-h-56 overflow-y-auto space-y-1 text-emerald-400">
              {currentOutput.length === 0 ? (
                <div className="text-slate-600 italic">
                  [Консоль пуста. Команда print() еще не выполнена]
                </div>
              ) : (
                currentOutput.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className="text-emerald-300 font-semibold">{out}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderSyntaxColoredLine(line: string) {
  // Simple syntax colorizer for the code line
  if (line.trim().startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Highlight keywords
  const parts = line.split(/(\bif\b|\belif\b|\belse\b|\bprint\b|\band\b|\bor\b|\bnot\b|\bTrue\b|\bFalse\b|[":])/);

  return (
    <>
      {parts.map((p, i) => {
        if (p === 'if' || p === 'elif' || p === 'else') {
          return <span key={i} className="text-purple-400 font-bold">{p}</span>;
        }
        if (p === 'print') {
          return <span key={i} className="text-sky-400 font-semibold">{p}</span>;
        }
        if (p === 'and' || p === 'or' || p === 'not') {
          return <span key={i} className="text-pink-400 font-bold">{p}</span>;
        }
        if (p === 'True' || p === 'False') {
          return <span key={i} className="text-amber-400 font-bold">{p}</span>;
        }
        if (p === ':') {
          return <span key={i} className="text-amber-400 font-bold">{p}</span>;
        }
        if (/^".*"$/.test(p)) {
          return <span key={i} className="text-emerald-300">{p}</span>;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
