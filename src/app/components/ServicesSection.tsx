import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Gamepad2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Smartphone,
    title: 'Super-app development',
    description: 'Scalable, multi-feature platforms',
  },
  {
    icon: Gamepad2,
    title: 'Mobile game development',
    description: 'Engaging and immersive user experiences',
  },
  {
    icon: Globe,
    title: 'High-conversion landing websites',
    description: 'Designed for clarity, trust, and results',
  },
];

export function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.12,
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
    <section id="about-what-we-do" className="bg-white py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div ref={titleRef} className="mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl max-w-[800px]">
            Our technical and creative expertise focuses on high-impact digital products
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-[#f05123]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl mb-2">{service.title}</h3>
                  <p className="text-[#6b6b6b] text-base md:text-lg">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
