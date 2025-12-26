import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about-what-we-do');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsScrolled(rect.top <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About us', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Product & Services', href: '#services' },
    { label: 'Contact us', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/logo/gati_logo_transparent.svg"
              alt="GATI"
              className="h-8 w-auto"
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </div>

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
          <nav className="flex flex-col py-4 px-6">
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
