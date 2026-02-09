import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    updatePassword,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase/config";
import API from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout
    const logout = () => {
        return signOut(auth);
    };

    // Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Update Password
    const updateUserPassword = async (newPassword) => {
        try {
            if (auth.currentUser) {
                // 1. Update Firebase Password
                await updatePassword(auth.currentUser, newPassword);
            }
            // 2. Sync with Backend
            await API.put("/auth/change-password", { newPassword });
            return true;
        } catch (error) {
            console.error("[AuthContext] updateUserPassword failed:", error);
            throw error;
        }
    };

    // Update Profile
    const updateUserProfile = async (data) => {
        try {
            if (auth.currentUser) {
                console.log("[AuthContext] Updating Firebase profile...");
                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.photoURL
                });
            }

            console.log("[AuthContext] Syncing with backend...");
            await API.put("/auth/profile", {
                name: data.name,
                picture: data.photoURL
            });
            console.log("[AuthContext] Backend sync complete.");

            // Update local state with fresh data from auth object
            if (auth.currentUser) {
                setCurrentUser({ ...auth.currentUser });
            }
        } catch (error) {
            console.error("[AuthContext] updateUserProfile failed:", error);
            throw error;
        }
    };

    // Update Settings
    const updateUserSettings = async (preferences) => {
        try {
            await API.put("/auth/settings", { preferences });
            // Optionally update local currentUser state if preferences are part of it
            // For now, theme is handled by ThemeContext separately but we hit the same endpoint
        } catch (error) {
            console.error("[AuthContext] updateUserSettings failed:", error);
            throw error;
        }
    };

    // Google Login
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Email Verification
    const verifyEmail = () => {
        if (auth.currentUser) {
            return sendEmailVerification(auth.currentUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const getToken = () => auth.currentUser ? auth.currentUser.getIdToken() : null;

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserPassword,
        updateUserProfile,
        updateUserSettings,
        googleLogin,
        verifyEmail,
        getToken,
        loading
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
