import { Award, BookOpen, Briefcase, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content } = useContent();
  
  const features = [
    {
      icon: <Users className="w-10 h-10 text-red-500" />,
      title: 'Experienced Trainers',
      description: 'Learn from industry experts with years of practical experience.',
    },
    {
      icon: <BookOpen className="w-10 h-10 text-red-500" />,
      title: 'Practical Training',
      description: 'Hands-on experience in labs with real-world equipment.',
    },
    {
      icon: <Award className="w-10 h-10 text-red-500" />,
      title: 'Industry Relevant Skills',
      description: 'Curriculum designed to meet current industry standards and demands.',
    },
    {
      icon: <Briefcase className="w-10 h-10 text-red-500" />,
      title: 'Placement Support',
      description: 'Dedicated assistance to help you secure jobs in top companies.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            About <span className="text-red-500">Urmila ITI</span>
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Empowering Youth Through Skill-Based Training Since 2010
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
              {content?.aboutText || 'Welcome to Urmila Industrial Training Institute (ITI). We are dedicated to providing high-quality vocational training in the Electrician trade. Our goal is to bridge the gap between industry requirements and the skills possessed by the youth.'}
            </p>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-900">
              <h4 className="text-xl font-semibold text-yellow-900 mb-2">Our Mission</h4>
              <p className="text-gray-600 whitespace-pre-wrap">
                {content?.aboutMission || 'To impart quality technical education and practical skills, enabling students to become self-reliant and successful professionals in the electrical industry.'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <h4 className="text-xl font-semibold text-red-500 mb-2">Our Vision</h4>
              <p className="text-gray-600 whitespace-pre-wrap">
                {content?.aboutVision || 'To be a premier institute of excellence in vocational training, recognized for producing highly skilled and ethical technicians.'}
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.postimg.cc/g24QNJbp/Gemini-Generated-Image-astobjastobjasto.png"
              alt="Students in Workshop"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-900 text-white p-6 rounded-xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold text-red-500 mb-1">15+</p>
              <p className="text-sm font-medium uppercase tracking-wider">Years of Excellence</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
