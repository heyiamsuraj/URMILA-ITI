import { Bell, Calendar, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Notice() {
  const { content } = useContent();

  const defaultNotices = [
    { title: "Admission Open for Session 2026-28", date: "2026-03-01", link: "#", isNew: true },
    { title: "Semester 2 Examination Schedule", date: "2026-02-15", link: "#", isNew: false },
    { title: "Holiday Notice: Holi Festival", date: "2026-02-28", link: "#", isNew: true }
  ];

  const notices = content?.noticesList && content.noticesList.length > 0
    ? content.noticesList
    : defaultNotices;

  return (
    <section id="notice" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl flex items-center justify-center gap-3">
            <Bell className="text-red-500 w-8 h-8" />
            {content?.noticesTitle || 'Notice Board'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-500">
            {content?.noticesDescription || 'Stay updated with the latest announcements and circulars.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {notices.map((notice, index) => (
              <li key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {notice.isNew && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide animate-pulse">
                          New
                        </span>
                      )}
                      <span className="flex items-center text-sm text-gray-500 gap-1">
                        <Calendar className="w-4 h-4" />
                        {notice.date}
                      </span>
                    </div>
                    <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors flex items-center gap-2">
                      {notice.title}
                      {notice.link && notice.link !== '#' && <ExternalLink className="w-4 h-4 text-gray-400" />}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
