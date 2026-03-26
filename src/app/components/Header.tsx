import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const SCROLLED_THRESHOLD = 80;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    aboutSectionRef.current = document.getElementById('about-what-we-do') as HTMLElement | null;

    const handleScroll = () => {
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= SCROLLED_THRESHOLD);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About us', href: '#about' },
    { label: 'Work', href: '#work' },
    //{ label: 'Expertise', href: '#expertise' },
    //{ label: 'Product & Services', href: '#services' },
    { label: 'Contact us', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >      
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-[120px]">        
        <div className="flex items-center justify-center h-20">
          <img src="/images/logo/gati_logo_transparent.svg" alt="GATI" className="h-6 w-auto mr-8" />
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-300 hover:text-[#f05123] ${
                  isScrolled ? 'text-[#0f0f0f]' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-[#0f0f0f]' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-[#0f0f0f]' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col py-4 px-4 md:px-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-3 text-[#0f0f0f] hover:text-[#f05123] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
