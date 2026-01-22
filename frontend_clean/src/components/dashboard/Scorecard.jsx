import React from "react";

function Scorecard() {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-700">
                🏆 Your Scorecard
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className="text-gray-600">Complete quizzes to see your progress here!</p>
            </div>
        </section>
    );
}

export default Scorecard;
