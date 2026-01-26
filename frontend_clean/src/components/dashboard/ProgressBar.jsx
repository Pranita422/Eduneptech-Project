import React from 'react';

const ProgressBar = ({ label, percentage, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-600",
        green: "bg-green-600",
        yellow: "bg-yellow-500",
        purple: "bg-purple-600",
        red: "bg-red-600"
    };

    const bgColor = colorClasses[color] || "bg-blue-600";

    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">{label}</span>
                <span className="text-sm font-medium text-gray-700">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`${bgColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
