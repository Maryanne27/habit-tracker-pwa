'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Menu } from 'lucide-react'; 

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="min-h-screen bg-white text-slate-900 font-sans"
    >
      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="text-xl font-extrabold tracking-tight">Mae-Habit</span>
        </div>

        <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <Menu size={28} className="text-slate-800" />
        </button>
      </nav>

      {/* HERO */}
      <main className="pt-16 px-6 lg:px-16 lg:pt-4 pb-2 lg:pb-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
  
  {/* LEFT */}
  <div>
    <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
      <Star size={16} fill="currentColor" />
      <span>Build better habits daily</span>
    </div>

    <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
      Design the life <br />
      <span className="text-violet-600">you want.</span>
    </h1>

    <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed">
      Track habits, stay consistent, and grow every single day with our intuitive interface.
    </p>

    <div className="flex gap-4 flex-col sm:flex-row">
      <Link
        href="/signup"
        className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-center hover:bg-violet-700 transition-all active:scale-95 shadow-lg shadow-violet-100"
      >
        Get Started
      </Link>

      <Link
        href="/login"
        className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-bold text-center hover:bg-slate-200 transition-all"
      >
        Login
      </Link>
    </div>

    <p className="mt-10 text-sm font-medium text-slate-400">
      Trusted by habit builders across the globe
    </p>
  </div>

  {/* RIGHT */}
<div className="hidden lg:flex justify-end overflow-hidden">
  <div className="w-full max-w-md flex justify-end">
    <Image
      src="/screen.png"
      alt="Mae-Habit App Dashboard"
      width={400}
      height={400}
      priority
      className="w-full h-auto max-w-[400px] object-contain rounded-2xl shadow-2xl"
    />
  </div>
</div>

</main>
    </div>
  );
}