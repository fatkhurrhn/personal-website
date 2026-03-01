import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Protected route
import ProtectedRoute from './components/common/ProtectedRoute';

// ─── Main Pages ──────────────────────────────────────
import Resume from './pages/Resume';
import HomePage from './pages/HomePage';
import ChatRoom from './pages/ChatRoom';

// ─── Frontdev Pages ─────────────────────────────────
import Project from './pages/Project';
import Certificate from './pages/Certificate';
import Guestbook from './pages/Guestbook';
import GithubRepo from './pages/GithubRepo';
import Blogs from './pages/Blog';
import DetailBlog from './pages/DetailBlog';
import Writings01 from './pages/DetailWritings/tailwind-ui-is-now-tailwind-plus';
import OtherFrontDev from './pages/OtherFrontDev';

// ─── Admin Pages ────────────────────────────────────
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProject from './pages/admin/ManageProject';
import AdminCertificate from './pages/admin/ManageCertificate';
import ManageBlogs from './pages/admin/ManageBlogs';
import DashboardAnime from './pages/admin/ManageAnime';
import DashboardReelsAnime from './pages/admin/ManageReelsAnime';
import ManageQuotes from './pages/admin/ManageQuotes';
import ManageAudio from './pages/admin/ManageAudio';

// Komponen untuk update title
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    // Mapping title untuk setiap route
    const titles = {
      '/': 'Home',
      '/resume': 'Resume',
      '/chat': 'Chat Room',
      '/projects': 'Projects',
      '/certificates': 'Certificates',
      '/guestbook': 'Guestbook',
      '/github': 'GitHub Repositories',
      '/others': 'Other Projects',
      '/blogs': 'Blogs',
      '/login': 'Login',
      '/dashboard': 'Dashboard',
      '/dashboard/frontdev/manage-projects': 'Manage Projects',
      '/dashboard/frontdev/manage-certificates': 'Manage Certificates',
      '/dashboard/frontdev/manage-blogs': 'Manage Blogs',
      '/dashboard/manage-animes': 'Manage Anime',
      '/dashboard/animes/manage-reels': 'Manage Reels',
      '/dashboard/creator/manage-quotes': 'Manage Quotes',
      '/dashboard/creator/manage-audio': 'Manage Audio',
    };

    const baseTitle = "Fullstack Developer Portfolio";

    // Cari title berdasarkan path
    let pageTitle = titles[location.pathname];

    // Handle dynamic routes (blogs/:slug, dll)
    if (!pageTitle) {
      if (location.pathname.includes('/blogs/')) {
        pageTitle = 'Blog Post';
      } else if (location.pathname.includes('/writings/')) {
        pageTitle = 'Writing';
      }
    }

    // Update title
    document.title = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;

  }, [location]); // Akan jalan setiap location berubah

  return null; // Komponen ini ga render apapun
};

function App() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>

        {/* ── Main Routes ───────────────── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chat" element={<ChatRoom />} />

        {/* ── Frontdev Routes ───────────── */}
        <Route path="/projects" element={<Project />} />
        <Route path="/certificates" element={<Certificate />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/github" element={<GithubRepo />} />
        <Route path="/others" element={<OtherFrontDev />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<DetailBlog />} />
        <Route path="/writings/tailwind-ui-is-now-tailwind-plus" element={<Writings01 />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin / Dashboard (Protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/frontdev/manage-projects" element={<ProtectedRoute><AdminProject /></ProtectedRoute>} />
        <Route path="/dashboard/frontdev/manage-certificates" element={<ProtectedRoute><AdminCertificate /></ProtectedRoute>} />
        <Route path="/dashboard/frontdev/manage-blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />
        <Route path="/dashboard/manage-animes" element={<ProtectedRoute><DashboardAnime /></ProtectedRoute>} />
        <Route path="/dashboard/animes/manage-reels" element={<ProtectedRoute><DashboardReelsAnime /></ProtectedRoute>} />
        <Route path="/dashboard/creator/manage-quotes" element={<ProtectedRoute><ManageQuotes /></ProtectedRoute>} />
        <Route path="/dashboard/creator/manage-audio" element={<ProtectedRoute><ManageAudio /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;