import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [theme, setThemeState] = useState(() => {
        // Initial load from localStorage
        return localStorage.getItem('theme') || 'light';
    });

    const setTheme = async (newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);

        // If user is logged in, sync with backend
        if (currentUser) {
            try {
                await API.put('/auth/settings', {
                    preferences: {
                        theme: newTheme
                    }
                });
            } catch (err) {
                console.error('Failed to sync theme with backend', err);
            }
        }
    };

    // Apply theme class to document
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Load theme from backend when user logs in
    useEffect(() => {
        const fetchUserPreference = async () => {
            if (currentUser) {
                try {
                    const res = await API.get('/auth/profile');
                    if (res.data.user?.preferences?.theme) {
                        const savedTheme = res.data.user.preferences.theme;
                        setThemeState(savedTheme);
                        localStorage.setItem('theme', savedTheme);
                    }
                } catch (err) {
                    console.error('Failed to fetch theme preference', err);
                }
            }
        };
        fetchUserPreference();
    }, [currentUser]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
