//StreakContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../data/dashboardData";

const StreakContext = createContext();

export const useStreak = () => {
    return useContext(StreakContext);
};

export const StreakProvider = ({ children }) => {
    const [streak, setStreak] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchStreak = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/streak`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStreak(data.streak);
            }
        } catch (error) {
            console.error("Error fetching streak:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStreakActivity = async (activityDescription) => {
        try {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");

            if (!token || !userStr) return;

            const user = JSON.parse(userStr);

            // Optimistic update (optional, but let's stick to server source for now to avoid drift)
            // or we could increment locally if we trust the logic

            const response = await fetch(`${API_BASE_URL}/streak/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user.id, activity: activityDescription })
            });

            if (response.ok) {
                const data = await response.json();
                setStreak(data.streak); // Update state from server response
                return data;
            }
        } catch (error) {
            console.error("Error updating streak:", error);
        }
    };

    useEffect(() => {
        fetchStreak();
    }, []);

    return (
        <StreakContext.Provider value={{ streak, loading, fetchStreak, updateStreakActivity }}>
            {children}
        </StreakContext.Provider>
    );
};
