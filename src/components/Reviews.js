import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const Reviews = ({ data, fullContent, isLight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || !data.items || data.items.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === data.items.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = data.items[currentIndex] || data.items[0];

  if (!currentSlide) return null;

  return (
    <SectionWrapper id="reviews" className="max-w-6xl mx-auto" pattern="grid">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">
          {interpolate(data.title, fullContent)}{' '}
          <span className={isLight ? 'text-blue-600' : 'text-blue-500'}>
            {interpolate(data.accent, fullContent)}
          </span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto">
          {interpolate(data.subtitle, fullContent)}
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div
          className={`p-8 md:p-12 rounded-2xl border border-[var(--border)] relative transition-all shadow-lg ${
            isLight ? 'shadow-blue-600/5' : 'shadow-blue-900/10'
          }`}
          style={{ background: 'var(--card-bg)' }}
        >
          {/* Decorative Quote Icon */}
          <div className={`absolute top-6 left-6 opacity-10 ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>
            <Quote size={48} />
          </div>

          <div className="flex flex-col items-center text-center relative z-10 px-4 md:px-8">
            <div className="flex gap-1 mb-6">
              {[...Array(currentSlide.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={isLight ? 'text-blue-600 fill-blue-600' : 'text-blue-400 fill-blue-400'}
                />
              ))}
            </div>

            <p className="text-lg md:text-xl font-medium text-[var(--text-main)] leading-relaxed mb-10">
              "{interpolate(currentSlide.text, fullContent)}"
            </p>

            <div>
              <h4 className="font-bold text-[var(--text-main)] text-lg mb-1">
                {interpolate(currentSlide.author, fullContent)}
              </h4>
              <p className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
                {interpolate(currentSlide.company, fullContent)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {data.items.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className={`p-3 rounded-full border border-[var(--border)] transition-all ${
                isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-800'
              } text-[var(--text-main)]`}
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {data.items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? (isLight ? 'bg-blue-600 scale-125' : 'bg-blue-500 scale-125')
                      : (isLight ? 'bg-slate-300' : 'bg-slate-700')
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className={`p-3 rounded-full border border-[var(--border)] transition-all ${
                isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-800'
              } text-[var(--text-main)]`}
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};
