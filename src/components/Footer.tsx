import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="bg-yellow-950 text-white pt-16 pb-8 border-t-4 border-red-500 isolate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://i.postimg.cc/hPdj7kxS/Gemini-Generated-Image-o8lg4ko8lg4ko8lg-removebg-preview-Picsart-Ai-Image-Enhancer.png" 
                alt="Urmila ITI Logo" 
                className="h-12 w-auto bg-white rounded-full p-1" 
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-bold tracking-tight">Urmila ITI</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Empowering youth with quality vocational training in the Electrician trade since 2010. Building skills for a brighter future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-yellow-900 hover:bg-red-500 p-2 rounded-full transition-colors text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-yellow-900 hover:bg-red-500 p-2 rounded-full transition-colors text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-yellow-900 hover:bg-red-500 p-2 rounded-full transition-colors text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-yellow-900 hover:bg-red-500 p-2 rounded-full transition-colors text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-yellow-800 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Notice Board', href: '#notice' },
                { name: 'About Us', href: '#about' },
                { name: 'Courses', href: '#courses' },
                { name: 'Facilities', href: '#facilities' },
                { name: 'Admission', href: '#admission' },
                { name: 'Gallery', href: '#gallery' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="text-red-500 text-xs">â–¸</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-yellow-800 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-red-500 mt-1 shrink-0" />
                <span className="whitespace-pre-wrap">{content?.contactAddress || 'Urmila ITI, East Ram Krishna Nagar, P.O. New Jaganpura, New Bypass Patna, Bihar -800027'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-red-500 shrink-0" />
                <span className="whitespace-pre-wrap">{content?.contactPhone || '+91 9334204813, +91 9934276059'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-red-500 shrink-0" />
                <span>{content?.contactEmail || 'urmilaiti@gmail.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-900 pt-8 mt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Urmila ITI. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <span className="text-yellow-800">|</span>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
