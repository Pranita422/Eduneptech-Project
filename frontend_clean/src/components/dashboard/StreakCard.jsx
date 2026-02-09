//StreakCard.jsx
/*import React, { useState, useEffect } from "react";
import { useStreak } from "../../context/StreakContext";

const StreakCard = () => {
    const { streak, loading } = useStreak();

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-lg font-bold text-purple-700 mb-2 flex items-center gap-2 font-heading">
                <span className="text-2xl animate-pulse">🔥</span>
                Daily Streak
            </h3>
            <div className="text-5xl font-extrabold text-purple-600 font-heading leading-none">
                {streak}
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">
                {streak > 0 ? "Days in a row! Keep it up!" : "Start your streak today!"}
            </div>
        </div>
    );
};

export default StreakCard;*/

// StreakCard.jsx
import React, { useEffect, useState } from "react";
import { useStreak } from "../../context/StreakContext";

const StreakCard = () => {
  const { streak, longestStreak, lastSolvedDate, loading, fetchStreak, refreshStreak } = useStreak();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchStreak();
  }, []);

  const isSolvedToday = lastSolvedDate ? new Date(lastSolvedDate).toDateString() === new Date().toDateString() : false;
  const goal = 7;
  const progress = Math.min((streak / goal) * 100, 100);

  const getMessage = () => {
    if (streak === 0) return "Start your daily challenge 🚀";
    if (isSolvedToday) return "Daily challenge complete! 🔥";
    return "Solve a problem to save your streak! ⏳";
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshStreak();
    setTimeout(() => setIsRefreshing(false), 500); // Small delay for UX
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Daily Momentum</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
              title="Refresh streak"
            >
              <svg
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSolvedToday ? 'bg-orange-500 shadow-lg shadow-orange-200' : 'bg-slate-100 dark:bg-slate-800'}`}>
              <span className={`text-xl ${isSolvedToday ? 'animate-bounce' : 'opacity-40 grayscale'}`}>
                {isSolvedToday ? '🔥' : '⌛'}
              </span>
            </div>
          </div>
        </div>

        {/* Streak Count */}
        <div className="flex items-baseline gap-2 mb-1">
          <div className="text-5xl font-black text-slate-900 dark:text-white group-hover:scale-105 transition-transform origin-left">
            {streak}
          </div>
          <span className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">Day Streak</span>
        </div>

        {/* Message */}
        <p className={`text-sm font-bold mb-6 transition-colors ${isSolvedToday ? 'text-emerald-600' : 'text-slate-500'}`}>
          {getMessage()}
        </p>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Weekly Goal</span>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{streak}/{goal}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-100 dark:border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isSolvedToday ? 'bg-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.5)]' : 'bg-slate-300 dark:bg-slate-600'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tight">Personal Best</div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-slate-900 dark:text-white">{longestStreak}</span>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">Days</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;

