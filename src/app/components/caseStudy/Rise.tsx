import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'cubic-bezier(0.76,0,0.24,1)';

type RiseTag = 'div' | 'section' | 'h2' | 'p';

export function Rise({
  as = 'div',
  className,
  children,
}: {
  as?: RiseTag;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: EASE,
        scrollTrigger: {
          trigger: ref.current,
          scroller: '#case-study-scroll',
          start: 'top 88%',
          once: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const Tag = as as 'div';

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} style={{ opacity: 0, transform: 'translateY(28px)' }}>
      {children}
    </Tag>
  );
}
