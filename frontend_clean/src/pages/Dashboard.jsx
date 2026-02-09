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
import SettingsSection from "../components/dashboard/SettingsSection";
import { useStreak } from "../context/StreakContext";
import { useAuth } from "../context/AuthContext";

import API from "../api/axios";
import edubotAPI from "../api/edubot";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();

  // --- STATE ---
  const [activeSection, setActiveSection] = useState("welcome");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [nepData, setNepData] = useState([]);
  const [openSems, setOpenSems] = useState({}); // Shared for menu states

  // --- DATA FETCHING ---
  const { updateStreakActivity } = useStreak();

  useEffect(() => {
    const fetchNepData = async () => {
      try {
        const res = await API.get("/nep");
        setNepData(res.data);
      } catch (err) {
        console.error("Error fetching NEP data:", err);
      }
    };

    fetchNepData();

    // Fetch Chat History
    const fetchChatHistory = async () => {
      try {
        const history = await edubotAPI.getHistory();
        setMessages(history.map(m => ({
          sender: m.sender === 'user' ? 'You' : 'bot',
          text: m.text
        })));
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchChatHistory();

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
  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await edubotAPI.sendMessage(userMessage, {
        currentPage: activeSection,
        location: location.pathname
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.reply },
      ]);
    } catch (err) {
      console.error("EduBot error:", err);
      let errorMsg = err.response?.data?.message;

      if (!errorMsg) {
        if (err.response) {
          errorMsg = `Server Error: ${err.response.status} ${err.response.statusText}`;
        } else if (err.request) {
          errorMsg = "Network Error: No response received from server. Is the backend running?";
        } else {
          errorMsg = `Error: ${err.message}`;
        }
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMsg },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
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
            <p className="text-gray-700 dark:text-slate-400 font-medium transition-colors">Select a feature from the sidebar to get started.</p>
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
      case "profile":
        return (
          <GenericSection title="User Profile">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-slate-600 dark:text-slate-400 mb-4">Manage your personal information and preferences.</p>
              <div className="space-y-2">
                <p className="text-sm dark:text-slate-300"><strong>Name:</strong> {currentUser?.displayName || 'Not set'}</p>
                <p className="text-sm dark:text-slate-300"><strong>Email:</strong> {currentUser?.email}</p>
              </div>
            </div>
          </GenericSection>
        );
      case "settings":
        return <SettingsSection />;
      default:
        return (
          <GenericSection title="Dashboard Section">
            <p className="text-gray-700 dark:text-slate-400 font-medium">Content for {activeSection} is under maintenance.</p>
          </GenericSection>
        );
    }
  };

  return (
    <div className="bg-background font-sans min-h-screen flex flex-col transition-colors duration-500">
      <Topbar
        onChatToggle={() => setChatOpen(!chatOpen)}
        onCertificateClick={() => {
          setActiveSection("certificates");
          navigate("/dashboard");
        }}
        onSectionChange={(section) => {
          setActiveSection(section);
          if (location.pathname !== "/dashboard") {
            navigate("/dashboard");
          }
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
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-2 block">
                {activeSection === 'welcome' ? 'Overview' : activeSection.replace('-', ' ')}
              </span>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {activeSection === 'welcome' ? `Ready to code, ${currentUser?.displayName || 'User'}?` : activeSection.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </h1>
              <div className="h-1.5 w-20 bg-indigo-600 rounded-full mt-4 shadow-lg shadow-indigo-100 dark:shadow-none"></div>
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
        isTyping={isTyping}
      />
    </div>
  );
}

export default Dashboard;
