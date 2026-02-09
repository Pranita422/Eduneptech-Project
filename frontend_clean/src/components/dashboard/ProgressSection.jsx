import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import StreakCard from './StreakCard';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const ProgressSection = () => {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!currentUser) return;
            try {
                const res = await API.get("/progress/dashboard");
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching progress:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [currentUser]);

    if (loading) return <div className="p-4">Loading progress...</div>;

    if (!stats) return <div className="p-4">Unable to load progress data.</div>;

    const { user, recentActivity } = stats;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Progress Card */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Curriculum Mastery</h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Real-time Skill Tracking</p>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        <span className="text-xs font-bold text-slate-600">Overall Grade: <span className="text-indigo-600">A+</span></span>
                    </div>
                </div>

                <div className="space-y-6 flex-1">
                    <ProgressBar label="HTML5 Mastery" percentage={user.progress.html} color="blue" />
                    <ProgressBar label="CSS3 Styling" percentage={user.progress.css} color="blue" />
                    <ProgressBar label="JavaScript Logic" percentage={user.progress.javascript} color="blue" />
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Challenges</p>
                        <p className="text-3xl font-black text-slate-900 leading-none">{user.progress.totalSolved}</p>
                    </div>
                    <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/30">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider mb-1">Active Streak</p>
                        <p className="text-3xl font-black text-indigo-600 leading-none">{user.streak} days</p>
                    </div>
                </div>
            </div>

            {/* Combined Achievements & Activity Sidebar */}
            <div className="flex flex-col gap-8">
                {/* Achievements Card */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group">
                    <h3 className="text-sm font-black mb-4 text-slate-900 uppercase tracking-widest">Global Trophies</h3>
                    {user.achievements.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3">
                            {user.achievements.map((ach, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                                    <span className="text-xl shrink-0 drop-shadow-sm">{ach.icon || "🏆"}</span>
                                    <div>
                                        <p className="font-bold text-slate-800 text-xs">{ach.title}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{ach.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <span className="text-2xl opacity-20 filter grayscale mb-2 block font-bold tracking-tighter">EMPTY</span>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Solve to unlock</p>
                        </div>
                    )}
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex-1">
                    <h3 className="text-sm font-black mb-6 text-slate-900 uppercase tracking-widest">Activity Feed</h3>
                    <div className="space-y-5 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((sub) => (
                                <div key={sub._id} className="flex gap-4 relative">
                                    <div className={`w - [24px] h - [24px] rounded - full border - 4 border - white shadow - sm flex items - center justify - center shrink - 0 z - 10 ${sub.result === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'} `}>
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-xs font-bold text-slate-800 truncate pr-2">{sub.problemId?.title || "Unknown Task"}</p>
                                            <span className="text-[9px] font-black text-slate-400 uppercase shrink-0">{new Date(sub.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <p className={`text - [10px] font - bold mt - 0.5 ${sub.result === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'} `}>
                                            {sub.result}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 text-[10px] text-center font-bold tracking-widest uppercase">No feed items</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressSection;
