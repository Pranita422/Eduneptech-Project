import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { useStreak } from "../../context/StreakContext";

const COURSES = [
    {
        id: "bsc-it",
        name: "B.Sc Information Technology",
        shortName: "B.Sc IT",
        icon: "💻",
        gradient: "from-blue-50 to-indigo-50",
        border: "border-blue-100",
        accent: "blue-600"
    },
    {
        id: "bsc-cs",
        name: "B.Sc Computer Science",
        shortName: "B.Sc CS",
        icon: "🖥️",
        gradient: "from-purple-50 to-fuchsia-50",
        border: "border-purple-100",
        accent: "blue-600"
    },
    {
        id: "bsc-ds",
        name: "B.Sc Data Science",
        shortName: "B.Sc DS",
        icon: "🖥️",
        gradient: "from-emerald-50 to-teal-50",
        border: "border-emerald-100",
        accent: "blue-600"
    }
];

const YEARS = [
    { id: "fy", name: "First Year", short: "FY" },
    { id: "sy", name: "Second Year", short: "SY" },
    { id: "ty", name: "Third Year", short: "TY" }
];

function MCQSection() {
    const [view, setView] = useState("courses"); // "courses", "years", "quiz"
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const { updateStreakActivity } = useStreak();

    // Dynamic Data State
    const [mcqs, setMcqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Quiz State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // Will store index 0-3 for UI mapping

    // Fetch MCQs when course and year are selected
    useEffect(() => {
        if (selectedCourse && selectedYear) {
            fetchMcqs();
        }
    }, [selectedCourse, selectedYear]);

    const fetchMcqs = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log(`[Frontend] Fetching MCQs for Course: ${selectedCourse.id}, Year: ${selectedYear.short}`);
            const response = await API.get(
                `/mcqs?course=${selectedCourse.id}&year=${selectedYear.short}`
            );
            console.log(`[Frontend] Received ${response.data.length} MCQs`);
            setMcqs(response.data);
        } catch (err) {
            console.error("[Frontend] Error fetching MCQs:", err);
            setError("Failed to load questions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setView("years");
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setView("quiz");
    };

    const handleAnswerClick = (optionKey) => {
        setSelectedOption(optionKey);

        const currentMcq = mcqs[currentQuestion];
        if (optionKey === currentMcq.correctAnswer) {
            setScore(score + 1);
            updateStreakActivity(`Solved MCQ: ${currentMcq.question.substring(0, 20)}...`);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < mcqs.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
            } else {
                setShowScore(true);
            }
        }, 1000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
    };

    const goBack = () => {
        if (view === "years") setView("courses");
        if (view === "quiz") {
            setView("years");
            resetQuiz();
        }
    };

    const renderHeader = (title, subtitle) => (
        <div className="mb-12">
            <div className="flex items-center space-x-4 mb-2">
                {view !== "courses" && (
                    <button
                        onClick={goBack}
                        className="p-2 hover:bg-violet-50 rounded-full transition-colors text-violet-600"
                    >
                        ← Back
                    </button>
                )}
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                    {title}
                </h2>
            </div>
            <p className="text-gray-500 font-medium ml-1">{subtitle}</p>
        </div>
    );

    const renderCourseSelection = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderHeader("Select Your Course", "Choose a branch to view available MCQs")}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {COURSES.map((course) => (
                    <button
                        key={course.id}
                        onClick={() => handleCourseSelect(course)}
                        className={`group relative bg-white rounded-[2.5rem] p-10 text-left border-2 ${course.border} shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-violet-700 shadow-sm border border-violet-100">
                            NEP 2020
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                {course.icon}
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-2 leading-tight">
                                {course.shortName}
                            </h3>
                            <p className="text-sm text-gray-600 font-medium opacity-80">
                                {course.name}
                            </p>
                            <div className={`mt-8 flex items-center text-${course.accent} font-bold text-sm tracking-wide`}>
                                Explore Questions
                                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderYearSelection = () => (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {renderHeader(`Select Year: ${selectedCourse?.shortName}`, "Choose your academic year")}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {YEARS.map((year) => (
                    <button
                        key={year.id}
                        onClick={() => handleYearSelect(year)}
                        className="group bg-white rounded-[2.5rem] p-10 text-center border-2 border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
                    >
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">📅</div>
                        <h3 className="text-3xl font-black text-gray-800 mb-2">{year.short}</h3>
                        <p className="text-gray-500 font-bold">{year.name}</p>
                        <div className="mt-8 py-3 bg-gray-50 rounded-2xl text-violet-600 font-black text-xs uppercase tracking-widest group-hover:bg-violet-600 group-hover:text-white transition-all">
                            Start Quiz
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderQuiz = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-6"></div>
                    <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">Loading Questions...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
                    <div className="text-6xl mb-6">⚠️</div>
                    <h3 className="text-2xl font-black text-red-800 mb-2">Oops!</h3>
                    <p className="text-red-600 font-medium mb-8">{error}</p>
                    <button onClick={fetchMcqs} className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-200">Retry Fetch</button>
                </div>
            );
        }

        if (mcqs.length === 0) {
            return (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100">
                    <div className="text-6xl mb-6">📭</div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">No Questions Found</h3>
                    <p className="text-gray-500 font-medium mb-8">We haven't uploaded MCQs for this year yet. Stay tuned!</p>
                    <button onClick={goBack} className="px-8 py-3 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-200">Go Back</button>
                </div>
            );
        }

        const currentMcq = mcqs[currentQuestion];

        return (
            <div className="animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    {renderHeader(`${selectedCourse?.shortName} - ${selectedYear?.short}`, `Subject: ${currentMcq.subject || 'All Subjects'}`)}
                    <div className="bg-violet-100 text-violet-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                        Difficulty: {currentMcq.difficulty}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-bl-[10rem] -mr-32 -mt-32 opacity-50"></div>

                    {showScore ? (
                        <div className="text-center py-10 relative z-10">
                            <div className="text-7xl mb-8 animate-bounce">🏆</div>
                            <h2 className="text-5xl font-black text-gray-800 mb-4 tracking-tight">Excellent!</h2>
                            <p className="text-2xl text-gray-500 font-medium mb-12">
                                You scored <span className="text-violet-600 font-black">{score}</span> out of {mcqs.length}
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetQuiz}
                                    className="px-10 py-4 bg-violet-600 text-white rounded-[2rem] font-bold hover:bg-violet-700 transition-all shadow-xl hover:shadow-violet-200"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={goBack}
                                    className="px-10 py-4 bg-gray-100 text-gray-700 rounded-[2rem] font-bold hover:bg-gray-200 transition-all"
                                >
                                    Choose Another Year
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <span className="text-violet-600 font-black uppercase tracking-[0.2em] text-xs">Question {currentQuestion + 1} of {mcqs.length}</span>
                                    <h3 className="text-3xl font-black text-gray-800 mt-4 leading-tight">
                                        {currentMcq.question}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(currentMcq.options).map(([key, value]) => {
                                    let style = "bg-gray-50 border-gray-100 text-gray-700 hover:border-violet-200 hover:bg-violet-50";

                                    if (selectedOption === key) {
                                        style = key === currentMcq.correctAnswer
                                            ? "bg-green-100 border-green-500 text-green-800 scale-[1.02]"
                                            : "bg-red-100 border-red-500 text-red-800 scale-[0.98]";
                                    } else if (selectedOption !== null && key === currentMcq.correctAnswer) {
                                        style = "bg-green-50 border-green-200 text-green-800";
                                    }

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => selectedOption === null && handleAnswerClick(key)}
                                            disabled={selectedOption !== null}
                                            className={`group w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${style}`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm transition-colors ${selectedOption === key ? 'bg-white' : 'bg-gray-200 group-hover:bg-violet-100'}`}>
                                                    {key}
                                                </div>
                                                <span className="text-lg font-bold">{value}</span>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedOption === key ? 'border-transparent scale-125' : 'border-gray-200'}`}>
                                                {selectedOption === key && (key === currentMcq.correctAnswer ? "✓" : "✕")}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-12">
                                <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                                    <span>Progress</span>
                                    <span>{Math.round(((currentQuestion + 1) / mcqs.length) * 100)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-violet-600 transition-all duration-700 ease-out shadow-sm shadow-violet-200"
                                        style={{ width: `${((currentQuestion + 1) / mcqs.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section className="py-8">
            {view === "courses" && renderCourseSelection()}
            {view === "years" && renderYearSelection()}
            {view === "quiz" && renderQuiz()}
        </section>
    );
}

export default MCQSection;
