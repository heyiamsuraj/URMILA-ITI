import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot, setDoc, getDocFromServer } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase';
import defaultContentData from '../data/content.json';

export interface AppContent {
  navLogo: string;
  footerLogo: string;
  footerOtherLinks: { text: string; url: string }[];
  socialLinks: { platform: string; url: string }[];

  heroImages: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  aboutTitle: string;
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
  admissionBenefits: string[];
  admissionEligibility: string[];
  admissionDocuments: string[];
  
  galleryTitle: string;
  galleryDescription: string;
  galleryImages: { src: string; caption: string }[];
  
  noticesTitle: string;
  noticesDescription: string;
  noticesList: { title: string; date: string; link: string; isNew: boolean }[];

  contactTitle: string;
  contactDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  affiliationsTitle: string;
  affiliationsDescription: string;
  affiliationsLogos: { src: string; name: string }[];
}

interface ContentContextType {
  content: AppContent | null;
  updateContent: (newContent: Partial<AppContent>) => Promise<void>;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, error?: string}>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AppContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Content Listener
  useEffect(() => {
    // We can listen to content regardless of auth state since it's public read
    const contentRef = doc(db, 'settings', 'content');
    
    const unsubscribe = onSnapshot(contentRef, (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data() as AppContent);
      } else {
        // If no content exists in Firestore, use the default JSON data
        setContent(defaultContentData as AppContent);
        
        // If admin is logged in, initialize the database with default content
        if (user && (user.email === 'heyiamsuraj28@gmail.com' || user.email === 'urmilaiti@gmail.com')) {
          setDoc(contentRef, defaultContentData).catch(console.error);
        }
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching content:', error);
      // Fallback to local JSON if Firestore fails (e.g. offline)
      if (!content) {
        setContent(defaultContentData as AppContent);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const login = async (email: string, password: string) => {
    const allowedEmails = ['heyiamsuraj28@gmail.com', 'urmilaiti@gmail.com'];
    if (!allowedEmails.includes(email)) {
      return { success: false, error: 'Unauthorized email address.' };
    }
    if (password !== 'Urmila_admin_1357') {
      return { success: false, error: 'Invalid password.' };
    }

    try {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: any) {
        // If user doesn't exist or has a different provider, try to create them
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (createErr: any) {
            if (createErr.code === 'auth/email-already-in-use') {
              return { 
                success: false, 
                error: 'This email is already registered with Google Sign-In. Please go to your Firebase Console -> Authentication, delete the user account, and try logging in here again.' 
              };
            }
            throw createErr;
          }
        } else {
          throw err;
        }
      }
      
      // Notify backend to send SMS
      fetch('/api/notify-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      }).catch(console.error);

      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      return { success: false, error: err.message || 'Login failed.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateContent = async (newContent: Partial<AppContent>) => {
    if (!user) throw new Error('Not authenticated');
    try {
      const contentRef = doc(db, 'settings', 'content');
      await setDoc(contentRef, newContent, { merge: true });
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
      isAuthenticated: !!user,
      user
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
