import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Rangga Bagas',
    role: 'Business & Engineering',
    image: '/images/profile/profile_rangga.jpeg',
  },
  {
    name: 'Tiffany Payuni',
    role: 'Marketing, Branding, Creative',
    image: '/images/profile/profile_tiffany.jpeg',
  },
];

export function TeamSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.96,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
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
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-full w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-4 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl md:text-2xl mb-1 transition-colors duration-300 group-hover:text-[#f05123]">
                {member.name}
              </h3>
              <p className="text-[#6b6b6b]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
