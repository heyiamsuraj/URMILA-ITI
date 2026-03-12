import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Contact() {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${content?.contactEmail || 'urmilaiti@gmail.com'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Website Enquiry: ${formData.subject}`, // Custom subject line for the email
          _template: 'table' // Formats the email nicely
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-yellow-900 sm:text-4xl">
            {content?.contactTitle || 'Contact Us'}
          </h2>
          <div className="mt-2 w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            {content?.contactDescription || "Have questions? We'd love to hear from you."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-yellow-50 p-8 rounded-3xl shadow-sm border border-yellow-100">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6">Institute Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-red-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                      {content?.contactAddress || 'Urmila ITI, East Ram Krishna Nagar,\nP.O. New Jaganpura, New Bypass Patna, Bihar -800027'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-red-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">{content?.contactPhone || '+91 9334204813\n+91 9934276059'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-red-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">{content?.contactEmail || 'urmilaiti@gmail.com'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden shadow-inner relative">
              <iframe
                src="https://maps.google.com/maps?q=Urmila+ITI+NCVT,+East+Ram+Krishna+Nagar,+Patna,+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Urmila ITI Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-yellow-900 mb-6">Send us a Message</h3>

            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <div className="bg-green-100 p-1 rounded-full shrink-0">
                  <Send size={16} className="text-green-600" />
                </div>
                <p className="font-medium">Thank you! Your message has been sent successfully. We will get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl">
                <p className="font-medium">Oops! Something went wrong. Please try again later.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                    } focus:outline-none focus:ring-2 transition-shadow`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                    } focus:outline-none focus:ring-2 transition-shadow`}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                  } focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                  } focus:outline-none focus:ring-2 transition-shadow`}
                  placeholder="Admission Enquiry"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
                  } focus:outline-none focus:ring-2 transition-shadow resize-none`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
