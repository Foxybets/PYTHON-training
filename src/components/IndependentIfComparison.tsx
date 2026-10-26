import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const IndependentIfComparison: React.FC = () => {
  const [testValue, setTestValue] = useState<number>(10);

  // Variant A: Independent ifs
  const variantA = {
    cond1: testValue > 5,
    cond2: testValue > 2,
    output: [] as string[]
  };
  if (variantA.cond1) variantA.output.push('A');
  if (variantA.cond2) variantA.output.push('B');

  // Variant B: if-elif
  const variantB = {
    cond1: testValue > 5,
    cond2Checked: !(testValue > 5),
    cond2: testValue > 5 ? null : testValue > 2,
    output: [] as string[]
  };
  if (testValue > 5) {
    variantB.output.push('A');
  } else if (testValue > 2) {
    variantB.output.push('B');
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Любимый вопрос учителей на экзаменах
          </div>
          <h4 className="text-lg font-bold text-white">
            Несколько независимых <code className="text-purple-400">if</code> подряд vs связка <code className="text-sky-400">if-elif</code>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Измените значение переменной x, чтобы увидеть наглядную разницу в поведении Python:
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <label htmlFor="test-val-slider" className="text-xs font-semibold text-slate-300">
            Значение x:
          </label>
          <div className="flex items-center gap-2">
            {[10, 4, 1].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTestValue(val)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded cursor-pointer transition ${
                  testValue === val ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                x={val}
              </button>
            ))}
            <input
              id="test-val-slider"
              type="number"
              value={testValue}
              onChange={(e) => setTestValue(Number(e.target.value))}
              className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-center font-bold text-white"
            />
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variant A */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Вариант А: Независимые if
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Проверяются ОБА условия
              </span>
            </div>

            <div className="font-mono text-xs space-y-2 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="text-slate-400">x = <span className="text-amber-300">{testValue}</span></div>

              <div className={`p-2 rounded border ${variantA.cond1 ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="flex justify-between items-center">
                  <span><strong className="text-purple-400">if</strong> x &gt; 5:</span>
                  <span className={`text-[11px] font-bold ${variantA.cond1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {testValue} &gt; 5 → {variantA.cond1 ? 'True ✅' : 'False ❌'}
                  </span>
                </div>
                <div className={`pl-4 text-xs font-semibold ${variantA.cond1 ? 'text-emerald-200' : 'text-slate-600 line-through'}`}>
                  print("A")
                </div>
              </div>

              <div className={`p-2 rounded border ${variantA.cond2 ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="flex justify-between items-center">
                  <span><strong className="text-purple-400">if</strong> x &gt; 2:</span>
                  <span className={`text-[11px] font-bold ${variantA.cond2 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {testValue} &gt; 2 → {variantA.cond2 ? 'True ✅' : 'False ❌'}
                  </span>
                </div>
                <div className={`pl-4 text-xs font-semibold ${variantA.cond2 ? 'text-emerald-200' : 'text-slate-600 line-through'}`}>
                  print("B")
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Итоговый вывод на экран:</span>
              <span className="font-mono text-[11px] text-slate-500">
                {variantA.output.length} {variantA.output.length === 1 ? 'строка' : variantA.output.length === 0 ? 'строк' : 'строки'}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 font-mono text-sm text-emerald-300 font-bold min-h-12 flex flex-col justify-center">
              {variantA.output.length > 0 ? (
                variantA.output.map((line, i) => <div key={i}>{line}</div>)
              ) : (
                <span className="text-slate-600 italic font-normal">«Ничего не напечатается»</span>
              )}
            </div>
          </div>
        </div>

        {/* Variant B */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                Вариант Б: Связка if - elif
              </span>
              <span className="text-[11px] text-sky-400/90 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
                Выход при первом True
              </span>
            </div>

            <div className="font-mono text-xs space-y-2 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="text-slate-400">x = <span className="text-amber-300">{testValue}</span></div>

              <div className={`p-2 rounded border ${testValue > 5 ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="flex justify-between items-center">
                  <span><strong className="text-purple-400">if</strong> x &gt; 5:</span>
                  <span className={`text-[11px] font-bold ${testValue > 5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {testValue} &gt; 5 → {testValue > 5 ? 'True ✅' : 'False ❌'}
                  </span>
                </div>
                <div className={`pl-4 text-xs font-semibold ${testValue > 5 ? 'text-emerald-200' : 'text-slate-600 line-through'}`}>
                  print("A")
                </div>
              </div>

              <div className={`p-2 rounded border ${
                testValue > 5
                  ? 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-60'
                  : testValue > 2
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950/50 border-slate-800 text-slate-500'
              }`}>
                <div className="flex justify-between items-center">
                  <span><strong className="text-purple-400">elif</strong> x &gt; 2:</span>
                  <span className={`text-[11px] font-bold ${
                    testValue > 5
                      ? 'text-slate-500 italic'
                      : testValue > 2
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}>
                    {testValue > 5 ? 'Пропущено! (ветка выше сработала)' : testValue > 2 ? 'True ✅' : 'False ❌'}
                  </span>
                </div>
                <div className={`pl-4 text-xs font-semibold ${
                  testValue <= 5 && testValue > 2 ? 'text-emerald-200' : 'text-slate-600 line-through'
                }`}>
                  print("B")
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Итоговый вывод на экран:</span>
              <span className="font-mono text-[11px] text-slate-500">
                {variantB.output.length} {variantB.output.length === 1 ? 'строка' : variantB.output.length === 0 ? 'строк' : 'строки'}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 font-mono text-sm text-sky-300 font-bold min-h-12 flex flex-col justify-center">
              {variantB.output.length > 0 ? (
                variantB.output.map((line, i) => <div key={i}>{line}</div>)
              ) : (
                <span className="text-slate-600 italic font-normal">«Ничего не напечатается»</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
