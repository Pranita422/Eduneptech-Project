import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import API from "../api/axios";

const StreakContext = createContext();

export const useStreak = () => {
    return useContext(StreakContext);
};

export const StreakProvider = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [lastSolvedDate, setLastSolvedDate] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStreak = async () => {
        if (!currentUser) {
            setLoading(false);
            return;
        }

        try {
            const response = await API.get("/streak");
            if (response.data.streak !== undefined) {
                setStreak(response.data.streak);
                setLongestStreak(response.data.longestStreak || 0);
                setLastSolvedDate(response.data.lastSolvedDate);
            }
        } catch (error) {
            console.error("Error fetching streak:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStreakActivity = async (activityDescription) => {
        if (!currentUser) return;

        try {
            const response = await API.post("/streak/update", {
                activity: activityDescription
            });

            if (response.status === 200) {
                setStreak(response.data.streak);
                return response.data;
            }
        } catch (error) {
            console.error("Error updating streak:", error);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchStreak();
        }
    }, [currentUser, authLoading]);

    // Expose a refresh function that can be called from anywhere
    const refreshStreak = async () => {
        await fetchStreak();
    };

    return (
        <StreakContext.Provider value={{
            streak,
            longestStreak,
            lastSolvedDate,
            loading,
            fetchStreak,
            updateStreakActivity,
            refreshStreak  // New: allows components to manually refresh streak
        }}>
            {children}
        </StreakContext.Provider>
    );
};
