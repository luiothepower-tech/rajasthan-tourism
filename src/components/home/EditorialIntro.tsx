import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Castle, Droplets, Sun, Sparkles, Feather } from 'lucide-react';

export const EditorialIntro: React.FC = () => {
  return (
    <Section id="editorial-intro" variant="sandstone" padding="lg" className="border-b border-[#E7DFD5]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Subtle Top Cultural Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] text-xs font-semibold text-[#843B20]">
            <Sparkles className="w-3.5 h-3.5 text-[#B85D38]" />
            <span className="uppercase tracking-widest text-[11px]">The Living Chronicle of Rajputana</span>
          </div>

          {/* Majestic Editorial Heading */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-tight">
              A realm carved from sun-baked sandstone, royal vows, and eternal sands.
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#B85D38] max-w-2xl mx-auto">
              "वीर भोग्या वसुन्धरा" — The earth is enjoyed by the valiant.
            </p>
          </div>

          {/* Editorial Prose Body */}
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-3xl mx-auto font-light">
            Rajasthan is not a museum preserved in glass. It is a living, breathing civilization where twenty-two former princely states interlace their songs, cuisine, and colossal architecture into daily life. From the wind-sung dunes of the Thar desert to the verdant hilltops of the ancient Aravalli mountains, every gateway tells of chivalry, every stepwell reveals mathematical genius, and every courtyard echoes with generational music.
          </p>

          {/* 4 Cultural Foundations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD5] space-y-3 shadow-xs hover:border-[#B85D38]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#F9EBE5] text-[#B85D38] flex items-center justify-center">
                <Castle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Colossal Citadels</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                UNESCO World Heritage forts perched on 400-foot basalt cliffs, housing living temples, artisan communities, and royal armories.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD5] space-y-3 shadow-xs hover:border-[#2A4B6B]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#2A4B6B] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Water Architecture</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ingenious baoris (stepwells) and rain-fed lake basins engineered centuries ago to turn harsh desert droughts into architectural marvels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD5] space-y-3 shadow-xs hover:border-[#D97706]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Desert Nomads</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The Thar desert’s Manganiyar balladeers, camel caravans, and star-canopied sands preserving ancient oral history across centuries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E7DFD5] space-y-3 shadow-xs hover:border-[#842222]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#842222] flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Living Artisan Guilds</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Generational masters practicing natural vegetable dye block printing, gemstone cutting, blue pottery, and Makrana marble sculpting.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
