import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, CheckCircle2, XCircle } from 'lucide-react';

export const LogicPlayground: React.FC = () => {
  // Scenario 1: and (age and passport)
  const [age, setAge] = useState<number>(15);
  const [hasPassport, setHasPassport] = useState<boolean>(true);

  // Scenario 2: or (weekend)
  const [day, setDay] = useState<string>('Суббота');

  // Scenario 3: not (rain)
  const [isRaining, setIsRaining] = useState<boolean>(false);

  // Custom live expression evaluator
  const [customExpr, setCustomExpr] = useState<string>('5 > 3 and 10 == 10');

  // Evaluate customExpr safely
  const evalCustom = () => {
    try {
      const clean = customExpr
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\s+/g, '!')
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false');
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return Boolean(${clean});`);
      return { result: fn(), error: null };
    } catch {
      return { result: false, error: 'Ошибка в выражении' };
    }
  };

  const customResult = evalCustom();

  const isAgeValid = age >= 14;
  const canBuyTicket = isAgeValid && hasPassport;
  const isWeekend = day === 'Суббота' || day === 'Воскресенье';
  const canWalk = !isRaining;

  return (
    <div className="space-y-6">
      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AND Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Оператор and (И)
              </span>
              <span className="text-xs text-slate-400">Оба условия True</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Оформление билета: возраст <code className="text-purple-300">&gt;= 14</code> <strong className="text-white">and</strong> наличие паспорта:
            </p>

            <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Возраст:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-20 accent-purple-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-white w-6">{age}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Есть паспорт:</span>
                <button
                  type="button"
                  onClick={() => setHasPassport(!hasPassport)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold cursor-pointer transition ${
                    hasPassport ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {hasPassport ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  {hasPassport ? 'Да (True)' : 'Нет (False)'}
                </button>
              </div>
            </div>

            <div className="mt-3 font-mono text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              <div>age &gt;= 14: <strong className={isAgeValid ? 'text-emerald-400' : 'text-rose-400'}>{isAgeValid ? 'True' : 'False'}</strong></div>
              <div>has_passport: <strong className={hasPassport ? 'text-emerald-400' : 'text-rose-400'}>{hasPassport ? 'True' : 'False'}</strong></div>
            </div>
          </div>

          <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${
            canBuyTicket ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
          }`}>
            <span>Результат and:</span>
            <span className="flex items-center gap-1 text-sm font-mono">
              {canBuyTicket ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
              {canBuyTicket ? 'True (Билет выдан)' : 'False (Отказ)'}
            </span>
          </div>
        </div>

        {/* OR Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Оператор or (ИЛИ)
              </span>
              <span className="text-xs text-slate-400">Хотя бы одно True</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Выходной день: если день равен <code className="text-sky-300">"Суббота"</code> <strong className="text-white">or</strong> <code className="text-sky-300">"Воскресенье"</code>:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 mb-1">Выберите день недели:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {['Понедельник', 'Среда', 'Суббота', 'Воскресенье'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(d)}
                    className={`px-2 py-1.5 rounded text-xs font-medium cursor-pointer transition ${
                      day === d ? 'bg-sky-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 font-mono text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              <div>day == "Суббота": <strong className={day === 'Суббота' ? 'text-emerald-400' : 'text-slate-500'}>{day === 'Суббота' ? 'True' : 'False'}</strong></div>
              <div>day == "Воскресенье": <strong className={day === 'Воскресенье' ? 'text-emerald-400' : 'text-slate-500'}>{day === 'Воскресенье' ? 'True' : 'False'}</strong></div>
            </div>
          </div>

          <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${
            isWeekend ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <span>Результат or:</span>
            <span className="flex items-center gap-1 text-sm font-mono">
              {isWeekend ? <CheckCircle2 className="w-4 h-4 text-sky-400" /> : <XCircle className="w-4 h-4 text-slate-400" />}
              {isWeekend ? 'True (Выходной!)' : 'False (Будний день)'}
            </span>
          </div>
        </div>

        {/* NOT Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Оператор not (НЕ)
              </span>
              <span className="text-xs text-slate-400">Инверсия значения</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Идем гулять, если <strong className="text-white">not</strong> <code className="text-amber-300">is_raining</code>:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Идет дождь (is_raining):</span>
                <button
                  type="button"
                  onClick={() => setIsRaining(!isRaining)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold cursor-pointer transition ${
                    isRaining ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {isRaining ? '🌧️ Да (True)' : '☀️ Нет (False)'}
                </button>
              </div>
            </div>

            <div className="mt-3 font-mono text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800">
              <div>is_raining: <strong>{isRaining ? 'True' : 'False'}</strong></div>
              <div>not is_raining: <strong className={canWalk ? 'text-emerald-400' : 'text-rose-400'}>{canWalk ? 'True' : 'False'}</strong></div>
            </div>
          </div>

          <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${
            canWalk ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            <span>Результат not:</span>
            <span className="flex items-center gap-1 text-sm font-mono">
              {canWalk ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-400" />}
              {canWalk ? 'True (Идем гулять!)' : 'False (Остаемся дома)'}
            </span>
          </div>
        </div>
      </div>

      {/* Live Custom Expression Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="font-semibold text-sm text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Песочница выражений: проверь любое условие Python в реальном времени
          </div>
          <div className="flex gap-2">
            {[
              '10 > 5 and 3 < 1',
              '7 == 7 or 4 != 4',
              'not (5 > 10)',
              '10 % 2 == 0'
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCustomExpr(preset)}
                className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full font-mono text-sm">
            <input
              type="text"
              value={customExpr}
              onChange={(e) => setCustomExpr(e.target.value)}
              placeholder="Введите выражение, например: (5 >= 3) and not (2 == 4)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 font-mono font-bold text-sm min-w-36 justify-center ${
            customResult.error
              ? 'bg-rose-950/50 border-rose-700 text-rose-300'
              : customResult.result
              ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300'
              : 'bg-amber-950/50 border-amber-600 text-amber-300'
          }`}>
            {customResult.error ? (
              <span>⚠️ Ошибка</span>
            ) : customResult.result ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>True (Истина)</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-amber-400" />
                <span>False (Ложь)</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
