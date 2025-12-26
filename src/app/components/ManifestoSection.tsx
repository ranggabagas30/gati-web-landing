import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoTexts = [
  'At the intersection of engineering and art, we cultivate progress—where technology is crafted with care.',
  'Creativity speaks with purpose, guided by clarity and responsibility.',
  'Every solution honors people, business, and the future.',
  'We provide clear creative direction and build efficient, scalable systems that help businesses grow safely and sustainably.',
];

export function ManifestoSection() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="about" className="bg-black">
      {manifestoTexts.map((text, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-[800px] mx-auto">
            <p className="text-white text-center text-3xl md:text-4xl lg:text-5xl leading-relaxed md:leading-relaxed lg:leading-[1.3]">
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
