import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import StreakCard from './StreakCard';
import { API_BASE_URL } from '../../data/dashboardData';

const ProgressSection = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/progress/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) return <div className="p-4">Loading progress...</div>;

    if (!stats) return <div className="p-4">Unable to load progress data.</div>;

    const { user, recentActivity } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Main Progress Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Learning Progress</h2>
                <ProgressBar label="HTML" percentage={user.progress.html} color="blue" />
                <ProgressBar label="CSS" percentage={user.progress.css} color="blue" />
                <ProgressBar label="JavaScript" percentage={user.progress.javascript} color="blue" />

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Solved</p>
                        <p className="text-2xl font-bold text-gray-800">{user.progress.totalSolved}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Current Streak</p>
                        <p className="text-2xl font-bold text-orange-500">{user.streak} Days 🔥</p>
                    </div>
                </div>
            </div>

            {/* Achievements & Activity */}
            <div className="flex flex-col gap-6">

                {/* Achievements */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-1">
                    <h3 className="text-lg font-bold mb-3 text-gray-800">Achievements</h3>
                    {user.achievements.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {user.achievements.map((ach, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                                    <span className="text-2xl">{ach.icon || "🏆"}</span>
                                    <div>
                                        <p className="font-semibold text-sm">{ach.title}</p>
                                        <p className="text-xs text-gray-500">{ach.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">Solve problems to unlock achievements!</p>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-1">
                    <h3 className="text-lg font-bold mb-3 text-gray-800">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((sub) => (
                                <div key={sub._id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-700">{sub.problemId?.title || "Unknown Problem"}</p>
                                        <p className="text-xs text-gray-500">{new Date(sub.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${sub.result === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {sub.result}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No recent activity.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProgressSection;
