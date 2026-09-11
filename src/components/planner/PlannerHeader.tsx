import React from 'react';
import { Calendar, Share2, Printer, Check, Sparkles } from 'lucide-react';
import { PRESET_CIRCUITS } from '../../data/budgetConfig';
import { PresetCircuit } from '../../types/planner';
import { ResetTripButton } from './ResetTripButton';

interface PlannerHeaderProps {
  onReset: () => void;
  onCopySummary: () => void;
  onPrint: () => void;
  onSelectPreset: (preset: PresetCircuit) => void;
  copied: boolean;
}

export const PlannerHeader: React.FC<PlannerHeaderProps> = ({
  onReset,
  onCopySummary,
  onPrint,
  onSelectPreset,
  copied,
}) => {
  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#E7DFD5] pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9EBE5] rounded-full text-xs font-semibold uppercase tracking-widest text-[#B85D38] border border-[#F3D4C7]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Interactive Trip Architect</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Plan Your Rajasthan
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
              Craft your bespoke royal voyage across Rajasthan’s desert citadels, lake palaces, and living heritage.
              Select destinations, fine-tune pacing, explore day-by-day plans, and evaluate transparent planning budget estimates.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onCopySummary}
              aria-label="Copy itinerary summary"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] hover:text-[#B85D38] text-stone-700 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#B85D38]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-stone-500" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onPrint}
              aria-label="Print or save PDF of itinerary"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] hover:text-[#B85D38] text-stone-700 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#B85D38]"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print / Save PDF</span>
            </button>

            <ResetTripButton
              onReset={onReset}
              variant="toolbar"
              label="Reset Trip"
            />
          </div>
        </div>

        {/* Curated Circuit Presets Bar */}
        <div className="mt-8 pt-6 border-t border-[#E7DFD5]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
              <Sparkles className="w-4 h-4 text-[#B85D38]" />
              <span>Quick-Start Curated Circuits:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_CIRCUITS.map((circuit) => (
                <button
                  key={circuit.id}
                  type="button"
                  onClick={() => onSelectPreset(circuit)}
                  className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F9EBE5] hover:border-[#B85D38] border border-[#E7DFD5] text-stone-700 hover:text-[#843B20] text-xs font-medium rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#B85D38]"
                >
                  <span className="font-semibold">{circuit.name}</span>{' '}
                  <span className="text-stone-400 text-[11px]">({circuit.durationDays}d)</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
