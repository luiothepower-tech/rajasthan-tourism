import React, { useEffect } from 'react';
import { useDocumentMeta } from '../lib/seo';
import { tourismRepository } from '../lib/repository';
import { Link } from '../lib/router';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { Sparkles, Clock, Compass, ArrowRight } from 'lucide-react';

export const ExperiencesView: React.FC = () => {
  useDocumentMeta(
    'Cultural Experiences & Safaris | Rajasthan Tourism',
    'Immerse yourself in authentic Rajasthani heritage: Thar desert camel treks, sunset boat rides on Lake Pichola, and traditional block printing workshops.'
  );

  const experiences = tourismRepository.getAllExperiences();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-[#B85D38]', 'ring-offset-2');
          setTimeout(() => el.classList.remove('ring-2', 'ring-[#B85D38]', 'ring-offset-2'), 2500);
        }, 200);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <Section variant="sandstone" padding="md" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
              <Sparkles className="w-4 h-4" />
              <span>Cultural Odyssey</span>
            </div>
            <Heading level={1} variant="display">
              Curated Experiences
            </Heading>
            <Text variant="lead" color="secondary">
              From starlit dunes in the Thar desert to heritage block-printing ateliers and twilight lake cruises.
            </Text>
          </div>
        </Container>
      </Section>

      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => {
              const detailUrl = `/experiences/${exp.slug || exp.id}`;
              return (
                <Card
                  key={exp.id}
                  id={exp.id}
                  variant="hover-lift"
                  hoverLift
                  interactive
                  padding="none"
                  className="flex flex-col justify-between group overflow-hidden"
                >
                  <Link href={detailUrl} className="block flex-1 flex flex-col justify-between focus:outline-hidden">
                    <div>
                      <div className="overflow-hidden bg-stone-200">
                        <ResponsiveImage
                          src={exp.image}
                          alt={exp.title}
                          aspectRatio="16/9"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="indigo" size="sm">
                            {exp.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-stone-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>

                        <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                          {exp.title}
                        </h2>

                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-stone-600 border border-[#E7DFD5]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
                      <span className="truncate max-w-[160px]">Available in: {exp.destinationIds.join(', ')}</span>
                      <span className="text-xs font-semibold text-[#B85D38] group-hover:text-[#9E4A2A] flex items-center gap-1 shrink-0">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
};
