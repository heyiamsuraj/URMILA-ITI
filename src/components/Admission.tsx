import { Calendar, CheckSquare, FileText } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Admission() {
  const { content } = useContent();

  const defaultEligibility = [
    'Passed 10th class examination under 10+2 system of education with Science and Mathematics or its equivalent.',
    'Minimum age limit is 14 years as on the first day of the academic session.',
    'Physically fit for the trade as per medical standards.'
  ];

  const defaultDocuments = [
    '10th Marksheet & Certificate',
    'Transfer Certificate (TC)',
    'Aadhar Card Copy',
    'Passport Size Photographs (5)',
    'Caste Certificate (if applicable)',
    'Income Certificate',
    'Medical Fitness Certificate',
    'Domicile Certificate',
  ];

  const eligibility = content?.admissionEligibility && content.admissionEligibility.length > 0
    ? content.admissionEligibility
    : defaultEligibility;

  const documents = content?.admissionDocuments && content.admissionDocuments.length > 0
    ? content.admissionDocuments
    : defaultDocuments;

  return (
    <section id="admission" className="py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.admissionTitle || 'Admission Process'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto whitespace-pre-wrap">
            {content?.admissionDescription || 'Start your journey towards a rewarding career in the electrical trade.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Eligibility & Documents */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-yellow-50 p-8 rounded-3xl shadow-sm border border-yellow-100">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
                <CheckSquare className="text-red-500" size={28} />
                Eligibility Criteria
              </h3>
              <ul className="space-y-4 text-gray-700 text-lg">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-white p-1 rounded-full shadow-sm">
                      <CheckSquare size={16} className="text-green-500" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-8 rounded-3xl shadow-sm border border-red-100">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-3">
                <FileText className="text-red-500" size={28} />
                Required Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                    <FileText size={18} className="text-yellow-900 shrink-0" />
                    <span className="font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Dates & CTA */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm uppercase tracking-wider">
                Admissions Open
              </div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-8 flex items-center gap-3">
                <Calendar className="text-red-500" size={28} />
                Important Dates
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {[
                  { event: 'Application Start', date: 'June 1, 2026' },
                  { event: 'Last Date to Apply', date: 'July 15, 2026' },
                  { event: 'Merit List Publication', date: 'July 20, 2026' },
                  { event: 'Session Commences', date: 'August 1, 2026' },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-yellow-100 group-[.is-active]:bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Calendar size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-bold text-gray-900">{item.event}</h4>
                      <p className="text-sm text-red-600 font-medium mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="mt-4 text-sm text-gray-500">
                For queries, contact our admission cell or fill the contact form below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
