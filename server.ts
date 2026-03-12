import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('website.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

// Default content
const defaultContent = {
  heroImages: JSON.stringify([
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
  ]),
  heroTitle: "Welcome to Urmila ITI",
  heroSubtitle: "Quality Training for Future Electricians",
  heroDescription: "Empowering students with practical skills and industry-relevant knowledge since 2010. Join us to build a bright career in the electrical trade.",
  
  aboutText: "Welcome to Urmila Industrial Training Institute (ITI). We are dedicated to providing high-quality vocational training in the Electrician trade. Our goal is to bridge the gap between industry requirements and the skills possessed by the youth.",
  aboutMission: "To impart quality technical education and practical skills, enabling students to become self-reliant and successful professionals in the electrical industry.",
  aboutVision: "To be a premier institute of excellence in vocational training, recognized for producing highly skilled and ethical technicians.",
  
  coursesTitle: "Our Courses",
  coursesDescription: "Our comprehensive Electrician Trade program equips students with the practical and theoretical knowledge required to excel in the electrical industry. Learn from experts in modern, well-equipped labs.",
  coursesList: JSON.stringify([
    'Electrical Wiring',
    'Motor Control',
    'Safety Procedures',
    'Equipment Maintenance',
    'Industrial Automation Basics',
    'Troubleshooting'
  ]),
  
  facilitiesTitle: "Our Facilities",
  facilitiesDescription: "We provide a conducive environment for learning with top-notch infrastructure and resources.",
  facilitiesList: JSON.stringify([
    { title: 'Modern Electrical Lab', description: 'State-of-the-art laboratories equipped with the latest electrical panels and testing instruments.' },
    { title: 'Skilled Instructors', description: 'Learn from highly qualified and experienced faculty members dedicated to student success.' },
    { title: 'Workshop Training', description: 'Extensive hands-on workshop sessions to build practical competence and confidence.' },
    { title: 'Tools & Equipment', description: 'Access to a wide range of modern tools, machinery, and safety gear for comprehensive learning.' },
    { title: 'Placement Assistance', description: 'Dedicated placement cell to assist students with internships and job opportunities post-training.' }
  ]),
  
  admissionTitle: "Admission Process",
  admissionDescription: "Start your journey towards a rewarding career in the electrical trade.",
  admissionEligibility: JSON.stringify([
    "Passed 10th class examination under 10+2 system of education with Science and Mathematics or its equivalent.",
    "Minimum age limit is 14 years as on the first day of the academic session.",
    "Physically fit for the trade as per medical standards."
  ]),
  admissionDocuments: JSON.stringify([
    '10th Marksheet & Certificate',
    'Transfer Certificate (TC)',
    'Aadhar Card Copy',
    'Passport Size Photographs (5)',
    'Caste Certificate (if applicable)',
    'Income Certificate',
    'Medical Fitness Certificate',
    'Domicile Certificate'
  ]),
  
  galleryImages: JSON.stringify([
    { src: 'https://picsum.photos/seed/electrical-workshop/600/400', caption: 'Electrical Workshop Training' },
    { src: 'https://picsum.photos/seed/students-panels/600/400', caption: 'Students Working on Panels' },
    { src: 'https://picsum.photos/seed/classroom/600/400', caption: 'Interactive Classroom Sessions' },
    { src: 'https://picsum.photos/seed/practical-lab/600/400', caption: 'Hands-on Practical Lab Work' },
    { src: 'https://picsum.photos/seed/motor-winding/600/400', caption: 'Motor Winding Practice' },
    { src: 'https://picsum.photos/seed/safety-drill/600/400', caption: 'Electrical Safety Drills' }
  ]),
  
  noticesTitle: "Notice Board",
  noticesDescription: "Stay updated with the latest announcements, exam schedules, and important circulars.",
  noticesList: JSON.stringify([
    { title: "Admission Open for Session 2026-28", date: "2026-03-01", link: "#", isNew: true },
    { title: "Semester 2 Examination Schedule", date: "2026-02-15", link: "#", isNew: false },
    { title: "Holiday Notice: Holi Festival", date: "2026-02-28", link: "#", isNew: true }
  ]),

  contactEmail: "urmilaiti@gmail.com",
  contactPhone: "+91 9334204813\n+91 9934276059",
  contactAddress: "Urmila ITI, East Ram Krishna Nagar,\nP.O. New Jaganpura, New Bypass Patna, Bihar -800027"
};

// Insert default content if not exists
const insertStmt = db.prepare('INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)');
for (const [key, value] of Object.entries(defaultContent)) {
  insertStmt.run(key, value);
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Urmila_admin_135';
const ADMIN_TOKEN = 'admin-session-token-12345'; // Simple static token for prototype

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: ADMIN_TOKEN });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  });

  app.get('/api/content', (req, res) => {
    const rows = db.prepare('SELECT * FROM content').all() as { key: string, value: string }[];
    const content: Record<string, any> = {};
    for (const row of rows) {
      try {
        content[row.key] = JSON.parse(row.value);
      } catch {
        content[row.key] = row.value;
      }
    }
    res.json(content);
  });

  app.put('/api/content', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updates = req.body;
    const updateStmt = db.prepare('UPDATE content SET value = ? WHERE key = ?');
    
    db.transaction(() => {
      for (const [key, value] of Object.entries(updates)) {
        const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        updateStmt.run(valStr, key);
      }
    })();
    
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
