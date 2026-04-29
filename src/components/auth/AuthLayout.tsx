import Link from 'next/link';

export default function AuthLayout({
  children,
  title,
  subtitle,
  type,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'login' | 'signup';
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white text-slate-900">

      {/* LEFT */}
      <main className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 relative">

        {/* Logo */}
        <header className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="font-extrabold text-lg">Mae-Habit</span>
        </header>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto pt-24">
          
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-slate-500 text-lg">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </main>

      {/* RIGHT */}
      <section className="hidden md:flex items-center justify-center bg-slate-50 border-l border-slate-100 p-16">
        <div className="max-w-md text-center">
          <div className="w-48 h-48 mx-auto mb-10 bg-violet-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-violet-600 rounded-full opacity-80" />
          </div>

          <h2 className="text-3xl font-extrabold mb-4">
            Build better habits every day
          </h2>

          <p className="text-slate-500">
            Small consistent actions create long-term transformation.
          </p>
        </div>
      </section>
    </div>
  );
}