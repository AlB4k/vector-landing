import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const BotChallenge = ({ onSuccess, companyName }) => {
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockUntil, setBlockUntil] = useState(null);
  const [challenge] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  });

  // Проверка блокировки при загрузке
  useEffect(() => {
    const blocked = sessionStorage.getItem('cms_blocked_until');
    if (blocked) {
      const blockTime = parseInt(blocked, 10);
      const now = Date.now();
      if (now < blockTime) {
        setIsBlocked(true);
        setBlockUntil(new Date(blockTime).toLocaleTimeString('ru-RU'));
      } else {
        sessionStorage.removeItem('cms_blocked_until');
        sessionStorage.removeItem('cms_attempts');
        setAttempts(0);
      }
    }

    const stored = parseInt(sessionStorage.getItem('cms_attempts') || '0', 10);
    setAttempts(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isBlocked) {
      return;
    }

    if (parseInt(answer, 10) === challenge.answer) {
      sessionStorage.setItem('cms_challenge_passed', 'true');
      onSuccess();
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    sessionStorage.setItem('cms_attempts', newAttempts.toString());
    setAnswer('');

    if (newAttempts >= 3) {
      const blockUntilTime = Date.now() + 5 * 60 * 1000; // 5 минут
      sessionStorage.setItem('cms_blocked_until', blockUntilTime.toString());
      setIsBlocked(true);
      setBlockUntil(new Date(blockUntilTime).toLocaleTimeString('ru-RU'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
              <AlertTriangle size={32} className="text-blue-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Проверка безопасности</h1>
          <p className="text-gray-400 text-center mb-6">
            Пожалуйста, докажите, что вы не робот
          </p>

          {isBlocked ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-semibold mb-2">Доступ ограничен</p>
              <p className="text-gray-300 text-sm">
                Попыток исчерпано. Повторите попытку после <span className="font-bold">{blockUntil}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-700/50 border border-white/5 rounded-xl p-4">
                <p className="text-white text-lg font-semibold text-center">
                  {challenge.a} + {challenge.b} = <span className="text-blue-400">?</span>
                </p>
              </div>

              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Введите ответ"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold hover:from-blue-700 hover:to-blue-600 transition-all active:scale-95"
              >
                Проверить
              </button>

              <p className="text-gray-500 text-xs text-center">
                Попыток: {attempts}/3
              </p>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-xs text-center">
              Администрация {companyName || 'компании'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotChallenge;
