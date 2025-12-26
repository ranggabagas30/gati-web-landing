import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'CuanX',
    users: '100,000+',
    labels: ['Super-app', 'PPOB', 'Realtime', 'Chat', 'Payment', 'Mobile App'],
    description: 'Complete financial ecosystem platform',
  },
  {
    title: 'Football Money',
    users: '10,000+',
    labels: ['Fantasy Sport', 'Game', 'Stocks', 'Mobile App'],
    description: 'Fantasy sports meets investment platform',
  },
  {
    title: 'Flutter IPTV For Hotel',
    users: '100+',
    labels: ['IPTV', 'Live Streaming', 'Mobile App'],
    description: 'Flutter IPTV is a mobile TV App which runs in STB (Set Top Box) to stream live tv channels from IPTV providers',
  },
];

export function PortfolioSection() {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="work" className="bg-[#f9f9f9] py-20 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div ref={containerRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-12 lg:mb-16">Selected Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-[#f05123]/10 to-[#f68d6f]/10 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block bg-[#f05123] text-white px-3 py-1 rounded-full text-sm">
                    {project.users} users
                  </span>
                </div>

                <h3 className="text-2xl mb-3">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.labels.map((label, labelIndex) => (
                    <span
                      key={labelIndex}
                      className="inline-block border border-[#e9ebef] text-[#6b6b6b] px-3 py-1 rounded-full text-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <p className="text-[#6b6b6b]">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
