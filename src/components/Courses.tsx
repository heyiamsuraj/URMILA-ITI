import { CheckCircle, Clock, GraduationCap, Wrench } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Courses() {
  const { content } = useContent();
  
  const defaultTopics = [
    'Electrical Wiring',
    'Motor Control',
    'Safety Procedures',
    'Equipment Maintenance',
    'Industrial Automation Basics',
    'Troubleshooting',
  ];

  const topics = content?.coursesList && content.coursesList.length > 0 
    ? content.coursesList 
    : defaultTopics;

  return (
    <section id="courses" className="py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.coursesTitle || 'Our Courses'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-transform hover:scale-[1.02] duration-300">
            {/* Image Section */}
            <div className="md:w-2/5 relative">
              <img
                src="https://i.postimg.cc/FKfHbwkd/Chat-GPT-Image-Mar-11-2026-09-11-21-PM.png"
                alt="Electrician Trade"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white">Electrician Trade</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-900 px-4 py-2 rounded-full font-medium">
                    <Clock size={18} className="text-red-500" />
                    <span>Duration: 2 Years</span>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-900 px-4 py-2 rounded-full font-medium">
                    <GraduationCap size={18} className="text-red-500" />
                    <span>Eligibility: 10th Pass</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-wrap">
                  {content?.coursesDescription || 'Our comprehensive Electrician Trade program equips students with the practical and theoretical knowledge required to excel in the electrical industry. Learn from experts in modern, well-equipped labs.'}
                </p>

                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Wrench size={20} className="text-red-500" />
                  Future Opportunities:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#admission"
                className="inline-block text-center bg-yellow-900 hover:bg-yellow-800 text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Apply Now for Admission
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
