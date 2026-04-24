import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound({ content }) {
  const version = content?.legal?.version || '2.4.0-PROD';

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-lg px-4">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mb-8 md:mb-12 mx-auto border border-red-500/20 shadow-2xl">
          <AlertCircle size={40} />
        </div>
        <h1 className="text-7xl sm:text-[120px] font-black leading-none mb-4 tracking-tighter opacity-10 select-none">404</h1>
        <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 tracking-tight uppercase leading-tight">Сбой маршрутизации</h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-10 md:mb-12 font-medium">
          Запрошенная страница не существует или была перемещена в архив. <br className="hidden sm:block" />
          Пожалуйста, вернитесь на главную панель управления.
        </p>

        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 group"
        >
          <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" /> Вернуться в начало
        </Link>
      </div>

      <footer className="absolute bottom-12 left-0 right-0 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700 select-none">
        System Status: Error 0x404 • URL_NOT_FOUND • v{version}
      </footer>
    </div>
  );
}
