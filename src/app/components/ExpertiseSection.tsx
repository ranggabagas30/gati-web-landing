import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tags = ['Super-app', 'Game', 'Health & Wellness'];

export function ExpertiseSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLButtonElement | null)[]>([]);

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

    tagsRef.current.forEach((tag, index) => {
      if (!tag) return;

      gsap.fromTo(
        tag,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tag,
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
    <section id="expertise" className="bg-white py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl">Available for New Opportunities</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, index) => (
            <button
              key={index}
              ref={(el) => (tagsRef.current[index] = el)}
              className="px-6 py-3 border-2 border-[#0f0f0f] rounded-full text-lg hover:bg-[#f05123] hover:text-white hover:border-[#f05123] transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
