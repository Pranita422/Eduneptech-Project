import React, { useState, useEffect } from "react";

function Topbar({ onChatToggle, onLogout, onCertificateClick }) {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        // Fetch streak from backend or local storage if updated on login
        // For accurate real-time, fetching is better
        const fetchStreak = async () => {
            // Assuming token is in localStorage from login
            const token = localStorage.getItem("token");
            if (!token) return;

            // We need the user ID. It might be in the token or we can decode it, 
            // or we can use an endpoint that gets 'me' or just trust the login response stored in localStorage if any.
            // For now, let's try to get it from the 'user' object if stored, or fetch from a 'me' endpoint if exists.
            // The plan said /api/streak. Let's assume the auth middleware on server sets req.user.

            // BUT wait, my route /api/streak expects optional userId query or relies on middleware.
            // I'll assume we stored the user object in localStorage on login (common pattern).
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                try {
                    const res = await fetch(`http://localhost:5000/api/streak?userId=${user.id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.streak !== undefined) {
                        setStreak(data.streak);
                    }
                } catch (err) {
                    console.error("Failed to fetch streak", err);
                }
            }
        };

        fetchStreak();

        // Listen for streak updates from other components
        const handleStreakUpdate = () => {
            fetchStreak();
        };
        window.addEventListener("streakUpdated", handleStreakUpdate);

        return () => {
            window.removeEventListener("streakUpdated", handleStreakUpdate);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl font-bold">E</span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 hidden md:block">
                    Eduneptech
                </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {/* Search Bar Placeholder */}
                <div className="hidden lg:flex items-center bg-slate-100 px-4 py-2 rounded-xl text-slate-400 gap-3 border border-transparent focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-sm transition-all">
                    <span>🔍</span>
                    <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder:text-slate-400 w-48" />
                </div>

                <div className="flex items-center gap-1.5 md:gap-2.5">
                    <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-xl shadow-sm cursor-help" title={`Current Streak: ${streak} days`}>
                        <span className="text-lg animate-bounce">🔥</span>
                        <span className="text-sm font-bold text-orange-600">{streak}</span>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

                    <div className="flex gap-1 md:gap-2">
                        <button onClick={onCertificateClick} className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors relative group" title="Certificates">
                            <span className="text-xl">🏅</span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </button>

                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" title="Settings">
                            <span className="text-xl">⚙️</span>
                        </button>

                        <button onClick={onChatToggle} className="p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors" title="AI Assistant">
                            <span className="text-xl">🤖</span>
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-1"></div>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-red-50 rounded-xl transition-all group"
                        title="Logout"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                            U
                        </div>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">🚪</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Topbar;
