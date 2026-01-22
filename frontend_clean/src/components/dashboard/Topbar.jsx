import React, { useState, useEffect } from "react";

function Topbar({ onChatToggle, onLogout }) {
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
        <header className="bg-violet-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
            <h1 className="text-xl font-bold flex items-center gap-2">
                🎓{" "}
                <span>
                    Edu<span className="text-yellow-300">nep</span>tech
                </span>
            </h1>
            <div className="flex gap-5 text-2xl">
                <div className="flex items-center gap-1 text-orange-400 font-bold bg-white/10 px-3 py-1 rounded-full text-base" title={`Current Streak: ${streak} days`}>
                    <span>🔥</span> {streak}
                </div>
                <button title="Certificates">🏅</button>
                <button title="Settings">⚙️</button>
                <button title="Chatbot" onClick={onChatToggle}>
                    🤖
                </button>
                <button title="Logout" onClick={onLogout}>
                    🚪
                </button>
            </div>
        </header>
    );
}

export default Topbar;
