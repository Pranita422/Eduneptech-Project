import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/aptitude/questions?category=${encodeURIComponent(category)}`);
                setQuestions(res.data);
            } catch (err) {
                console.error("Failed to fetch questions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [category]);

    const handleOptionSelect = (option) => {
        setAnswers({ ...answers, [currentQ]: option });
    };

    const calculateScore = () => {
        let s = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) s++;
        });
        setScore(s);
        setShowResult(true);
    };

    if (loading) return <div className={styles.container}>Loading questions...</div>;
    if (questions.length === 0) return <div className={styles.container}>No questions found for this category.</div>;

    if (showResult) {
        return (
            <div className={styles.container}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <h1 className={styles.title}>Result: {score} / {questions.length}</h1>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>
                        {score === questions.length ? "Perfect Score! 🎉" : score > questions.length / 2 ? "Good Job! 👍" : "Keep Practicing! 💪"}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {questions.map((q, i) => (
                            <div key={i} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{i + 1}. {q.question}</p>
                                <p style={{
                                    color: answers[i] === q.correctAnswer ? '#166534' : '#991b1b',
                                    fontWeight: 500
                                }}>
                                    Your Answer: {answers[i] || "Skipped"}
                                    {answers[i] === q.correctAnswer ? " ✅" : " ❌"}
                                </p>
                                {answers[i] !== q.correctAnswer && (
                                    <p style={{ color: '#166534' }}>Correct Answer: {q.correctAnswer}</p>
                                )}
                                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                    Explanation: {q.explanation}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button
                            onClick={() => navigate('/dashboard/aptitude')}
                            style={{
                                background: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Back to Categories
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const q = questions[currentQ];

    return (
        <div className={styles.container}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: '#4c1d95' }}>{category} Test</h2>
                <span style={{ fontWeight: 600, color: '#6b7280' }}>Question {currentQ + 1} / {questions.length}</span>
            </header>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: 'white',
                padding: '3rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>{q.question}</h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {q.options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => handleOptionSelect(opt)}
                            style={{
                                padding: '1rem',
                                border: `2px solid ${answers[currentQ] === opt ? '#7c3aed' : '#e5e7eb'}`,
                                background: answers[currentQ] === opt ? '#f3e8ff' : 'white',
                                borderRadius: '0.5rem',
                                textAlign: 'left',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: '#1f2937'
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                        onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                        disabled={currentQ === 0}
                        style={{
                            background: '#f3f4f6',
                            color: '#4b5563',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            cursor: currentQ === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Previous
                    </button>

                    {currentQ === questions.length - 1 ? (
                        <button
                            onClick={calculateScore}
                            style={{
                                background: '#166534',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Submit Test
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
                            style={{
                                background: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AptitudeTest;
