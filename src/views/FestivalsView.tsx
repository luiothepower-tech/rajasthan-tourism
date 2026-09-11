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
import { Calendar, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const FestivalsView: React.FC = () => {
  useDocumentMeta(
    'Annual Festivals & Cultural Calendar | Rajasthan Tourism',
    'Plan your voyage around Rajasthan’s historic festivals: Pushkar Camel Fair, Desert Festival Jaisalmer, Teej, and Gangaur processions.'
  );

  const festivals = tourismRepository.getAllFestivals();

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
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D97706]">
              <Sparkles className="w-4 h-4" />
              <span>Cultural Calendar</span>
            </div>
            <Heading level={1} variant="display">
              Festivals & Celebrations
            </Heading>
            <Text variant="lead" color="secondary">
              Discover the spectacle of desert camel fairs, monsoon palanquin processions, and illuminated royal lake flotillas.
            </Text>
          </div>
        </Container>
      </Section>

      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festivals.map((fest) => {
              const detailUrl = `/festivals/${fest.slug || fest.id}`;
              return (
                <Card
                  key={fest.id}
                  id={fest.id}
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
                          src={fest.image}
                          alt={fest.name}
                          aspectRatio="16/9"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B45309]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{fest.approximateMonth}</span>
                          </div>
                          <Badge variant="saffron" size="sm">
                            Festival
                          </Badge>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <h2 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                            {fest.name}
                          </h2>
                          {fest.hindiName && (
                            <span className="text-xs font-serif text-stone-400">
                              {fest.hindiName}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {fest.description}
                        </p>

                        <div className="space-y-1 pt-2">
                          <p className="text-[11px] font-semibold text-stone-900 uppercase tracking-wide">
                            Highlights
                          </p>
                          <ul className="space-y-1">
                            {fest.highlights.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-600">
                                <span className="text-[#D97706]">•</span>
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
                      <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{fest.location}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#B85D38] group-hover:text-[#9E4A2A] flex items-center gap-1 shrink-0">
                        <span>Event Guide</span>
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
