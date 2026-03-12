import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Notice', href: '#notice' },
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Admission', href: '#admission' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-yellow-400 shadow-md py-2' : 'bg-yellow-500 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-2">
              <img 
                src="https://i.postimg.cc/hPdj7kxS/Gemini-Generated-Image-o8lg4ko8lg4ko8lg-removebg-preview-Picsart-Ai-Image-Enhancer.png" 
                alt="Urmila ITI Logo" 
                className="h-12 w-auto bg-white rounded-full p-1" 
                referrerPolicy="no-referrer"
              />
              <span className={`text-2xl font-bold ${isScrolled ? 'text-red-900' : 'text-red-900'}`}>
                Urmila ITI
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-red-600 ${
                  isScrolled ? 'text-red-900' : 'text-red-900'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-3 border-l border-red-900/20 pl-6">
              <button
                onClick={() => changeLanguage('hi')}
                className="flex items-center gap-1 text-red-900 hover:text-red-600 font-medium transition-colors"
                title="Translate to Hindi"
              >
                <Languages size={20} />
                <span className="text-sm">HI</span>
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="flex items-center gap-1 text-red-900 hover:text-red-600 font-medium transition-colors"
                title="Translate to English"
              >
                <span className="text-sm">EN</span>
              </button>

              <a
                href="#contact"
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium transition-colors ml-2"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-red-900"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-yellow-50 dark:bg-gray-800 shadow-lg absolute w-full left-0 top-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-red-600 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded-md"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center justify-around py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <button
                onClick={() => { changeLanguage('hi'); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium"
              >
                <Languages size={20} /> Hindi
              </button>
              <button
                onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium"
              >
                <Languages size={20} /> English
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
