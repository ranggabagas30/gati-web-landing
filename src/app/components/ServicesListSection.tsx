import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'MVP App Development',
  'Web Applications',
  'Website Landing Pages',
  'Digital Marketing',
  'Branding',
];

export function ServicesListSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
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
    <section id="services" className="bg-white py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group cursor-pointer"
            >
              <div className="p-6 rounded-lg hover:bg-[#f9f9f9] transition-all duration-300">
                <h3 className="text-xl group-hover:text-[#f05123] transition-colors duration-300">
                  {service}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
