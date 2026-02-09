import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Topbar({ onChatToggle, onLogout, onCertificateClick, onSectionChange }) {
    const { currentUser } = useAuth();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [streak, setStreak] = useState(0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchStreak = async () => {
            if (!currentUser) return;

            try {
                // Fetch streak (Identification handled by backend middleware)
                const res = await API.get("/streak");
                if (res.data.streak !== undefined) {
                    setStreak(res.data.streak);
                }
            } catch (err) {
                console.error("Failed to fetch streak", err);
            }
        };

        fetchStreak();

        const handleStreakUpdate = () => fetchStreak();
        window.addEventListener("streakUpdated", handleStreakUpdate);

        // Click outside to close menu
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest("#profile-dropdown-container")) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("streakUpdated", handleStreakUpdate);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currentUser, isMenuOpen]);

    const menuItems = [
        { label: "Profile", icon: "👤", onClick: () => onSectionChange("profile") },
        { label: "My Courses", icon: "📘", onClick: () => onSectionChange("welcome") },
        { label: "Solved Problems", icon: "✅", onClick: () => onSectionChange("scorecard") },
        { label: "Aptitude Progress", icon: "🧠", onClick: () => navigate("/dashboard/aptitude") },
        { label: "Settings", icon: "⚙️", onClick: () => onSectionChange("settings") },
        { label: "Logout", icon: "🚪", onClick: onLogout, variant: "danger" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-3 flex justify-between items-center shadow-sm transition-colors">
            <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl font-bold">E</span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white hidden md:block">
                    Eduneptech
                </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-400 gap-3 border border-transparent focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-slate-700 focus-within:shadow-sm transition-all">
                    <span>🔍</span>
                    <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-200 placeholder:text-slate-400 w-48" />
                </div>

                <div className="flex items-center gap-1.5 md:gap-2.5">
                    <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 px-3 py-1.5 rounded-xl shadow-sm cursor-help" title={`Current Streak: ${streak} days`}>
                        <span className="text-lg animate-bounce">🔥</span>
                        <span className="text-sm font-bold text-orange-600">{streak}</span>
                    </div>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block"></div>

                    <div className="flex gap-1 md:gap-2">
                        <button onClick={onCertificateClick} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative group" title="Certificates">
                            <span className="text-xl">🏅</span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </button>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors group relative"
                            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                        >
                            <span className="text-xl transition-all duration-300 rotate-0 group-hover:rotate-12 transform block">
                                {theme === 'dark' ? '🌙' : '☀️'}
                            </span>
                        </button>

                        <button onClick={onChatToggle} className="p-2 text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-colors" title="AI Assistant">
                            <span className="text-xl">🤖</span>
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

                    <div className="relative" id="profile-dropdown-container">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group"
                        >
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Account</span>
                                <span className="text-xs font-black text-slate-700 dark:text-slate-200 truncate max-w-[80px]">{currentUser?.displayName?.split(' ')[0] || "User"}</span>
                            </div>
                            <div className={`w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border-2 shadow-sm overflow-hidden flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-sm transition-all ${isMenuOpen ? 'border-indigo-500 ring-2 ring-indigo-50 dark:ring-indigo-900/20' : 'border-white dark:border-slate-700 group-hover:border-slate-200 dark:group-hover:border-slate-600'}`}>
                                {currentUser?.photoURL ? (
                                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{currentUser?.displayName?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || "U"}</span>
                                )}
                            </div>
                            <span className={`text-[8px] text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-indigo-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 py-3 animate-in fade-in zoom-in-95 duration-200 origin-top-right overflow-hidden">
                                <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Signed in as</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white truncate">{currentUser?.email}</p>
                                </div>

                                {menuItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            item.onClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-5 py-2.5 transition-all text-sm font-bold ${item.variant === "danger"
                                            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400"
                                            }`}
                                    >
                                        <span className="text-lg opacity-80">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
