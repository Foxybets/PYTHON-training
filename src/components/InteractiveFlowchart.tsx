import React, { useState } from 'react';
import { ArrowDown, Check, X, RefreshCw } from 'lucide-react';

export const InteractiveFlowchart: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(-5);

  const isFreezing = temperature < 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <RefreshCw className="w-4 h-4" />
            </span>
            Интерактивная блок-схема ветвления
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Подвигайте ползунок температуры, чтобы увидеть, как компьютер выбирает путь в блок-схеме:
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <label htmlFor="temp-slider" className="text-xs font-semibold text-slate-300">
            Температура:
          </label>
          <input
            id="temp-slider"
            type="range"
            min="-20"
            max="30"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-28 accent-emerald-500 cursor-pointer"
          />
          <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${temperature < 0 ? 'text-sky-400 bg-sky-950/60' : 'text-amber-400 bg-amber-950/60'}`}>
            {temperature > 0 ? `+${temperature}` : temperature}°C
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Python Code side */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-sm">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-sans font-semibold">
            Код программы на Python
          </div>
          <div className="space-y-1.5">
            <div className="text-slate-400">
              <span className="text-indigo-400">temperature</span> = <span className="text-amber-300">{temperature}</span>
            </div>
            <div className={`p-2 rounded-lg transition-all ${isFreezing ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300' : 'text-slate-300'}`}>
              <span className="text-purple-400 font-bold">if</span> temperature &lt; 0:
              <div className="text-xs text-slate-400 font-sans mt-0.5">
                ↳ Вычисляется: {temperature} &lt; 0 → <strong className={isFreezing ? 'text-emerald-400' : 'text-rose-400'}>{isFreezing ? 'True (Истина)' : 'False (Ложь)'}</strong>
              </div>
            </div>
            <div className={`pl-6 py-1.5 rounded-lg transition-all ${isFreezing ? 'bg-emerald-500/20 text-emerald-200 font-bold' : 'text-slate-600 line-through'}`}>
              <span className="text-sky-300">print</span>(<span className="text-amber-300">"На улице мороз!"</span>)
            </div>
            <div className={`p-2 rounded-lg transition-all ${!isFreezing ? 'bg-amber-950/50 border border-amber-500/40 text-amber-300' : 'text-slate-500'}`}>
              <span className="text-purple-400 font-bold">else</span>:
            </div>
            <div className={`pl-6 py-1.5 rounded-lg transition-all ${!isFreezing ? 'bg-amber-500/20 text-amber-200 font-bold' : 'text-slate-600 line-through'}`}>
              <span className="text-sky-300">print</span>(<span className="text-amber-300">"Выше нуля или ноль"</span>)
            </div>
            <div className="pt-2 text-slate-400 border-t border-slate-800">
              <span className="text-sky-300">print</span>(<span className="text-amber-300">"Идем дальше"</span>)
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Вывод в терминал: </span>
            <span className="font-bold text-white bg-slate-900 px-2 py-1 rounded border border-slate-700 ml-1">
              {isFreezing ? 'На улице мороз!' : 'Выше нуля или ноль'}
            </span>
          </div>
        </div>

        {/* Visual SVG Flowchart side */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-sans font-semibold">
            Блок-схема алгоритма (ГОСТ / Школьный стандарт)
          </div>

          <div className="w-full flex flex-col items-center space-y-2 text-xs">
            {/* Start Node */}
            <div className="px-5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold shadow">
              Начало: temperature = {temperature}
            </div>

            <ArrowDown className="w-4 h-4 text-slate-600" />

            {/* Diamond Condition Node */}
            <div className={`relative px-6 py-3.5 border-2 rounded-xl text-center font-bold transition-all shadow-lg ${
              isFreezing
                ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-2 ring-emerald-500/30'
                : 'border-amber-500 bg-amber-950/60 text-amber-200 ring-2 ring-amber-500/30'
            }`}>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans mb-1">
                Условие (Ромб)
              </div>
              <div>temperature &lt; 0 ?</div>
              <div className="text-[11px] font-mono mt-1 opacity-90">
                {temperature} &lt; 0 = {isFreezing ? 'True' : 'False'}
              </div>
            </div>

            {/* Branches: Left (Yes) / Right (No) */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              {/* Branch TRUE */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center gap-1 font-bold text-xs mb-1 ${isFreezing ? 'text-emerald-400' : 'text-slate-600'}`}>
                  <Check className="w-3.5 h-3.5" /> ДА (True)
                </div>
                <div className={`w-full p-2.5 rounded-lg border text-center transition-all ${
                  isFreezing
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-md font-bold'
                    : 'border-slate-800 bg-slate-900/50 text-slate-600 opacity-40'
                }`}>
                  print("На улице мороз!")
                </div>
              </div>

              {/* Branch FALSE */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center gap-1 font-bold text-xs mb-1 ${!isFreezing ? 'text-amber-400' : 'text-slate-600'}`}>
                  <X className="w-3.5 h-3.5" /> НЕТ (False)
                </div>
                <div className={`w-full p-2.5 rounded-lg border text-center transition-all ${
                  !isFreezing
                    ? 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-md font-bold'
                    : 'border-slate-800 bg-slate-900/50 text-slate-600 opacity-40'
                }`}>
                  print("Выше нуля или ноль")
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-slate-600 pt-1" />

            {/* Join End Node */}
            <div className="px-5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs">
              Продолжение: print("Идем дальше")
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
