import React, { useState, useEffect } from 'react';
import { TabType } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { TheorySection } from './components/TheorySection.tsx';
import { CodeTracer } from './components/CodeTracer.tsx';
import { PracticeBlock1 } from './components/PracticeBlock1.tsx';
import { PracticeBlock2 } from './components/PracticeBlock2.tsx';
import { PracticeBlock3 } from './components/PracticeBlock3.tsx';
import { ExamModeModal } from './components/ExamModeModal.tsx';
import { CheatSheetModal } from './components/CheatSheetModal.tsx';
import { BLOCK_1_TASKS, BLOCK_2_TASKS, BLOCK_3_TASKS } from './utils/tasksData.ts';
import { GraduationCap, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [tracerCode, setTracerCode] = useState<string>(BLOCK_1_TASKS[0].code);
  const [isExamOpen, setIsExamOpen] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  // Completed tasks persistent storage
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('python_if_completed_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const totalTasksCount = BLOCK_1_TASKS.length + BLOCK_2_TASKS.length + BLOCK_3_TASKS.length;

  const handleTaskCompleted = (taskId: string) => {
    setCompletedTaskIds(prev => {
      if (prev.includes(taskId)) return prev;
      const updated = [...prev, taskId];
      try {
        localStorage.setItem('python_if_completed_tasks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleOpenInTracer = (code: string) => {
    setTracerCode(code);
    setActiveTab('tracer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar with tabs and quick actions */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenExam={() => setIsExamOpen(true)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        completedTasksCount={completedTaskIds.length}
        totalTasksCount={totalTasksCount}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'theory' && (
          <TheorySection onOpenCodeInTracer={handleOpenInTracer} />
        )}

        {activeTab === 'tracer' && (
          <CodeTracer
            initialCode={tracerCode}
            onCodeChange={(c) => setTracerCode(c)}
          />
        )}

        {activeTab === 'block1' && (
          <PracticeBlock1
            onOpenInTracer={handleOpenInTracer}
            onTaskCompleted={handleTaskCompleted}
          />
        )}

        {activeTab === 'block2' && (
          <PracticeBlock2
            onTaskCompleted={handleTaskCompleted}
          />
        )}

        {activeTab === 'block3' && (
          <PracticeBlock3
            onTaskCompleted={handleTaskCompleted}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 sm:px-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Подготовка к школьному экзамену по информатике (10 класс)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              type="button"
              onClick={() => setIsCheatSheetOpen(true)}
              className="hover:text-white cursor-pointer transition"
            >
              Шпаргалка
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsExamOpen(true)}
              className="hover:text-white cursor-pointer transition"
            >
              Пройти экзамен
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-mono">
              Решено: {completedTaskIds.length}/{totalTasksCount}
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExamModeModal
        isOpen={isExamOpen}
        onClose={() => setIsExamOpen(false)}
      />

      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
}
