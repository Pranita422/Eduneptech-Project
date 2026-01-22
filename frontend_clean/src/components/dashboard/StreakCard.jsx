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
    <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* Header */}
      <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
        <span className="text-2xl animate-pulse">🔥</span>
        Daily Streak
      </h3>

      {/* Streak Count */}
      <div className="text-6xl font-extrabold text-purple-600 leading-none">
        {streak}
      </div>

      {/* Message */}
      <p className="text-sm text-gray-600 mt-2 font-medium">
        {getMessage()}
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {streak}/{goal} days goal
        </p>
      </div>
    </div>
  );
};

export default StreakCard;

