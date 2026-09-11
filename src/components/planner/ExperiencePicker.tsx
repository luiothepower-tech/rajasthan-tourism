import React from 'react';
import { Experience } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { Sparkles, Check, Plus, Clock, Tag, MapPin } from 'lucide-react';

interface ExperiencePickerProps {
  experiences: Experience[];
  selectedExperienceIds: string[];
  selectedDestinationIds: string[];
  onToggleExperience: (experienceId: string) => void;
}

export const ExperiencePicker: React.FC<ExperiencePickerProps> = ({
  experiences,
  selectedExperienceIds,
  selectedDestinationIds,
  onToggleExperience,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
              5
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Curated Cultural Experiences
            </h3>
          </div>
          <p className="text-sm text-stone-600 mt-1">
            Enrich your days with verified immersive experiences, from desert dune stargazing to hand block-printing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-[#E7DFD5]">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D38]" />
          <span>Selected Experiences:</span>
          <span className="text-[#B85D38] font-bold">
            {selectedExperienceIds.length} Added
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp) => {
          const isSelected = selectedExperienceIds.includes(exp.id);
          const matchesCurrentRoute = exp.destinationIds.some((destId) =>
            selectedDestinationIds.includes(destId)
          );

          return (
            <div
              key={exp.id}
              className={`group bg-white rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#B85D38] ring-2 ring-[#B85D38]/20 shadow-sm'
                  : 'border-[#E7DFD5] hover:border-stone-400'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <ResponsiveImage
                    src={exp.image}
                    alt={exp.title}
                    aspectRatio="16:9"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                      {exp.category}
                    </span>

                    {matchesCurrentRoute ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white shadow-xs">
                        On Your Route
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-800/80 text-stone-200 backdrop-blur-xs">
                        Other Region
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                    <h5 className="font-serif text-base font-bold leading-tight drop-shadow-sm">
                      {exp.title}
                    </h5>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Duration: {exp.duration}</span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#FAF7F2] text-stone-600 text-[10px] rounded border border-[#E7DFD5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => onToggleExperience(exp.id)}
                  aria-label={
                    isSelected
                      ? `Remove ${exp.title} from itinerary`
                      : `Add ${exp.title} to itinerary`
                  }
                  className={`w-full min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    isSelected
                      ? 'bg-[#F9EBE5] text-[#843B20] border-[#F3D4C7] hover:bg-[#F3D4C7]'
                      : 'bg-white text-stone-800 border-[#E7DFD5] hover:border-[#B85D38] hover:bg-[#FAF7F2]'
                  } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#B85D38]" />
                      <span>Added to Itinerary</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-stone-500" />
                      <span>Include Experience</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
