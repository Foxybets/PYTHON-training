import React, { useState } from 'react';
import { InteractiveFlowchart } from './InteractiveFlowchart.tsx';
import { LogicPlayground } from './LogicPlayground.tsx';
import { IndependentIfComparison } from './IndependentIfComparison.tsx';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  ArrowRight,
  Code2
} from 'lucide-react';

interface TheorySectionProps {
  onOpenCodeInTracer: (code: string) => void;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ onOpenCodeInTracer }) => {
  const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3' | 'part4' | 'part5'>('part1');

  return (
    <div className="space-y-8">
      {/* Navigation sub-tabs for theory parts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg flex flex-wrap gap-1.5">
        {[
          { id: 'part1', label: '1. Как компьютер решает', icon: Cpu },
          { id: 'part2', label: '2. Три правила синтаксиса', icon: Lightbulb },
          { id: 'part3', label: '3. Операторы и логика', icon: Layers },
          { id: 'part4', label: '4. Типы конструкций', icon: BookOpen },
          { id: 'part5', label: '5. Топ-4 ошибок экзамена', icon: AlertTriangle }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Part 1 */}
      {activeTab === 'part1' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <Cpu className="w-5 h-5" />
              </span>
              Часть 1. Теория: Как компьютер принимает решения
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              В обычной жизни мы постоянно принимаем решения по условиям:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">🌧️</span>
                <span>«<strong>Если</strong> идет дождь — я беру зонт, <strong>иначе</strong> — надеваю кепку».</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold shrink-0">🚦</span>
                <span>«<strong>Если</strong> на светофоре зеленый — иди; <strong>если</strong> желтый — приготовься; <strong>иначе</strong> — стой».</span>
              </li>
            </ul>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              В программировании это называется <strong>ветвлением (алгоритмической конструкцией выбора)</strong>. Компьютер вычисляет условие: оно всегда дает ровно один из двух ответов — либо <strong>истина (<code className="text-emerald-400">True</code>)</strong>, либо <strong>ложь (<code className="text-rose-400">False</code>)</strong>. В зависимости от этого выполняется нужная ветка программы.
            </p>
          </div>

          <InteractiveFlowchart />
        </div>
      )}

      {/* Part 2 */}
      {activeTab === 'part2' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </span>
              Часть 2. Три золотых правила синтаксиса Python
            </h3>
            <p className="text-xs text-slate-400">
              На контрольных и экзаменах до 80% баллов теряется не на сложной логике, а на базовом синтаксисе. Выучите эти 3 правила наизусть!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rule 1: Colon */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  Двоеточие (<code className="text-amber-400">:</code>) в конце
                </h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  После любого условия (<code className="text-purple-300">if</code>, <code className="text-purple-300">elif</code>) и после слова <code className="text-purple-300">else</code> <strong>всегда</strong> ставится двоеточие!
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300">
                    <span className="font-sans text-[10px] text-rose-400 block font-bold mb-0.5">❌ ОШИБКА:</span>
                    if x &gt; 5
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                    <span className="font-sans text-[10px] text-emerald-400 block font-bold mb-0.5">✅ ПРАВИЛЬНО:</span>
                    if x &gt; 5:
                  </div>
                </div>
              </div>
            </div>

            {/* Rule 2: Indentation */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  Отступы (Indentation)
                </h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Вместо фигурных скобок <code className="text-slate-400">{`{}`}</code> или <code className="text-slate-400">begin...end</code>, принадлежность команды ветке в Python определяется <strong>отступом</strong> (4 пробела или Tab).
                </p>

                <div className="font-mono text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-purple-400">if score &gt; 50:</div>
                  <div className="pl-4 text-emerald-300 bg-emerald-950/30 rounded py-0.5 px-1 border border-emerald-900/30">
                    print("Сдан!") <span className="text-[10px] text-slate-500 font-sans"># внутри if</span>
                  </div>
                  <div className="text-slate-400 pt-1">
                    print("Конец") <span className="text-[10px] text-slate-500 font-sans"># вне if (всегда)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule 3: = vs == */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  <code className="text-rose-400">=</code> против <code className="text-emerald-400">==</code>
                </h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Одинарный знак <code className="text-rose-400">=</code> — это команда <strong>присвоить</strong> значение. Двойной знак <code className="text-emerald-400">==</code> — это <strong>вопрос: «равны ли?»</strong>.
                </p>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">age = 15</span>
                    <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                      (присвоили переменной 15)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-purple-400">if</span> age == 15:
                    <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                      (спрашиваем: age равно 15?)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Part 3 */}
      {activeTab === 'part3' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-sky-600/20 text-sky-400">
                <Layers className="w-5 h-5" />
              </span>
              Часть 3. Операторы сравнения и логические связки
            </h3>
            <p className="text-xs text-slate-400">
              Любое условие внутри <code className="text-purple-300">if</code> дает результат <code className="text-emerald-400">True</code> или <code className="text-rose-400">False</code>.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wider">
              Таблица операторов сравнения Python
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Оператор</th>
                    <th className="py-2.5 px-4 font-semibold">Значение</th>
                    <th className="py-2.5 px-4 font-semibold">Пример</th>
                    <th className="py-2.5 px-4 font-semibold">Результат</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">==</td>
                    <td className="py-2.5 px-4 font-sans">Равно</td>
                    <td className="py-2.5 px-4">5 == 5</td>
                    <td className="py-2.5 px-4 text-emerald-400 font-bold">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">!=</td>
                    <td className="py-2.5 px-4 font-sans font-bold text-amber-300">Не равно</td>
                    <td className="py-2.5 px-4">5 != 3</td>
                    <td className="py-2.5 px-4 text-emerald-400 font-bold">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">&gt;</td>
                    <td className="py-2.5 px-4 font-sans">Больше</td>
                    <td className="py-2.5 px-4">10 &gt; 20</td>
                    <td className="py-2.5 px-4 text-rose-400 font-bold">False</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">&lt;</td>
                    <td className="py-2.5 px-4 font-sans">Меньше</td>
                    <td className="py-2.5 px-4">7 &lt; 12</td>
                    <td className="py-2.5 px-4 text-emerald-400 font-bold">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">&gt;=</td>
                    <td className="py-2.5 px-4 font-sans">Больше или равно</td>
                    <td className="py-2.5 px-4">10 &gt;= 10</td>
                    <td className="py-2.5 px-4 text-emerald-400 font-bold">True</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">&lt;=</td>
                    <td className="py-2.5 px-4 font-sans">Меньше или равно</td>
                    <td className="py-2.5 px-4">8 &lt;= 5</td>
                    <td className="py-2.5 px-4 text-rose-400 font-bold">False</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Logic Simulator */}
          <LogicPlayground />
        </div>
      )}

      {/* Part 4 */}
      {activeTab === 'part4' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                <BookOpen className="w-5 h-5" />
              </span>
              Часть 4. Основные типы условных конструкций
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python поддерживает 3 основные формы ветвления: от простой проверки до многовариантных каскадов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                1. Одиночный if
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Когда действие нужно выполнить только при True, а при False — просто идти дальше.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-slate-400">temperature = -5</div>
                <div className="text-purple-400 font-bold mt-1">if temperature &lt; 0:</div>
                <div className="pl-4 text-emerald-300">print("Мороз!")</div>
              </div>
            </div>

            {/* Form 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                2. Полная форма if - else
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Ровно два взаимоисключающих исхода («или то, или другое»). У else <strong>нет условия</strong>!
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-purple-400 font-bold">if number % 2 == 0:</div>
                <div className="pl-4 text-emerald-300">print("Четное")</div>
                <div className="text-purple-400 font-bold">else:</div>
                <div className="pl-4 text-emerald-300">print("Нечетное")</div>
              </div>
            </div>

            {/* Form 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                3. Каскад if - elif - else
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Когда вариантов 3 и более. Проверяется строго сверху вниз до <strong>первого True</strong>!
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-purple-400 font-bold">if score &gt;= 90:</div>
                <div className="pl-4 text-emerald-300">print("5")</div>
                <div className="text-purple-400 font-bold">elif score &gt;= 75:</div>
                <div className="pl-4 text-emerald-300">print("4")</div>
                <div className="text-purple-400 font-bold">else:</div>
                <div className="pl-4 text-emerald-300">print("3")</div>
              </div>
            </div>
          </div>

          {/* Interactive Independent IF vs IF-ELIF */}
          <IndependentIfComparison />
        </div>
      )}

      {/* Part 5 */}
      {activeTab === 'part5' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </span>
              Часть 5. Топ-4 типичных экзаменационных ошибок
            </h3>
            <p className="text-xs text-slate-400">
              По статистике, более 70% ошибок на экзамене по информатике в 10 классе происходят именно здесь:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-600/30 text-rose-300 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h4 className="text-sm font-bold text-white">
                  Знак <code className="text-rose-400">=</code> вместо <code className="text-emerald-400">==</code> в условии
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                В условии проверяется равенство, поэтому нужно два знака! Одинарный знак пытается изменить переменную прямо в заголовке if и приводит к <code className="text-rose-400">SyntaxError: invalid syntax</code>.
              </p>
              <div className="font-mono text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-rose-400"># ❌ ОШИБКА: if x = 10:</div>
                <div className="text-emerald-400"># ✅ ПРАВИЛЬНО: if x == 10:</div>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-600/30 text-rose-300 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h4 className="text-sm font-bold text-white">
                  Написание условия после слова <code className="text-purple-400">else</code>
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Слово <code className="text-purple-400">else</code> означает «во всех остальных случаях». У него НИКОГДА не пишутся скобки или выражения. Если нужно условие — пишите <code className="text-purple-400">elif</code>!
              </p>
              <div className="font-mono text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-rose-400"># ❌ ОШИБКА: else x &lt; 0:</div>
                <div className="text-emerald-400"># ✅ ПРАВИЛЬНО: elif x &lt; 0: или просто else:</div>
              </div>
            </div>

            {/* Trap 3 */}
            <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-600/30 text-rose-300 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="text-sm font-bold text-white">
                  Неправильный порядок проверки диапазонов
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Если проверять <code className="text-purple-400">if age &gt; 10:</code> перед <code className="text-purple-400">elif age &gt; 18:</code>, то при возрасте 25 программа сработает на первом условии и до второго <strong>никогда не дойдет</strong>!
              </p>
              <div className="font-mono text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-rose-400"># ❌ ОШИБКА: if age &gt; 10: ... elif age &gt; 18:</div>
                <div className="text-emerald-400"># ✅ ПРАВИЛЬНО: начинать с самых больших (age &gt; 18)</div>
              </div>
            </div>

            {/* Trap 4 */}
            <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-600/30 text-rose-300 text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h4 className="text-sm font-bold text-white">
                  Пропуск двоеточия <code className="text-amber-400">:</code> или плавающие отступы
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Каждый заголовок условной ветки обязан заканчиваться двоеточием, а все строки внутри блока должны иметь строго одинаковый отступ (ровно 4 пробела).
              </p>
              <div className="font-mono text-xs space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-rose-400"># ❌ IndentationError / SyntaxError: expected ':'</div>
                <div className="text-emerald-400"># ✅ Всегда 4 пробела и ':' на конце</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
