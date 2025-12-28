import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoTexts = [
  'At GATI\'s intersection of Engineering & Art, we cultivate progress\n—where technology is crafted with care.',
  'Creativity speaks with purpose, guided by clarity and responsibility.',
  'Every solution honors people, business, and the future.',
  'We provide clear creative direction and build efficient, scalable systems that help businesses grow safely and sustainably.',
];

export function ManifestoSection() {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!outerContainerRef.current || !innerContainerRef.current) return;

    const texts = textRefs.current.filter(Boolean) as HTMLParagraphElement[];
    if (texts.length !== 4) return;

    // Calculate fade progress based on viewport height (40px fade zone)
    const viewportHeight = window.innerHeight;
    const fadeDistance = 40; // pixels
    const fadeRatio = fadeDistance / viewportHeight;
    const fadeProgress = fadeRatio / 4; // divide by 4 for 400vh total

    // Create timeline for opacity animations
    const timeline = gsap.timeline({ paused: true });

    // Manifesto 1: starts at opacity 1, fades out at boundary
    timeline.to(
      texts[0],
      {
        opacity: 0,
        duration: fadeProgress,
        ease: 'none',
      },
      0.25 - fadeProgress
    );

    // Manifesto 2: fades in, stays visible, fades out
    timeline.fromTo(
      texts[1],
      { opacity: 0 },
      { opacity: 1, duration: fadeProgress, ease: 'none' },
      0.25
    );
    timeline.to(
      texts[1],
      {
        opacity: 0,
        duration: fadeProgress,
        ease: 'none',
      },
      0.5 - fadeProgress
    );

    // Manifesto 3: fades in, stays visible, fades out
    timeline.fromTo(
      texts[2],
      { opacity: 0 },
      { opacity: 1, duration: fadeProgress, ease: 'none' },
      0.5
    );
    timeline.to(
      texts[2],
      {
        opacity: 0,
        duration: fadeProgress,
        ease: 'none',
      },
      0.75 - fadeProgress
    );

    // Manifesto 4: fades in, stays visible until end
    timeline.fromTo(
      texts[3],
      { opacity: 0 },
      { opacity: 1, duration: fadeProgress, ease: 'none' },
      0.75
    );

    // Create ScrollTrigger with pinning
    ScrollTrigger.create({
      trigger: outerContainerRef.current,
      start: 'top top',
      end: '+=400%',
      pin: innerContainerRef.current,
      scrub: true,
      onUpdate: (self) => {
        timeline.progress(self.progress);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      timeline.kill();
    };
  }, []);

  return (
    <div id="about" className="relative h-[500vh] bg-black" ref={outerContainerRef}>
      <div
        ref={innerContainerRef}
        className="flex items-center justify-center min-h-screen px-6"
      >
        <div className="max-w-[800px] mx-auto grid">
          {manifestoTexts.map((text, index) => {
            if (index === 0) {
              // Special styling for first manifesto text
              return (
                <p
                  key={index}
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="col-start-1 row-start-1 text-[#C5C9C3] text-center leading-relaxed"
                  style={{ 
                    opacity: index === 0 ? 1 : 0,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '76px',
                    fontWeight: 400,
                    lineHeight: '92px',
                  }}
                >
                  At{' '}
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>GATI</span>
                  's intersection of{' '}
                  <span style={{ color: '#f05123', fontWeight: 700 }}>Engineering</span>
                  {' & '}
                  <span style={{ color: '#f05123', fontWeight: 700 }}>Art</span>
                  , we cultivate progress
                  <br />
                  <span style={{ fontSize: '24px', fontWeight: 400 }}>
                    —where technology is crafted with care.
                  </span>
                </p>
              );
            }
            
            return (
              <p
                key={index}
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className="col-start-1 row-start-1 text-white text-center text-3xl md:text-4xl lg:text-5xl leading-relaxed md:leading-relaxed lg:leading-[1.3]"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
