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
    <section className="py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-[120px]">
        <div ref={containerRef} className="mb-12">
          <h2 className="mb-6 text-center font-['Plus_Jakarta_Sans'] text-[48px] leading-[48px] tracking-[0px] font-medium text-white">
            Transparent pricing for real-world teams
          </h2>
          <p className="mx-auto max-w-[800px] text-center font-['Plus_Jakarta_Sans'] text-[32px] leading-[28pt] tracking-[0px] font-normal text-black">
            We don't force fixed packages that don't fit.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 justify-items-center gap-x-6 gap-y-6 xl:grid-cols-3">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="w-full max-w-[304px] rounded-lg border border-white bg-white/45 px-[25px] pt-[27px] pb-[39px] backdrop-blur-sm hover:border-[#f05123] hover:shadow-md transition-all duration-300 md:h-[220px] md:w-[304px]"
            >
              <h3 className="mb-[12px] font-['Inter'] text-[24px] leading-[32px] tracking-[0px] font-medium text-[#0A0A0A]">
                {option.title}
              </h3>
              <div className="mb-[33px] font-['Inter'] text-[30px] leading-[36px] tracking-[0px] font-normal text-[#f05123]">
                {option.price}
              </div>
              <p className="font-['Inter'] text-[16px] leading-[24px] tracking-[0px] font-normal text-[#6B6B6B]">
                {option.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
