import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import MockRazorpayModal from "./MockRazorpayModal";

const Scorecard = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isPremium, setIsPremium] = useState(false);
    const [eliteData, setEliteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const res = await API.get("/auth/profile");
                const premiumStatus = res.data.user.isPremium || false;
                setIsPremium(premiumStatus);

                if (premiumStatus) {
                    try {
                        const analyticsRes = await API.get("/progress/elite");
                        setEliteData(analyticsRes.data);
                    } catch (err) {
                        console.error("Failed to fetch elite analytics", err);
                        if (err.response?.status === 403 && err.response?.data?.premiumExpired) {
                            setEliteData({ expired: true });
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to fetch user status", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserStatus();
    }, []);

    const handleSubscription = () => {
        setShowPaymentModal(true);
    };

    const handleMockSuccess = async () => {
        try {
            setProcessing(true);
            const res = await API.post("/payment/mock-verify", {
                status: "success",
                itemName: "Premium Subscription",
                amount: 1499
            });

            if (res.data.msg === "Payment success") {
                setIsPremium(true);
                window.location.reload();
            }
        } catch (error) {
            console.error("Mock subscription failed", error);
        } finally {
            setProcessing(false);
            setShowPaymentModal(false);
        }
    };

    const handleMockFailure = () => {
        setShowPaymentModal(false);
    };

    const stats = [
        { label: "Overall Progress", value: "68%", icon: "🎯", color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Problems Solved", value: "124", icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Aptitude Score", value: "850", icon: "🧠", color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Day Streak", value: "12", icon: "🔥", color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const [aptitudeProgress, setAptitudeProgress] = useState({
        "Quantitative": 0,
        "Logical Reasoning": 0,
        "Verbal Ability": 0,
        "Data Structures": 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await API.get("/progress/dashboard");
                if (res.data.user?.progress?.aptitude) {
                    setAptitudeProgress(res.data.user.progress.aptitude);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };
        fetchDashboardData();
    }, []);

    const masteryAreas = [
        { subject: "Quantitative Aptitude", progress: aptitudeProgress["Quantitative"] || 0, color: "bg-indigo-500" },
        { subject: "Logical Reasoning", progress: aptitudeProgress["Logical Reasoning"] || 0, color: "bg-violet-500" },
        { subject: "Coding Logic", progress: aptitudeProgress["Data Structures"] || 0, color: "bg-emerald-500" },
        { subject: "Verbal Ability", progress: aptitudeProgress["Verbal Ability"] || 0, color: "bg-amber-500" },
    ];

    const achievements = [
        { title: "Early Bird", description: "Logged in 7 days in a row", icon: "🌅", earned: true },
        { title: "Problem Solver", description: "Solved 100+ problems", icon: "💻", earned: true },
        { title: "Logic Master", description: "scored 90% in Logical Reasoning", icon: "🧩", earned: false },
        { title: "Elite Thinker", description: "Unlock premium for deep insights", icon: "👑", earned: false },
    ];

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <header className="relative py-10 px-8 rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl shadow-indigo-200">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                <div className="relative z-10">
                    <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Performance Intelligence</span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Your Elite Scorecard</h1>
                    <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
                        Data-driven insights to fuel your engineering journey. Track your evolution, celebrate milestones, and bridge the gap to mastery.
                    </p>
                </div>
            </header>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-surface p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-text-muted text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className={`text-4xl font-black ${stat.color} tracking-tight transition-colors`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Mastery Progress */}
                <div className="lg:col-span-2 bg-surface rounded-[2.5rem] p-10 border border-border shadow-sm transition-colors relative group overflow-hidden">
                    <div className={`transition-all duration-700 ${!isPremium ? 'blur-md grayscale select-none pointer-events-none' : ''}`}>
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-text-primary tracking-tight">Skill Mastery</h2>
                            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">Updated Live</span>
                        </div>
                        <div className="space-y-8">
                            {masteryAreas.map((area, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-sm font-black text-text-secondary">{area.subject}</span>
                                        <span className="text-sm font-black text-primary">{area.progress}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-border rounded-full overflow-hidden border border-border-highlight">
                                        <div
                                            className={`h-full ${area.color} rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(79,70,229,0.2)]`}
                                            style={{ width: `${area.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-700/50 flex items-center gap-4 transition-colors">
                            <span className="text-2xl">📈</span>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Your <span className="text-slate-900 dark:text-white font-bold">Logical Reasoning mastery</span> is in the top 5% of users this week! Keep it up.</p>
                        </div>
                    </div>

                    {!isPremium && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 z-20 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-xl shadow-amber-100 dark:shadow-none">🔒</div>
                            <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">Unlock Skill Mastery</h3>
                            <p className="text-text-secondary text-xs font-medium mb-6 max-w-[280px] leading-relaxed">
                                Get real-time progress tracking and depth analytics for all assessment categories with premium access.
                            </p>
                            <button
                                onClick={handleSubscription}
                                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-100 dark:shadow-none hover:shadow-amber-200 hover:-translate-y-0.5 transition-all active:translate-y-0"
                            >
                                {processing ? "Processing..." : "Go Premium for Live Updates"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Achievement Medals */}
                <div className="bg-surface rounded-[2.5rem] p-10 border border-border shadow-sm flex flex-col transition-colors">
                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-8">Achievements</h2>
                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        {achievements.map((ach, i) => (
                            <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center text-center group transition-all duration-300 ${ach.earned ? 'bg-amber-50/30 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'bg-surface-highlight border-border opacity-60'}`}>
                                <span className={`text-4xl mb-3 transition-transform duration-500 ${ach.earned ? 'group-hover:scale-125' : 'grayscale'}`}>{ach.icon}</span>
                                <h4 className={`text-xs font-black mb-1 ${ach.earned ? 'text-text-primary' : 'text-text-muted'}`}>{ach.title}</h4>
                                <p className="text-[10px] text-text-muted font-medium leading-tight">{ach.description}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none hover:shadow-indigo-100">
                        View Hall of Fame
                    </button>
                </div>
            </div>

            {/* Premium Insight Teaser */}
            <div className="relative group">
                <div className={`rounded-[3rem] overflow-hidden border transition-all duration-700 ${isPremium ? 'border-primary/20 bg-surface' : 'border-border'}`}>
                    {isPremium && eliteData ? (
                        <div className="p-10 animate-in fade-in zoom-in duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-text-primary tracking-tight mb-2">Elite Mastery Analytics</h2>
                                    <p className="text-sm text-text-secondary font-medium">Deep dive into your engineering evolution.</p>
                                </div>
                                <div className="px-5 py-2 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-100 dark:shadow-none">
                                    Premium Unlocked
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* 1. Difficulty Breakdown */}
                                <div className="bg-surface-highlight p-6 rounded-3xl border border-border">
                                    <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-6">Problem Breakdown</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-16 text-xs font-bold text-emerald-600 uppercase">Easy</span>
                                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(eliteData.breakdown.Easy / eliteData.totalSolved * 100) || 0}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black">{eliteData.breakdown.Easy}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-16 text-xs font-bold text-amber-600 uppercase">Medium</span>
                                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(eliteData.breakdown.Medium / eliteData.totalSolved * 100) || 0}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black">{eliteData.breakdown.Medium}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="w-16 text-xs font-bold text-rose-600 uppercase">Hard</span>
                                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(eliteData.breakdown.Hard / eliteData.totalSolved * 100) || 0}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black">{eliteData.breakdown.Hard}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Efficiency Score */}
                                <div className="bg-surface-highlight p-6 rounded-3xl border border-border flex flex-col items-center justify-center text-center">
                                    <h3 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">Code Efficiency</h3>
                                    <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200 dark:text-slate-700" />
                                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-indigo-600" strokeDasharray="351.86" strokeDashoffset={351.86 - (351.86 * eliteData.efficiency) / 100} strokeLinecap="round" />
                                        </svg>
                                        <span className="absolute text-3xl font-black text-indigo-600">{eliteData.efficiency}%</span>
                                    </div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase">Success Rate</p>
                                </div>

                                {/* 3. Readiness Projection */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl shadow-slate-200 dark:shadow-none flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Interview Readiness</h3>
                                        <h2 className="text-3xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                                            {eliteData.readiness.level}
                                        </h2>
                                        <div className="flex gap-1 mt-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span key={star} className={`text-sm ${star <= (eliteData.readiness.score / 60) ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                            Based on your problem difficulty mix and consistency. Keep pushing!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`p-10 ${!isPremium ? 'blur-md grayscale select-none pointer-events-none' : ''}`}>
                            <h2 className="text-2xl font-black text-text-primary tracking-tight mb-6">Elite Mastery Analytics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="aspect-video bg-surface-highlight rounded-3xl animate-pulse"></div>
                                <div className="space-y-6">
                                    <div className="h-6 bg-surface-highlight rounded-full w-3/4"></div>
                                    <div className="h-6 bg-surface-highlight rounded-full w-1/2"></div>
                                    <div className="h-24 bg-surface-highlight rounded-3xl w-full"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center p-10 z-20">
                            <div className="max-w-md text-center">
                                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-xl shadow-amber-100 dark:shadow-none">🔒</div>
                                <h3 className="text-2xl font-black text-text-primary mb-3 tracking-tight text-shadow-xl">Unlock Predictive Insights</h3>
                                <p className="text-text-secondary font-medium mb-8">
                                    Our AI analyze your performance patterns to predict exactly when you'll be ready for top-tier company interviews.
                                </p>
                                <button
                                    onClick={handleSubscription}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-amber-200 dark:shadow-none hover:shadow-amber-300 hover:-translate-y-1 transition-all active:translate-y-0"
                                >
                                    Go Premium for Hall of Fame Access
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <MockRazorpayModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handleMockSuccess}
                onFailure={handleMockFailure}
                itemName="Premium Subscription"
                amount={1499}
            />
        </div>
    );
};

export default Scorecard;
