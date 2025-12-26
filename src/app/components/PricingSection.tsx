import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pricingOptions = [
  {
    title: 'MVP Mobile App',
    price: '$5,000 – $12,000',
    description: 'Ideal for validation & early traction',
  },
  {
    title: 'Web App / Dashboard',
    price: '$3,000 – $8,000',
    description: 'Internal tools, admin panels, or MVP web products',
  },
  {
    title: 'Landing Website',
    price: '$800 – $2,000',
    description: 'High-conversion, performance-focused',
  },
];

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="bg-white py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div ref={containerRef} className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">Transparent pricing for real-world teams</h2>
          <p className="text-lg text-[#6b6b6b] max-w-[800px]">
            We understand that early-stage products come with real constraints — budget, time, and team size. 
            That's why we don't force fixed packages that don't fit. Instead, we adapt scope and execution to match 
            your current stage, while keeping quality and maintainability intact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-6 border border-[#e9ebef] rounded-lg hover:border-[#f05123] hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl mb-3">{option.title}</h3>
              <div className="text-3xl text-[#f05123] mb-3">{option.price}</div>
              <p className="text-[#6b6b6b]">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#f9f9f9] p-8 rounded-lg">
          <p className="text-lg text-[#6b6b6b] text-center max-w-[800px] mx-auto">
            If these ranges feel high for your current situation, talk to us anyway. 
            We're happy to suggest phased approaches, reduced scopes, or alternative solutions that still move your product forward.
          </p>
        </div>
      </div>
    </section>
  );
}
