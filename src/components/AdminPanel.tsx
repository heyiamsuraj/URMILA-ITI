import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Save, Plus, Trash2, LogOut, Lock } from 'lucide-react';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { content, updateContent, isAuthenticated, login, logout } = useContent();
  const [formData, setFormData] = useState(content || {});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!content) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const result = await login(email, password);
    if (!result.success) {
      setLoginError(result.error || 'Login failed.');
    }
    setIsLoggingIn(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-red-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 mt-2">Enter credentials to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              {loginError && <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
            >
              {isLoggingIn ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...(formData[field as keyof typeof formData] as string[])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string, defaultValue: any = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as any[] || []), defaultValue]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...(formData[field as keyof typeof formData] as any[])];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleObjectArrayChange = (field: string, index: number, key: string, value: string) => {
    const newArray = [...(formData[field as keyof typeof formData] as any[])];
    newArray[index] = { ...newArray[index], [key]: value };
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleObjectArrayToggle = (field: string, index: number, key: string) => {
    const newArray = [...(formData[field as keyof typeof formData] as any[])];
    newArray[index] = { ...newArray[index], [key]: !newArray[index][key] };
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateContent(formData);
      onClose();
    } catch (error) {
      alert('Failed to save content. Please check your connection or login again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General / Theme' },
    { id: 'hero', label: 'Hero' },
    { id: 'notice', label: 'Notice Board' },
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'admission', label: 'Admission' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'affiliations', label: 'Affiliations' },
    { id: 'contact', label: 'Contact & Footer' }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm z-10">
          <h3 className="text-lg font-semibold text-gray-800">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Close Dashboard
            </button>
            <button type="submit" form="admin-form" disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-70 shadow-sm">
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <form id="admin-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navigation Logo URL</label>
                  <input type="text" name="navLogo" value={formData.navLogo || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Footer Logo URL</label>
                  <input type="text" name="footerLogo" value={formData.footerLogo || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
              </div>
            )}

            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" name="heroTitle" value={formData.heroTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input type="text" name="heroSubtitle" value={formData.heroSubtitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="heroDescription" value={formData.heroDescription || ''} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slideshow Images (URLs)</label>
                  {(formData.heroImages as string[] || []).map((img, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={img} onChange={(e) => handleArrayChange('heroImages', index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="https://..." />
                      <button type="button" onClick={() => removeArrayItem('heroImages', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('heroImages')} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Image</button>
                </div>
              </div>
            )}

            {/* NOTICE TAB */}
            {activeTab === 'notice' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="noticesTitle" value={formData.noticesTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="noticesDescription" value={formData.noticesDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notices List</label>
                  {(formData.noticesList as any[] || []).map((item, index) => (
                    <div key={index} className="flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex-1 space-y-3">
                        <input type="text" value={item.title} onChange={(e) => handleObjectArrayChange('noticesList', index, 'title', e.target.value)} placeholder="Notice Title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                        <div className="flex gap-3">
                          <input type="date" value={item.date} onChange={(e) => handleObjectArrayChange('noticesList', index, 'date', e.target.value)} className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                          <input type="text" value={item.link} onChange={(e) => handleObjectArrayChange('noticesList', index, 'link', e.target.value)} placeholder="Document URL / Link" className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={item.isNew || false} onChange={() => handleObjectArrayToggle('noticesList', index, 'isNew')} className="rounded text-red-600 focus:ring-red-500" />
                          Show "New" badge
                        </label>
                      </div>
                      <button type="button" onClick={() => removeArrayItem('noticesList', index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md h-fit"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('noticesList', { title: '', date: new Date().toISOString().split('T')[0], link: '', isNew: true })} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Notice</button>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="aboutTitle" value={formData.aboutTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Text</label>
                  <textarea name="aboutText" value={formData.aboutText || ''} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                  <textarea name="aboutMission" value={formData.aboutMission || ''} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                  <textarea name="aboutVision" value={formData.aboutVision || ''} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
              </div>
            )}

            {/* COURSES TAB */}
            {activeTab === 'courses' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="coursesTitle" value={formData.coursesTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="coursesDescription" value={formData.coursesDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Future Opportunities</label>
                  {(formData.coursesList as string[] || []).map((topic, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={topic} onChange={(e) => handleArrayChange('coursesList', index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <button type="button" onClick={() => removeArrayItem('coursesList', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('coursesList')} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Topic</button>
                </div>
              </div>
            )}

            {/* FACILITIES TAB */}
            {activeTab === 'facilities' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="facilitiesTitle" value={formData.facilitiesTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="facilitiesDescription" value={formData.facilitiesDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facilities List</label>
                  {(formData.facilitiesList as any[] || []).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex-1 space-y-2">
                        <input type="text" value={item.title} onChange={(e) => handleObjectArrayChange('facilitiesList', index, 'title', e.target.value)} placeholder="Facility Title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                        <textarea value={item.description} onChange={(e) => handleObjectArrayChange('facilitiesList', index, 'description', e.target.value)} placeholder="Description" rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      </div>
                      <button type="button" onClick={() => removeArrayItem('facilitiesList', index)} className="p-2 text-red-500 hover:bg-red-100 rounded-md h-fit"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('facilitiesList', { title: '', description: '' })} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Facility</button>
                </div>
              </div>
            )}

            {/* ADMISSION TAB */}
            {activeTab === 'admission' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="admissionTitle" value={formData.admissionTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="admissionDescription" value={formData.admissionDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admission Benefits</label>
                  {(formData.admissionBenefits as string[] || []).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={item} onChange={(e) => handleArrayChange('admissionBenefits', index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <button type="button" onClick={() => removeArrayItem('admissionBenefits', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('admissionBenefits')} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Benefit</button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria</label>
                  {(formData.admissionEligibility as string[] || []).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={item} onChange={(e) => handleArrayChange('admissionEligibility', index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <button type="button" onClick={() => removeArrayItem('admissionEligibility', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('admissionEligibility')} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Criteria</button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
                  {(formData.admissionDocuments as string[] || []).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={item} onChange={(e) => handleArrayChange('admissionDocuments', index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <button type="button" onClick={() => removeArrayItem('admissionDocuments', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('admissionDocuments')} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Document</button>
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="galleryTitle" value={formData.galleryTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="galleryDescription" value={formData.galleryDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Gallery Images</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.galleryImages as any[] || []).map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button type="button" onClick={() => removeArrayItem('galleryImages', index)} className="absolute top-2 right-2 p-1 bg-white text-red-500 hover:bg-red-100 rounded-md shadow-sm"><Trash2 size={16} /></button>
                      <img src={item.src} alt="Preview" className="w-full h-32 object-cover rounded-md bg-gray-200" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Invalid+Image+URL'} />
                      <input type="text" value={item.src} onChange={(e) => handleObjectArrayChange('galleryImages', index, 'src', e.target.value)} placeholder="Image URL" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <input type="text" value={item.caption} onChange={(e) => handleObjectArrayChange('galleryImages', index, 'caption', e.target.value)} placeholder="Caption" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => addArrayItem('galleryImages', { src: '', caption: '' })} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-4"><Plus size={16} /> Add Gallery Image</button>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="contactTitle" value={formData.contactTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="contactDescription" value={formData.contactDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <textarea name="contactPhone" value={formData.contactPhone || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea name="contactAddress" value={formData.contactAddress || ''} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Footer Other Links</label>
                  {(formData.footerOtherLinks as any[] || []).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input type="text" value={item.text} onChange={(e) => handleObjectArrayChange('footerOtherLinks', index, 'text', e.target.value)} placeholder="Link Text" className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <input type="text" value={item.url} onChange={(e) => handleObjectArrayChange('footerOtherLinks', index, 'url', e.target.value)} placeholder="URL (e.g., https://...)" className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      <button type="button" onClick={() => removeArrayItem('footerOtherLinks', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('footerOtherLinks', { text: '', url: '' })} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-2"><Plus size={16} /> Add Link</button>
                </div>
              </div>
            )}

            {/* AFFILIATIONS TAB */}
            {activeTab === 'affiliations' && (
              <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input type="text" name="affiliationsTitle" value={formData.affiliationsTitle || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Description</label>
                  <textarea name="affiliationsDescription" value={formData.affiliationsDescription || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Affiliation Logos</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(formData.affiliationsLogos as any[] || []).map((item, index) => (
                      <div key={index} className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                        <button type="button" onClick={() => removeArrayItem('affiliationsLogos', index)} className="absolute top-2 right-2 p-1 bg-white text-red-500 hover:bg-red-100 rounded-md shadow-sm"><Trash2 size={16} /></button>
                        <img src={item.src} alt="Preview" className="w-full h-32 object-contain rounded-md bg-white border border-gray-200 p-2" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/150?text=Logo'} />
                        <input type="text" value={item.src} onChange={(e) => handleObjectArrayChange('affiliationsLogos', index, 'src', e.target.value)} placeholder="Logo URL" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                        <input type="text" value={item.name} onChange={(e) => handleObjectArrayChange('affiliationsLogos', index, 'name', e.target.value)} placeholder="Organization Name" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addArrayItem('affiliationsLogos', { src: '', name: '' })} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium mt-4"><Plus size={16} /> Add Logo</button>
                </div>
              </div>
            )}

          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
