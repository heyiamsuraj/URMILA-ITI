import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useContent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = content?.heroImages || [];

  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden isolate-dark">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        {backgroundImages.map((img, index) => (
          <img
            key={`${img}-${index}`}
            src={img}
            alt={`Electrician Training ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 animate-fade-in-up">
          {content?.heroTitle.split('Urmila ITI')[0]}
          {content?.heroTitle.includes('Urmila ITI') && <span className="text-red-500">Urmila ITI</span>}
          {content?.heroTitle.split('Urmila ITI')[1]}
          {!content?.heroTitle.includes('Urmila ITI') && content?.heroTitle}
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-200 font-medium mb-6 animate-fade-in-up animation-delay-100">
          {content?.heroSubtitle}
        </p>
        <p className="mt-2 text-lg text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          {content?.heroDescription}
        </p>
        <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-300">
          <a
            href="#admission"
            className="group flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            Apply Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <a
            href="#courses"
            className="flex items-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-yellow-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </section>
  );
}
