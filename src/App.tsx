/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Notice from './components/Notice';
import About from './components/About';
import Courses from './components/Courses';
import Facilities from './components/Facilities';
import Admission from './components/Admission';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import { Settings } from 'lucide-react';

function AppContent() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-gray-900 font-sans scroll-smooth relative transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <Notice />
        <About />
        <Courses />
        <Facilities />
        <Admission />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      
      {/* Admin Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all hover:scale-110 z-40 flex items-center justify-center group"
        title="Admin Dashboard"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Admin Panel Modal */}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </ThemeProvider>
  );
}
