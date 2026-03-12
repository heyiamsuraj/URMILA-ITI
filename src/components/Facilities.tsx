import { Briefcase, Cpu, Lightbulb, Users, Wrench } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Facilities() {
  const { content } = useContent();

  const defaultFacilities = [
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-900" />,
      title: 'Modern Electrical Lab',
      description: 'State-of-the-art laboratories equipped with the latest electrical panels and testing instruments.',
    },
    {
      icon: <Users className="w-12 h-12 text-yellow-900" />,
      title: 'Skilled Instructors',
      description: 'Learn from highly qualified and experienced faculty members dedicated to student success.',
    },
    {
      icon: <Cpu className="w-12 h-12 text-yellow-900" />,
      title: 'Workshop Training',
      description: 'Extensive hands-on workshop sessions to build practical competence and confidence.',
    },
    {
      icon: <Wrench className="w-12 h-12 text-yellow-900" />,
      title: 'Tools & Equipment',
      description: 'Access to a wide range of modern tools, machinery, and safety gear for comprehensive learning.',
    },
    {
      icon: <Briefcase className="w-12 h-12 text-yellow-900" />,
      title: 'Placement Assistance',
      description: 'Dedicated placement cell to assist students with internships and job opportunities post-training.',
    },
  ];

  const facilities = content?.facilitiesList && content.facilitiesList.length > 0
    ? content.facilitiesList.map((f, i) => ({
        ...f,
        icon: defaultFacilities[i % defaultFacilities.length].icon
      }))
    : defaultFacilities;

  return (
    <section id="facilities" className="py-20 bg-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.facilitiesTitle || 'Our Facilities'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto whitespace-pre-wrap">
            {content?.facilitiesDescription || 'We provide a conducive environment for learning with top-notch infrastructure and resources.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center"
            >
              <div className="bg-yellow-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors duration-300">
                <div className="group-hover:scale-110 transition-transform duration-300 group-hover:text-red-500">
                  {facility.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{facility.title}</h3>
              <p className="text-gray-600 leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
