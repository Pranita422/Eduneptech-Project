import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./RoadmapAptitude.module.css";

const AptitudeTest = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({}); // { 0: "Option A", 1: "Option B" }
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const [visited, setVisited] = useState(new Set([0])); // Track visited indices

    const PREMIUM_CATEGORIES = []; // All categories are now free

    useEffect(() => {
        setVisited(prev => new Set([...prev, currentQ]));
    }, [currentQ]);

    const handlePaletteClick = (idx) => {
        setCurrentQ(idx);
    };

    const verifyAccessAndFetch = async () => {
        // 1. Verify Access if Premium
        if (PREMIUM_CATEGORIES.includes(category)) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to access this assessment.");
                navigate("/login");
                return;
            }
            try {
                const userRes = await API.get("/auth/profile");
                const unlocked = userRes.data.user.unlockedCategories || [];
                if (!unlocked.includes(category)) {
                    alert("This is a premium assessment. Please unlock it first.");
                    navigate("/dashboard/aptitude");
                    return;
                }
            } catch (error) {
                console.error("Access verification failed", error);
                navigate("/dashboard/aptitude");
                return;
            }
        }

        // 2. Fetch Questions
        try {
            const res = await API.get(`/aptitude/questions?category=${encodeURIComponent(category)}`);
            setQuestions(res.data);
        } catch (err) {
            console.error("Failed to fetch questions", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyAccessAndFetch();
    }, [category]);

    const handleOptionSelect = (option) => {
        setAnswers({ ...answers, [currentQ]: option });
    };

    const calculateScore = async () => {
        try {
            // Map index-based answers to ID-based answers for the backend
            const payload = {};
            questions.forEach((q, i) => {
                if (answers[i]) {
                    payload[q._id] = answers[i];
                }
            });

            const res = await API.post("/aptitude/submit", {
                category,
                answers: payload
            });

            console.log("Result submitted:", res.data);
            setScore(res.data.score);
            setShowResult(true);
        } catch (error) {
            console.error("Failed to submit results", error);
            // Fallback to local calculation if backend fails
            let s = 0;
            questions.forEach((q, i) => {
                if (answers[i] === q.correctAnswer) s++;
            });
            setScore(s);
            setShowResult(true);
        }
    };

    if (loading) return <div className={styles.container}>Loading questions...</div>;
    if (questions.length === 0) return <div className={styles.container}>No questions found for this category.</div>;

    if (showResult) {
        return (
            <div className={styles.container}>
                <div className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                        <h1 className={styles.title} style={{ marginBottom: '1rem' }}>Result: {score} / {questions.length}</h1>
                        <p className="text-xl font-bold text-primary">
                            {score === questions.length ? "Perfect Score! 🎉" : score > questions.length / 2 ? "Good Job! 👍" : "Keep Practicing! 💪"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, i) => (
                            <div key={i} className="border-b border-border pb-6 last:border-0">
                                <p className="text-lg font-black text-text-primary mb-3">{i + 1}. {q.question}</p>
                                <div className="flex flex-col gap-2">
                                    <p className={`font-bold flex items-center gap-2 ${answers[i] === q.correctAnswer ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        Your Answer: {answers[i] || "Skipped"}
                                        {answers[i] === q.correctAnswer ? " ✅" : " ❌"}
                                    </p>
                                    {answers[i] !== q.correctAnswer && (
                                        <p className="font-bold text-emerald-600">Correct Answer: {q.correctAnswer}</p>
                                    )}
                                    <p className="text-sm text-text-muted mt-2 p-4 bg-surface-highlight rounded-xl border border-border italic">
                                        <strong className="not-italic text-text-secondary mr-2">EXPLANATION:</strong>
                                        {q.explanation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/dashboard/aptitude')}
                            className={styles.primaryBtn}
                        >
                            Back to Training Hub
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currentQ];

    return (
        <div className={styles.container}>
            <button
                onClick={() => navigate('/dashboard/aptitude')}
                className={styles.backBtn}
            >
                <span>← Back to Categories</span>
            </button>

            <header className={styles.testHeader}>
                <h2 className="text-2xl font-black text-text-primary m-0">{category} Assessment</h2>
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                        Node {currentQ + 1} / {questions.length}
                    </span>
                </div>
            </header>

            <div className={styles.testLayout}>
                <div className={`${styles.testCard} ${styles.testCardLayout}`}>
                    <h3 className={styles.questionText}>{q.question}</h3>

                    <div className={styles.optionsGrid}>
                        {q.options.map((opt, idx) => (
                            <button
                                key={opt}
                                onClick={() => handleOptionSelect(opt)}
                                className={`${styles.optionBtn} ${answers[currentQ] === opt ? styles.optionSelected : ''}`}
                            >
                                <span className="w-8 h-8 rounded-lg bg-surface-highlight flex items-center justify-center text-xs font-black text-text-muted border border-border group-hover:border-primary">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                            </button>
                        ))}
                    </div>

                    <div className={styles.footerAction}>
                        <button
                            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                            disabled={currentQ === 0}
                            className={styles.secondaryBtn}
                            style={{ opacity: currentQ === 0 ? 0.5 : 1 }}
                        >
                            PREVIOUS
                        </button>

                        {currentQ === questions.length - 1 ? (
                            <button
                                onClick={calculateScore}
                                className={styles.primaryBtn}
                                style={{ background: '#10b981', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}
                            >
                                FINALIZE TEST
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
                                className={styles.primaryBtn}
                            >
                                CONTINUE →
                            </button>
                        )}
                    </div>
                </div>

                {/* Question Palette Sidebar */}
                <aside className={styles.paletteContainer}>
                    <h3 className={styles.paletteTitle}>Question Palette</h3>
                    <div className={styles.paletteGrid}>
                        {questions.map((_, i) => {
                            let statusClass = styles.unvisited;
                            if (answers[i]) {
                                statusClass = styles.attempted;
                            } else if (visited.has(i)) {
                                statusClass = styles.skipped;
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handlePaletteClick(i)}
                                    className={`${styles.paletteCircle} ${statusClass} ${currentQ === i ? styles.activeCircle : ''}`}
                                    title={`Question ${i + 1}`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border space-y-3">
                        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                            <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                            <span>Attempted</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                            <span className="w-4 h-4 rounded-full bg-amber-500"></span>
                            <span>Skipped</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                            <span className="w-4 h-4 rounded-full bg-surface-highlight border border-border"></span>
                            <span>Unvisited</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AptitudeTest;
