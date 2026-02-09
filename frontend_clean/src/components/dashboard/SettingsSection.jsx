import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import API from "../../api/axios";

const SettingsSection = () => {
    const { currentUser, updateUserPassword, updateUserProfile, updateUserSettings } = useAuth();
    const { theme, setTheme } = useTheme();

    // Form States
    const [name, setName] = useState(currentUser?.displayName || "");
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Preference States
    const [notifications, setNotifications] = useState(true);

    // UI States
    const [activeTab, setActiveTab] = useState("account");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await API.get("/auth/profile");
                if (res.data.user.preferences) {
                    setNotifications(res.data.user.preferences.notifications);
                }
                // Store full user data including premium info
                setUser(res.data.user);
            } catch (err) {
                console.error("Failed to fetch preferences", err);
            }
        };
        fetchPreferences();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await updateUserProfile({ name, photoURL });
            setMessage({ type: "success", text: "Profile updated successfully! ✨" });
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.message || err.response?.data?.msg || err.message || "Failed to update profile.";
            setMessage({ type: "error", text: `${errMsg} ❌` });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setMessage({ type: "error", text: "Passwords do not match! ❌" });
        }
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await updateUserPassword(newPassword);
            setNewPassword("");
            setConfirmPassword("");
            setMessage({ type: "success", text: "Password changed successfully! 🔐" });
        } catch (err) {
            console.error(err);
            const errMsg = err.message || "Failed to update password. Try re-logging in.";
            setMessage({ type: "error", text: `${errMsg} ❌` });
        } finally {
            setLoading(false);
        }
    };

    const handlePreferenceUpdate = async (updatedPrefs) => {
        setMessage({ type: "", text: "" });
        try {
            await updateUserSettings({
                notifications: updatedPrefs.notifications !== undefined ? updatedPrefs.notifications : notifications,
                theme
            });
            setMessage({ type: "success", text: "Preferences saved! ⚙️" });
        } catch (err) {
            setMessage({ type: "error", text: "Failed to save preferences. ❌" });
        }
    };

    const tabs = [
        { id: "account", label: "Account", icon: "👤" },
        { id: "security", label: "Security", icon: "🔐" },
        { id: "preferences", label: "Preferences", icon: "⚙️" },
    ];

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 transition-colors">Settings & Privacy</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Manage your account details and application experience.</p>
            </header>

            <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden flex flex-col md:flex-row transition-all shadow-indigo-100/50">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 p-6 space-y-2 transition-colors">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </aside>


                {/* Main Content Area */}
                <main className="flex-1 p-8 md:p-12">
                    {message.text && (
                        <div className={`mb-8 p-4 rounded-2xl border font-bold text-sm ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                            {message.text}
                        </div>
                    )}

                    {activeTab === "account" && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 transition-colors">Profile Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={currentUser?.email || ""}
                                        readOnly
                                        className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none transition-all font-medium text-slate-600 dark:text-slate-400 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Display Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Profile Photo URL</label>
                                    <input
                                        type="text"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all active:translate-y-0"
                            >
                                {loading ? "Updating..." : "Save Profile"}
                            </button>
                        </form>
                    )}

                    {/* Premium Subscription Status */}
                    {activeTab === "account" && user?.isPremium && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-3xl border-2 border-purple-200 dark:border-purple-800/50 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-purple-900/30">
                                        <span className="text-2xl">👑</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-purple-900 dark:text-purple-100">Premium Member</h3>
                                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                            {user.premiumExpiresAt
                                                ? `Expires: ${new Date(user.premiumExpiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                                                : 'Lifetime Access ✨'}
                                        </p>
                                    </div>
                                </div>
                                {user.isPremiumActive ? (
                                    <span className="px-4 py-2 bg-emerald-500 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30">
                                        Active
                                    </span>
                                ) : (
                                    <span className="px-4 py-2 bg-red-500 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-red-200 dark:shadow-red-900/30">
                                        Expired
                                    </span>
                                )}
                            </div>
                            {user.premiumExpiresAt && (
                                <div className="text-xs font-medium text-purple-700 dark:text-purple-300">
                                    <p>
                                        {user.isPremiumActive
                                            ? `✨ Enjoy premium features for ${Math.floor((new Date(user.premiumExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))} more days!`
                                            : '⚠️ Your premium subscription has expired. Renew to continue enjoying exclusive features.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}


                    {activeTab === "security" && (
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 transition-colors">Change Password</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-100 hover:shadow-slate-200 hover:-translate-y-0.5 transition-all active:translate-y-0"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                            <p className="text-[10px] text-slate-400 text-center font-bold px-4">
                                IMPORTANT: Changing your password will require you to log in again on other devices.
                            </p>
                        </form>
                    )}

                    {activeTab === "preferences" && (
                        <div className="space-y-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 transition-colors">App Preferences</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors">
                                    <div>
                                        <h4 className="font-black text-slate-900 dark:text-white text-sm">Notifications</h4>
                                        <p className="text-xs text-slate-500">Receive alerts about your streak and progress.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newVal = !notifications;
                                            setNotifications(newVal);
                                            handlePreferenceUpdate({ notifications: newVal });
                                        }}
                                        className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${notifications ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>

                            </div>

                            <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors">
                                <div>
                                    <h4 className="font-black text-slate-900 dark:text-white text-sm">Appearance</h4>
                                    <p className="text-xs text-slate-500">Choose your preferred visual theme.</p>
                                </div>
                                <div className="flex bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-800 transition-all">
                                    {['light', 'dark'].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setTheme(m)}
                                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${theme === m ? 'bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-500/10' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div >
        </div >
    );
};

export default SettingsSection;
