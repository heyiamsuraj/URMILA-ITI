import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppContent {
  heroImages: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  aboutText: string;
  aboutMission: string;
  aboutVision: string;
  
  coursesTitle: string;
  coursesDescription: string;
  coursesList: string[];
  
  facilitiesTitle: string;
  facilitiesDescription: string;
  facilitiesList: { title: string; description: string }[];
  
  admissionTitle: string;
  admissionDescription: string;
  admissionEligibility: string[];
  admissionDocuments: string[];
  
  galleryImages: { src: string; caption: string }[];
  
  noticesTitle: string;
  noticesDescription: string;
  noticesList: { title: string; date: string; link: string; isNew: boolean }[];

  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

interface ContentContextType {
  content: AppContent | null;
  updateContent: (newContent: Partial<AppContent>) => Promise<void>;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AppContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data as AppContent);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch content:', err);
        setIsLoading(false);
      });
  }, []);

  const login = async (password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  const updateContent = async (newContent: Partial<AppContent>) => {
    if (!token) throw new Error('Not authenticated');
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newContent),
      });
      
      if (response.ok) {
        setContent(prev => prev ? { ...prev, ...newContent } : null);
      } else {
        if (response.status === 401) logout();
        throw new Error('Failed to update content');
      }
    } catch (err) {
      console.error('Error updating content:', err);
      throw err;
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
