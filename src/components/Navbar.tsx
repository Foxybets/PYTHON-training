import React from 'react';
import { TabType } from '../types/index.ts';
import { BookOpen, Cpu, Sparkles, Bug, Code2, Award, Printer, CheckCircle2, Share2 } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenExam: () => void;
  onOpenCheatSheet: () => void;
  onOpenShare: () => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenExam,
  onOpenCheatSheet,
  onOpenShare,
  completedTasksCount,
  totalTasksCount
}) => {
  const tabs = [
    { id: 'theory', label: 'Теория и правила', icon: BookOpen },
    { id: 'tracer', label: 'Визуализатор кода', icon: Cpu },
    { id: 'block1', label: 'Блок 1: Трассировка', icon: Sparkles },
    { id: 'block2', label: 'Блок 2: Ошибки', icon: Bug },
    { id: 'block3', label: 'Блок 3: Напиши код', icon: Code2 }
  ];

  const progressPercent = Math.round((completedTasksCount / totalTasksCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Python Условия: if, elif, else
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  10 класс Информатика
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Интерактивный учебник и тренажёр к школьному экзамену
              </p>
            </div>
          </div>

          {/* Progress & Quick Modals */}
          <div className="flex items-center gap-2.5 self-end md:self-auto flex-wrap sm:flex-nowrap">
            {/* Student Progress */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-400">Прогресс:</span>
                <span className="font-bold font-mono text-emerald-400">
                  {completedTasksCount} / {totalTasksCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-10 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Share / Teacher link button */}
            <button
              type="button"
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 transition cursor-pointer shadow-sm"
              title="Открыть QR-код и ссылку для учеников"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Раздать ученикам</span>
            </button>

            {/* Cheat Sheet button */}
            <button
              type="button"
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Шпаргалка</span>
            </button>

            {/* Exam Mode button */}
            <button
              type="button"
              onClick={onOpenExam}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40 transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Режим экзамена</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id as TabType)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
