
import React from 'react';
import { Plus, Sprout, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

export const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-500">
      {/* Visual Illustration Area */}
      <div className="relative mb-8">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-violet-200 rounded-full blur-3xl opacity-30 scale-150 animate-pulse"></div>
        
        {/* Main Icon / Illustration */}
        <div className="relative w-32 h-32 bg-white rounded-[40px] shadow-2xl shadow-violet-100 flex items-center justify-center border-2 border-violet-50">
          <Sprout size={64} className="text-violet-600 animate-bounce duration-[3000ms]" />
          
          {/* Floating Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 text-teal-400 animate-pulse" size={24} />
          <Sparkles className="absolute -bottom-4 -left-4 text-violet-300 animate-pulse delay-700" size={20} />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-xs space-y-3">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Your garden is quiet
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed">
          Every great transformation starts with a single small seed. What habit will you plant today?
        </p>
      </div>

      {/* Primary CTA */}
      <button
        onClick={onAddClick}
        className="mt-10 group flex items-center gap-3 bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-violet-700 transition-all active:scale-95 shadow-xl shadow-violet-200"
      >
        <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        <span>Plant First Habit</span>
      </button>

      {/* Subtle Hint */}
      <p className="mt-6 text-xs font-bold text-slate-300 uppercase tracking-widest">
        Consistency starts now
      </p>
    </div>
  );
};