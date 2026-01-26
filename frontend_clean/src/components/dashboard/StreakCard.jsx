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
import React from "react";
import { useStreak } from "../../context/StreakContext";

const StreakCard = () => {
  const { streak, loading } = useStreak();

  const goal = 7;
  const progress = Math.min((streak / goal) * 100, 100);

  const getMessage = () => {
    if (streak === 0) return "Start your streak today 🚀";
    if (streak < 3) return "Nice start 🌱";
    if (streak < 7) return "You're building a habit 🔥";
    return "Streak Master 👑";
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
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Daily Momentum</h3>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
            <span className="text-lg animate-pulse">🔥</span>
          </div>
        </div>

        {/* Streak Count */}
        <div className="flex items-baseline gap-2 mb-1">
          <div className="text-5xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">
            {streak}
          </div>
          <span className="text-slate-400 font-bold">days</span>
        </div>

        {/* Message */}
        <p className="text-sm text-slate-500 font-medium mb-6">
          {getMessage()}
        </p>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Goal</span>
            <span className="text-xs font-bold text-indigo-600">{streak}/{goal}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-50">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(79,70,229,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Next milestone: 7 Day Master</div>
      </div>
    </div>
  );
};

export default StreakCard;

