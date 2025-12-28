import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'CuanX',
    users: '100,000+',
    labels: ['Super-app', 'PPOB', 'Realtime', 'Chat', 'Payment', 'Mobile App'],
    description: 'Complete financial ecosystem platform',
    repoUrl: 'https://github.com/example/cuanx',
    liveUrl: 'https://cuanx.example.com',
    images: [
      '/images/portfolio/porto-cuanx.png',
      '/images/portfolio/porto-cuanx.png',
      '/images/portfolio/porto-cuanx.png',
    ],
  },
  {
    title: 'Football Money',
    users: '10,000+',
    labels: ['Fantasy Sport', 'Game', 'Stocks', 'Mobile App'],
    description: 'Fantasy sports meets investment platform',
    repoUrl: 'https://github.com/example/football-money',
    liveUrl: 'https://footballmoney.example.com',
    images: [
      '/images/portfolio/porto-footballmoney.jpeg',
      '/images/portfolio/porto-footballmoney.jpeg',
      '/images/portfolio/porto-footballmoney.jpeg',
    ],
  },
  {
    title: 'Flutter IPTV For Hotel',
    users: '100+',
    labels: ['IPTV', 'Live Streaming', 'Mobile App'],
    description: 'Flutter IPTV is a mobile TV App which runs in STB (Set Top Box) to stream live tv channels from IPTV providers',
    repoUrl: 'https://github.com/example/flutter-iptv',
    liveUrl: 'https://flutteriptv.example.com',
    images: [
      '/images/portfolio/porto-cuanx.png',
      '/images/portfolio/porto-footballmoney.jpeg',
      '/images/portfolio/porto-cuanx.png',
    ],
  },
];

interface PortfolioCardProps {
  project: {
    title: string;
    users: string;
    labels: string[];
    description: string;
    repoUrl: string;
    liveUrl: string;
    images: string[];
  };
  index: number;
}

const PortfolioCard = React.forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ project, index }, ref) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      // Create infinite horizontal scroll animation
      const animation = gsap.to(carousel, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      return () => {
        animation.kill();
      };
    }, []);

    // Alternate background colors: white for even index, orange for odd index
    const backgroundColor = index % 2 === 0 ? 'bg-white' : 'bg-[#f05123]';
    const textColor = index % 2 === 0 ? 'text-[#0f0f0f]' : 'text-white';
    const descriptionColor = index % 2 === 0 ? 'text-[#6b6b6b]' : 'text-white/90';
    const buttonStyle = index % 2 === 0 
      ? 'bg-white border-2 border-[#e9ebef] text-[#0f0f0f] hover:bg-[#f9f9f9]'
      : 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20';

    return (
      <div
        ref={ref}
        className={`absolute ${backgroundColor} rounded-[20px] md:rounded-[32px] p-6 md:p-8 shadow-xl w-full h-full`}
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="h-full flex flex-col">
          {/* Title Section */}
          <div className="mb-4 md:mb-6">
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textColor} mb-2`}>
              {project.title}
            </h3>
          </div>

          {/* Description Section */}
          <div className="flex-1 mb-4 md:mb-6">
            <p className={`${descriptionColor} text-base md:text-lg leading-relaxed`}>
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4 md:mb-6">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
            >
              <Github size={18} />
              Repo
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
            >
              <ExternalLink size={18} />
              Live
            </a>
          </div>

          {/* Animated Image Carousel */}
          <div className="relative h-32 md:h-40 overflow-hidden rounded-lg">
            <div
              ref={carouselRef}
              className="flex gap-4 absolute left-0"
              style={{ width: '200%' }}
            >
              {/* Duplicate images for seamless loop */}
              {[...project.images, ...project.images].map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex-shrink-0 w-48 md:w-64 h-full rounded-lg overflow-hidden bg-[#f9f9f9]"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PortfolioCard.displayName = 'PortfolioCard';

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedContainer = pinnedContainerRef.current;
    const cardContainer = cardContainerRef.current;
    const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
    const title = titleRef.current;

    if (!section || !pinnedContainer || !cardContainer || cards.length === 0) return;

    // Get dimensions
    const viewportHeight = window.innerHeight;
    const cardContainerHeight = cardContainer.offsetHeight;    
    const peekHeight = cards[0].offsetHeight * 0.05; // 60% peek
    const hiddenHeight = cards[0].offsetHeight * 0.95; // 90% hidden

    console.log("viewPortHeight: " + viewportHeight + ", cardContainerHeight: " + cardContainerHeight);
    console.log("card height: " + cards[0].offsetHeight);
    console.log("peekHeight: " + peekHeight + ", hiddenHeight: " + hiddenHeight);

    // Calculate active position (centered in viewport)
    const activeY = (viewportHeight - cardContainerHeight) / 2;

    // Set initial positions (peek state) with no rotation
    console.log("set initial positions");
    cards.forEach((card, index) => {
      const initialY = peekHeight * index;
      const zIndex = cards.length - index;
      console.log("card " + index + " initialY: " + initialY + ", zIndex: " + zIndex);
      gsap.set(card, {
        y: initialY,
        zIndex: zIndex, // Higher cards have lower z-index initially
        rotateY: 0,
        rotateZ: 0,
      });
    });

    // Create timeline
    console.log("create timeline");
    const timeline = gsap.timeline({ paused: true });
    const progressPerCard = 1 / cards.length;
    console.log("progressPerCard: " + progressPerCard);

    cards.forEach((card, index) => {
      const startProgress = index * progressPerCard;
      
      // Split each card's progress into 3 phases:
      // 1. Rotation phase (30% of card's progress)
      // 2. Translation to active phase (35% of card's progress)
      // 3. Translation to archived phase (35% of card's progress)
      const rotationDuration = progressPerCard * 0.3;
      const toActiveDuration = progressPerCard * 0.35;
      const toArchivedDuration = progressPerCard * 0.35;
      
      const rotationEndProgress = startProgress + rotationDuration;
      const activeEndProgress = rotationEndProgress + toActiveDuration;

      // Define rotation angles (alternate for visual variety)
      const rotateYAngle = index % 2 === 0 ? -12 : 12;
      const rotateZAngle = index % 2 === 0 ? 6 : -6;

      // Phase 1: Rotate (Y and Z in parallel) - card stays at peek position
      timeline.to(
        card,
        {
          rotateY: rotateYAngle,
          rotateZ: rotateZAngle,
          duration: rotationDuration,
          ease: 'power2.out',
        },
        startProgress
      );

      // Phase 2: Move from peek → active (centered) while maintaining rotation
      timeline.to(
        card,
        {
          y: activeY,
          zIndex: 100, // Active card on top
          duration: toActiveDuration,
          ease: 'power2.inOut',
        },
        rotationEndProgress
      );

      // Phase 3: Move from active → archived (at top) while maintaining rotation
      const newPeekHeight = cards[index].offsetHeight * 0.01;
      const newHiddenHeight = cards[index].offsetHeight * 1.35;
      const archivedY = -newHiddenHeight + (newPeekHeight * index);
      console.log("card " + index + " startProgress: " + startProgress + ", rotationEndProgress: " + rotationEndProgress + ", activeEndProgress: " + activeEndProgress + ", archivedY: " + archivedY);
      timeline.to(
        card,
        {
          y: archivedY,
          zIndex: 50 + index, // Archived cards stack in order
          duration: toArchivedDuration,
          ease: 'power2.inOut',
        },
        activeEndProgress
      );
    });

    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=5000vh', // 10x longer duration for sufficient viewing time
      pin: pinnedContainer,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        timeline.progress(self.progress);
      },
    });

    // Title fade animation
    if (title) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=5000vh', // Match main ScrollTrigger duration
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.1) {
            gsap.to(title, {
              opacity: Math.max(0, 1 - (progress - 0.1) * 2),
              duration: 0.2,
              ease: 'power1.out',
            });
          } else {
            gsap.to(title, {
              opacity: 1,
              duration: 0.2,
              ease: 'power1.out',
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      timeline.kill();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-[670vh] bg-[#f9f9f9]"
    >
      <div
        ref={pinnedContainerRef}
        className="relative min-h-screen flex flex-col items-center justify-center py-20"
      >
        <div
          ref={titleRef}
          className="absolute top-12 md:top-16 lg:top-20 left-0 right-0 text-center px-4 md:px-6 lg:px-[120px] z-40"
        >
        <h2 className="text-3xl md:text-4xl lg:text-5xl">Selected Works</h2>
      </div>

        <div
          ref={cardContainerRef}
          className="relative w-[95vw] md:w-[90vw] h-[60vh] max-w-[900px]"
          style={{ 
            marginTop: 'clamp(8rem, 15vh, 12rem)',
            perspective: '1200px',
          }}
        >
        {projects.map((project, index) => (
            <PortfolioCard
            key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              project={project}
              index={index}
            />
                  ))}
                </div>
      </div>
    </section>
  );
}
