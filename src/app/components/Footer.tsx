import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScheduleConversation = () => {
    const phoneNumber = '628978991119';
    const message = encodeURIComponent("Hi, GATI. I want to book a free-30 minute product consultation");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer id="contact" className="bg-[#f05123] text-white py-20 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-[120px]">
        <div ref={ctaRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">Let's make progress, responsibly.</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Tell us where you are today — we'll help you plan the next step.
          </p>
          <button 
            onClick={handleScheduleConversation}
            className="bg-white text-[#f05123] px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Schedule a conversation
          </button>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h3 className="text-2xl mb-4">Book a free 30-minute product consultation</h3>
            <p className="text-lg opacity-90 mb-2">
              No sales pitch. No obligation. Just an honest discussion about your product, goals, and constraints.
            </p>
            <p className="text-sm opacity-75">
              We regularly work with early-stage startups and teams with limited budgets.
            </p>
          </div>

          <div className="text-center text-sm opacity-75">
            <p>© GATI — All rights reserved</p>
            <p className="mt-2">Flexible pricing for startups and tight budgets</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
