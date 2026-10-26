import React from 'react';
import { Printer, X, Download, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Шпаргалка к экзамену: Условные конструкции в Python (10 класс)
              </h3>
              <p className="text-xs text-slate-400">
                Компактный справочник для экспресс-повторения перед уроком или контрольной
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition shadow"
            >
              <Printer className="w-4 h-4" />
              Распечатать
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 space-y-6 text-xs printable-sheet">
          {/* Section 1: 3 Golden Rules */}
          <div className="border border-slate-800 bg-slate-950 rounded-2xl p-4">
            <div className="text-sm font-bold text-amber-300 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              3 ЗОЛОТЫХ ПРАВИЛА СИНТАКСИСА PYTHON
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">1. Двоеточие (:)</strong>
                В конце строк с <code className="text-purple-300">if</code>, <code className="text-purple-300">elif</code> и <code className="text-purple-300">else</code> ВСЕГДА ставится <code className="text-amber-400 font-bold">:</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">2. Отступы (Indentation)</strong>
                Тело ветки отделяется <strong>4 пробелами</strong> (Tab). Фигурных скобок и begin/end нет!
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-white block mb-1">3. = против ==</strong>
                <code className="text-rose-400 font-bold">=</code> — присваивание значения.<br />
                <code className="text-emerald-400 font-bold">==</code> — проверка на равенство!
              </div>
            </div>
          </div>

          {/* Section 2: Operators & Logic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Operators */}
            <div className="border border-slate-800 bg-slate-950 rounded-2xl p-4">
              <div className="text-sm font-bold text-sky-300 mb-2">
                ОПЕРАТОРЫ СРАВНЕНИЯ
              </div>
              <table className="w-full text-[11px] font-mono">
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="py-1 text-emerald-400 font-bold">==</td><td className="py-1 font-sans">Равно</td><td className="py-1 text-slate-400">5 == 5 (True)</td></tr>
                  <tr><td className="py-1 text-emerald-400 font-bold">!=</td><td className="py-1 font-sans">НЕ равно</td><td className="py-1 text-slate-400">5 != 3 (True)</td></tr>
                  <tr><td className="py-1 text-emerald-400 font-bold">&gt;</td><td className="py-1 font-sans">Больше</td><td className="py-1 text-slate-400">10 &gt; 5 (True)</td></tr>
                  <tr><td className="py-1 text-emerald-400 font-bold">&lt;</td><td className="py-1 font-sans">Меньше</td><td className="py-1 text-slate-400">3 &lt; 9 (True)</td></tr>
                  <tr><td className="py-1 text-emerald-400 font-bold">&gt;=</td><td className="py-1 font-sans">Больше или равно</td><td className="py-1 text-slate-400">10 &gt;= 10 (True)</td></tr>
                  <tr><td className="py-1 text-emerald-400 font-bold">&lt;=</td><td className="py-1 font-sans">Меньше или равно</td><td className="py-1 text-slate-400">4 &lt;= 8 (True)</td></tr>
                </tbody>
              </table>
            </div>

            {/* Logic */}
            <div className="border border-slate-800 bg-slate-950 rounded-2xl p-4">
              <div className="text-sm font-bold text-purple-300 mb-2">
                ЛОГИЧЕСКИЕ СВЯЗКИ
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-purple-400 font-mono">and (И)</span>: True ТОЛЬКО если <strong>оба</strong> верны:
                  <div className="text-slate-400 font-mono mt-0.5">True and True = True | True and False = False</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-sky-400 font-mono">or (ИЛИ)</span>: True, если верен <strong>хотя бы один</strong>:
                  <div className="text-slate-400 font-mono mt-0.5">False or True = True | False or False = False</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-400 font-mono">not (НЕ)</span>: переворачивает результат:
                  <div className="text-slate-400 font-mono mt-0.5">not False = True | not True = False</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Templates & Cascades */}
          <div className="border border-slate-800 bg-slate-950 rounded-2xl p-4">
            <div className="text-sm font-bold text-emerald-300 mb-2">
              ЭТАЛОННЫЙ ШАБЛОН КАСКАДА (if - elif - else)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-purple-400">if score &gt;= 90:</div>
                <div className="pl-4 text-emerald-300">print("Отлично (5)")</div>
                <div className="text-purple-400">elif score &gt;= 75:</div>
                <div className="pl-4 text-emerald-300">print("Хорошо (4)")</div>
                <div className="text-purple-400">elif score &gt;= 50:</div>
                <div className="pl-4 text-emerald-300">print("Удовл (3)")</div>
                <div className="text-purple-400">else:</div>
                <div className="pl-4 text-emerald-300">print("Неуд (2)")</div>
              </div>

              <div className="text-slate-300 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Проверка идет <strong>строго сверху вниз</strong>. Как только найдено первое True — программа выходит из каскада!</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>У слова <code className="text-purple-300">else</code> НИКОГДА нет условия! Оно означает «во всех остальных случаях».</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Для диапазонов в Python можно писать математически: <code className="text-sky-300">13 &lt;= age &lt;= 17</code>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Golden Exam Traps */}
          <div className="border border-rose-900/40 bg-rose-950/20 rounded-2xl p-4">
            <div className="text-sm font-bold text-rose-300 mb-2">
              ⚡ ТОП-3 ЛОВУШКИ В ЭКЗАМЕНАЦИОННЫХ ТЕСТАХ
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
              <div className="p-2.5 rounded bg-slate-950 border border-rose-900/30">
                <strong className="text-rose-400 block mb-1">Независимые if:</strong>
                Два оператора <code className="text-purple-300">if</code> подряд выполняются ОБА, если их условия истинны! В отличие от <code className="text-sky-300">elif</code>.
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-rose-900/30">
                <strong className="text-rose-400 block mb-1">Строгое &gt; vs &gt;=:</strong>
                При <code className="text-purple-300">total &gt; 1000</code> число 1000 дает False! Скидки при 1000 нет.
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-rose-900/30">
                <strong className="text-rose-400 block mb-1">Диапазоны: and, не or:</strong>
                Подросток: <code className="text-emerald-400">age &gt;= 13 and age &lt;= 17</code>. Если написать <code className="text-rose-400">or</code>, то 50 лет тоже станет True!
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Подготовка к школьному экзамену по информатике, 10 класс</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
