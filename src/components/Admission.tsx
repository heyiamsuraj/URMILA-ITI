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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Eligibility */}
          <div className="bg-yellow-50 p-8 rounded-3xl shadow-sm border border-yellow-100 h-fit">
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

          {/* Documents */}
          <div className="bg-red-50 p-8 rounded-3xl shadow-sm border border-red-100 h-fit">
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
      </div>
    </section>
  );
}
