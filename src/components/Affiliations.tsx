import { useContent } from '../context/ContentContext';

export default function Affiliations() {
  const { content } = useContent();
  const logos = content?.affiliationsLogos && content.affiliationsLogos.length > 0
    ? content.affiliationsLogos
    : [
        { src: 'https://i.postimg.cc/hPdj7kxS/Gemini-Generated-Image-o8lg4ko8lg4ko8lg-removebg-preview-Picsart-Ai-Image-Enhancer.png', name: 'NCVT' },
        { src: 'https://i.postimg.cc/hPdj7kxS/Gemini-Generated-Image-o8lg4ko8lg4ko8lg-removebg-preview-Picsart-Ai-Image-Enhancer.png', name: 'DGT' },
        { src: 'https://i.postimg.cc/hPdj7kxS/Gemini-Generated-Image-o8lg4ko8lg4ko8lg-removebg-preview-Picsart-Ai-Image-Enhancer.png', name: 'Skill India' }
      ];

  return (
    <section id="affiliations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.affiliationsTitle || 'Our Affiliations & Partners'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            {content?.affiliationsDescription || 'We are proud to be affiliated with and recognized by leading organizations in the vocational training sector.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {logos.map((logo, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/150?text=Logo'}
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-gray-800">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
