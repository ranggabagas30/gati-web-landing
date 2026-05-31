import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ExpertiseCard = {
  title: string;
  subtitleLineOne: string;
  subtitleLineTwo: string;
  image: string;
  gradient: string;
  fullWidth?: boolean;
};

const expertiseCards: ExpertiseCard[] = [
  {
    title: 'Super-App Platforms',
    subtitleLineOne: 'Development, Scalable,',
    subtitleLineTwo: 'Multi-feature platforms',
    image: '/images/expertise/superapp_expertise.png',
    gradient: 'linear-gradient(90deg, #FFFFFF 0%, #FFEAC8 100%)',
  },
  {
    title: 'Mobile Game Development',
    subtitleLineOne: 'Development, Engaging,',
    subtitleLineTwo: 'Immersive user experiences',
    image: '/images/expertise/mobiledev_expertise.png',
    gradient: 'linear-gradient(90deg, #F1EDF8 54%, #B697D7 100%)',
  },
  {
    title: 'Landing Websites',
    subtitleLineOne: 'Designed for clarity,',
    subtitleLineTwo: 'Trust & Results',
    image: '/images/expertise/weblanding_expertise.png',
    gradient: 'linear-gradient(90deg, #EDF3F0 0%, #A3D8BA 100%)',
    fullWidth: true,
  },
];

export function ExpertiseSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    triggersRef.current = [];

    if (titleRef.current) {
      const titleTween = gsap.fromTo(
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

      if (titleTween.scrollTrigger) {
        triggersRef.current.push(titleTween.scrollTrigger);
      }
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const cardTween = gsap.fromTo(
        card,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );

      if (cardTween.scrollTrigger) {
        triggersRef.current.push(cardTween.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section id="expertise" className="py-16 md:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-[120px]">
        <div ref={titleRef} className="text-center mb-10 md:mb-12 lg:mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f05123]">Our Expertise</h2>
        </div>

        <div className="mx-auto w-full max-w-[1172px] grid grid-cols-1 gap-4 sm:gap-5 min-[601px]:grid-cols-[700fr_452fr] min-[601px]:gap-5">
          {expertiseCards.map((card, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`relative overflow-hidden rounded-2xl md:rounded-[28px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] [container-type:inline-size] ${card.fullWidth ? 'min-[601px]:col-span-2' : ''} ${
                index === 0
                  ? 'aspect-[700/555]'
                  : index === 1
                    ? 'aspect-[700/555] min-[601px]:aspect-[452/555]'
                    : 'aspect-[1172/491]'
              }`}
              style={{ background: card.gradient }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />

              <div className="absolute inset-0 p-5 md:p-7 lg:p-9 font-['Plus_Jakarta_Sans']">
                <div className="relative h-full w-full">
                  <div className={`${card.fullWidth ? 'max-w-[42%]' : 'max-w-[56%]'} space-y-2`}>
                    <h3
                      className={`text-[clamp(22px,7.5cqi,34px)] leading-[clamp(27px,9.2cqi,42px)] font-bold tracking-[-0.02em] text-black ${
                        index === 2 ? 'max-[540px]:text-[clamp(18px,6.2cqi,28px)] max-[540px]:leading-[clamp(22px,7.6cqi,34px)]' : ''
                      }`}
                    >
                      {card.title}
                    </h3>
                    <div className={index === 1 ? 'max-w-[92%]' : 'max-w-full'}>
                      <p className="mt-7 text-[clamp(11px,3.3cqi,15px)] leading-[clamp(16px,5.3cqi,24px)] font-medium text-black/50">
                        {card.subtitleLineOne}
                        <br />
                        {card.subtitleLineTwo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
