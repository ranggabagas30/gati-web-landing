import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'CuanX',
    users: '100,000+',
    labels: ['Super-app', 'PPOB', 'Realtime', 'Chat', 'Payment', 'Mobile App'],
    description: 'MVP for CuanX, a ',
    boldDescription: 'Super-App', 
    descriptionAfterBold: ' designed for everyday convenience. Integrates transportation services and digital purchases into a single, user-friendly platform—focused on clarity, usability, and scalability.',
    repoUrl: 'https://github.com/example/cuanx',
    liveUrl: 'https://cuanx.co.id/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=co.id.cuanx.customer',
    appStoreUrl: 'https://apps.apple.com/us/app/cuanx/id6754905079',
    images: [
      '/images/portfolio/cuanx1.webp',
      '/images/portfolio/cuanx2.webp',
      '/images/portfolio/cuanx4.webp',
    ],
  },
  {
    title: 'Football Money',
    users: '10,000+',
    labels: ['Fantasy Sport', 'Game', 'Stocks', 'Mobile App'],
    description: '',
    boldDescription: 'iOS and Android app ',
    descriptionAfterBold: 'for Football Money, a strategy-driven fantasy sports platform. Evolved from web into a native mobile experience, simplifying complex systems to improve engagement and retention.',
    repoUrl: 'https://github.com/example/football-money',
    liveUrl: 'https://www.instagram.com/footballmoney_/',
    playStoreUrl: '',
    appStoreUrl: 'https://apps.apple.com/id/app/football-money/id6605934587',
    images: [
      '/images/portfolio/footballmoney1.webp',
      '/images/portfolio/footballmoney2.webp',
      '/images/portfolio/footballmoney3.webp',
    ],
  },
  {
    title: 'Flutter IPTV For Hotel',
    users: '100+',
    labels: ['IPTV', 'Live Streaming', 'Mobile App'],
    description: '',
    boldDescription: 'Flutter-based IPTV app ',
    descriptionAfterBold: 'for hotel environments, built for STB devices. Streams live TV from IPTV providers with a focus on stability, performance, and seamless guest experience.',
    repoUrl: 'https://github.com/example/flutter-iptv',
    liveUrl: 'https://crt.id/expertise',
    playStoreUrl: '',
    appStoreUrl: '',
    images: [
      '/images/portfolio/iptv1.webp',
      '/images/portfolio/iptv2.webp',
      '/images/portfolio/iptv3.webp',
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
    playStoreUrl: string;
    appStoreUrl: string;
    images: string[];
    boldDescription: string;
    descriptionAfterBold: string;
  };
  index: number;
}


// FolderTab component for the file divider tip
function FolderTab({ color, index }: { color: string; index: number }) {
  // color: background color (e.g. #fff or #f05123)
  // index: for left offset
  return (
    <div
      className="absolute"
      style={{
        top: 0,
        right: 0,
        width: 140,
        height: 36,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 8,
        background: color,
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
        transform: `translateX(-${index * 20}px)`
      }}
    />
  );
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
    const backgroundHex = index % 2 === 0 ? '#fff' : '#f05123';
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
        {/* Folder tab divider tip */}
        {/* <FolderTab color={backgroundHex} index={index} /> */}
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
              <span className={`font-bold ${textColor}`}>{project.boldDescription}</span>
              {project.descriptionAfterBold}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-4 md:mb-6">            
            {/* <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
            >
              <Github size={18} />
              Repo
            </a>            */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
            >
              <ExternalLink size={18} />
              Live
            </a>
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
              >
                <FaGooglePlay size={18} />
                Play Store
              </a>
            )}
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${buttonStyle} px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors`}
              >
                <FaAppStoreIos size={18} />
                App Store
              </a>
            )}
          </div>

          {/* Animated Image Carousel */}
          <div className="relative aspect-[1242/2208] overflow-hidden rounded-lg">
            <div
              ref={carouselRef}
              className="flex gap-4 absolute left-0 w-[50%]"
            >
              {/* Duplicate images for seamless loop */}
              {[...project.images, ...project.images].map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex-shrink-0 w-48 md:w-64 rounded-lg bg-[#f9f9f9]"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                    className="max-w-full h-auto object-contain"
                    loading="lazy"
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

    // Calculate active position (centered in viewport)
    const activeY = (viewportHeight - cardContainerHeight) / 2;

    // Set initial positions (peek state) with no rotation
    cards.forEach((card, index) => {
      const initialY = peekHeight * index;
      const zIndex = cards.length - index;
      gsap.set(card, {
        y: initialY,
        zIndex: zIndex, // Higher cards have lower z-index initially
        rotateY: 0,
        rotateZ: 0,
      });
    });

    // Create timeline
    const timeline = gsap.timeline({ paused: true });
    const progressPerCard = 1 / cards.length;

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
      className="relative h-[630vh] md:h-[600vh] bg-[#f9f9f9]"
    >
      <div
        ref={pinnedContainerRef}
        className="relative min-h-screen flex flex-col items-center justify-center"
      >
        <div
          ref={titleRef}
          className="absolute top-30 md:top-16 lg:top-40 left-0 right-0 text-center px-4 md:px-6 lg:px-[120px]"
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
