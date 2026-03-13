import { Image as ImageIcon } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Gallery() {
  const { content } = useContent();

  const defaultImages = [
    {
      src: 'https://picsum.photos/seed/electrical-workshop/600/400',
      caption: 'Electrical Workshop Training',
    },
    {
      src: 'https://picsum.photos/seed/students-panels/600/400',
      caption: 'Students Working on Panels',
    },
    {
      src: 'https://picsum.photos/seed/classroom/600/400',
      caption: 'Interactive Classroom Sessions',
    },
    {
      src: 'https://picsum.photos/seed/practical-lab/600/400',
      caption: 'Hands-on Practical Lab Work',
    },
    {
      src: 'https://picsum.photos/seed/motor-winding/600/400',
      caption: 'Motor Winding Practice',
    },
    {
      src: 'https://picsum.photos/seed/safety-drill/600/400',
      caption: 'Electrical Safety Drills',
    },
  ];

  const images = content?.galleryImages && content.galleryImages.length > 0
    ? content.galleryImages
    : defaultImages;

  return (
    <section id="gallery" className="py-20 bg-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.galleryTitle || 'Our Gallery'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            {content?.galleryDescription || 'Glimpses of life and learning at Urmila ITI.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src || undefined}
                alt={image.caption}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-yellow-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ImageIcon className="text-red-500 mb-2" size={24} />
                  <h3 className="text-white font-semibold text-lg">{image.caption}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
