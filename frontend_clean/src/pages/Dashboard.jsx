// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

// Modular Components
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import Chatbot from "../components/dashboard/Chatbot";
import SyllabusSection from "../components/dashboard/SyllabusSection";
import RoadmapSection from "../components/dashboard/RoadmapSection";
import MCQSection from "../components/dashboard/MCQSection";
import Scorecard from "../components/dashboard/Scorecard";
import GenericSection from "../components/dashboard/GenericSection";
import ProgrammingLanguagesSection from "../components/dashboard/ProgrammingLanguagesSection";
import NotesUploadSection from "../components/dashboard/NotesUploadSection";
import StreakCard from "../components/dashboard/StreakCard";
import CertificateSection from "../components/dashboard/CertificateSection";
import { useStreak } from "../context/StreakContext";

// Data & Constants
import { API_BASE_URL } from "../data/dashboardData";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE ---
  const [activeSection, setActiveSection] = useState("welcome");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [nepData, setNepData] = useState([]);
  const [openSems, setOpenSems] = useState({}); // Shared for menu states

  // --- AUTH GUARD ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // --- DATA FETCHING ---
  const { updateStreakActivity } = useStreak();

  useEffect(() => {
    fetch(`${API_BASE_URL}/nep`)
      .then((res) => res.json())
      .then((data) => setNepData(data))
      .catch((err) => console.error("Error fetching NEP data:", err));

    // Trigger Daily Login Streak
    updateStreakActivity("Daily Login");
  }, []);

  // --- SYNC SIDEBAR STATE WITH URL ---
  useEffect(() => {
    if (location.pathname.includes("/dashboard/aptitude")) {
      setActiveSection("aptitude");
      setOpenSems(prev => ({ ...prev, roadmapMenu: true }));
    }
    if (location.pathname.includes("/dashboard/roadmap")) {
      setActiveSection("roadmaps");
      setOpenSems(prev => ({ ...prev, roadmapMenu: true }));
    }
  }, [location.pathname]);

  // --- CHAT LOGIC ---
  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: input },
      { sender: "Bot", text: "I am here to help you! 😊" },
    ]);
    setInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- RENDER HELPERS ---
  const renderMainContent = () => {
    // If we are on a nested route (e.g., /dashboard/aptitude), show the Outlet
    // Check if path is NOT exactly /dashboard (ignoring trailing slash)
    if (location.pathname.replace(/\/$/, "") !== "/dashboard") {
      return <Outlet />;
    }

    switch (activeSection) {
      case "welcome":
        return (
          <GenericSection title="Welcome to Your Learning Dashboard!">
            <div className="mb-8 max-w-sm">
              <StreakCard />
            </div>
            <p className="text-gray-700">Select a feature from the sidebar to get started.</p>
          </GenericSection>
        );
      case "nep":
        return <SyllabusSection nepData={nepData} />;
      case "nep-mcqs":
        return <MCQSection />;
      case "scorecard":
        return <Scorecard />;
      case "lang":
        return <ProgrammingLanguagesSection />;
      case "aptitude":
        // This case serves as a fallback or if user clicks sidebar button but URL is root dashboard? 
        // No, clicking sidebar will change URL now. 
        // But if state is set manually without URL change, we might want to redirect?
        // Actually, sidebar will now use navigate().
        return null;
      case "interview":
        return <RoadmapSection title="Interview Questions" />;
      case "web-roadmap":
        return <RoadmapSection title="Web Dev Roadmap" />;
      case "notes":
        return <NotesUploadSection />;
      case "certificates":
        return <CertificateSection />;
      default:
        // Even if activeSection is 'aptitude', if we are at root /dashboard, we might want to show something?
        // But the useEffect above sets activeSection based on URL.
        // If we are at root /dashboard, activeSection likely 'welcome'.
        return (
          <GenericSection title="Dashboard Section">
            <p className="text-gray-700">Content for {activeSection} is under maintenance.</p>
          </GenericSection>
        );
    }
  };

  return (
    <div className="bg-[#fcfdfe] font-sans min-h-screen flex flex-col">
      <Topbar
        onChatToggle={() => setChatOpen(!chatOpen)}
        onCertificateClick={() => {
          setActiveSection("certificates");
          navigate("/dashboard");
        }}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 relative">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          openSems={openSems}
          setOpenSems={setOpenSems}
        />

        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Dynamic Breadcrumb/Context Header */}
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 block">
                {activeSection === 'welcome' ? 'Overview' : activeSection.replace('-', ' ')}
              </span>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                {activeSection === 'welcome' ? 'Ready to code, User?' : activeSection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </h1>
              <div className="h-1.5 w-20 bg-indigo-600 rounded-full mt-4 shadow-lg shadow-indigo-100"></div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
              {renderMainContent()}
            </div>
          </div>
        </main>
      </div>

      <Chatbot
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        messages={messages}
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Dashboard;
