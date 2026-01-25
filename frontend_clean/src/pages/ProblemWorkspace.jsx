import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./ProblemWorkspace.module.css";

const ProblemWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState("description"); // "description" or "submissions"
    const [submissions, setSubmissions] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [viewCode, setViewCode] = useState(null); // stores code string to view

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/problems/${id}`);
                setProblem(res.data);
                // Default code template based on language
                if (res.data.language.toLowerCase() === "javascript") {
                    setCode(`/**\n * @param {any} input\n * @return {any}\n */\nconst solution = (input) => {\n    // Write your code here\n    \n};`);
                } else {
                    setCode(`// Solve the ${res.data.language} challenge here...`);
                }
            } catch (err) {
                console.error("Failed to fetch problem", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [id]);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const res = await axios.get(`${API_BASE_URL}/submissions?userId=${user.id || user._id}&problemId=${id}`);
            setSubmissions(res.data);
        } catch (err) {
            console.error("Failed to fetch history", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        if (activeTab === "submissions") {
            fetchHistory();
        }
    }, [activeTab]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setResult(null);
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                alert("Please login to submit code");
                return;
            }
            const user = JSON.parse(userStr);

            const res = await axios.post(`${API_BASE_URL}/submissions`, {
                userId: user.id || user._id,
                problemId: id,
                language: problem.language,
                code: code
            });
            setResult(res.data);
            if (activeTab === "submissions") fetchHistory();
        } catch (err) {
            console.error("Submission failed", err);
            setResult({ result: "Submission Error", message: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading workspace...</div>;
    if (!problem) return <div className={styles.error}>Problem not found</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/programming-languages" className={styles.backBtn}>
                    <span>←</span> Back to Problems
                </Link>
            </header>

            <main className={styles.main}>
                {/* LEFT PANE */}
                <div className={`${styles.pane} ${styles.problemPane}`}>
                    <div className={styles.paneHeader}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'description' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'submissions' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('submissions')}
                        >
                            Submissions
                        </button>
                    </div>

                    <div className={styles.paneContent}>
                        {activeTab === 'description' ? (
                            <>
                                <h1 className={styles.title}>{problem.title}</h1>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span className={`${styles.difficulty} ${styles[problem.difficulty]}`} style={{ marginBottom: 0 }}>
                                        {problem.difficulty}
                                    </span>
                                </div>

                                {problem.tags && (
                                    <div className={styles.tags}>
                                        {problem.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                                    </div>
                                )}

                                <div className={styles.description}>
                                    {problem.description}
                                </div>

                                <h3 className={styles.sectionTitle}>Examples</h3>
                                {problem.examples && problem.examples.map((ex, i) => (
                                    <div key={i} className={styles.example}>
                                        <strong>Example {i + 1}:</strong>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <strong>Input:</strong> {ex.input}<br />
                                            <strong>Output:</strong> {ex.output}
                                            {ex.explanation && <div><strong>Explanation:</strong> {ex.explanation}</div>}
                                        </div>
                                    </div>
                                ))}

                                {problem.constraints && problem.constraints.length > 0 && (
                                    <>
                                        <h3 className={styles.sectionTitle}>Constraints</h3>
                                        <ul className={styles.constraints}>
                                            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className={styles.submissionsTab}>
                                <h2 className={styles.sectionTitle}>Recent Submissions</h2>
                                {loadingHistory ? (
                                    <p>Loading history...</p>
                                ) : submissions.length === 0 ? (
                                    <p>No submissions yet.</p>
                                ) : (
                                    <ul className={styles.submissionsList}>
                                        {submissions.map((sub) => (
                                            <li key={sub._id} className={styles.submissionItem}>
                                                <div>
                                                    <span className={`${styles.subResult} ${styles[sub.result.replace(' ', '')]}`}>
                                                        {sub.result}
                                                    </span>
                                                    <div className={styles.subDate}>
                                                        {new Date(sub.timestamp).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className={styles.testsInfo}>
                                                    {sub.testCasesPassed} / {sub.totalTestCases}
                                                </div>
                                                <button
                                                    className={styles.viewBtn}
                                                    onClick={() => setViewCode(sub.code)}
                                                >
                                                    View Code
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANE: Code Editor */}
                <div className={`${styles.pane} ${styles.editorPane}`}>
                    <div className={styles.editorHeader}>
                        <span>{problem.language}</span>
                        <span>Editor</span>
                    </div>
                    <textarea
                        className={styles.codeArea}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your code here..."
                        spellCheck="false"
                    />
                    <footer className={styles.footer}>
                        <button
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Evaluating..." : "Submit Solution"}
                        </button>
                    </footer>
                </div>
            </main>

            {/* RESULTS PANEL */}
            <div className={`${styles.resultPanel} ${result ? styles.showResult : ""}`}>
                <div className={styles.resultHeader}>
                    <h2 className={`${styles.resultTitle} ${result?.result === 'Accepted' ? styles.Accepted : styles.WrongAnswer}`}>
                        {result?.result}
                    </h2>
                    <span className={styles.closeBtn} onClick={() => setResult(null)}>×</span>
                </div>
                {result && (
                    <div className={styles.resultBody}>
                        <p className={styles.testsInfo}>
                            Test Cases Passed: <strong>{result.testCasesPassed} / {result.totalTestCases}</strong>
                        </p>
                    </div>
                )}
            </div>

            {/* CODE VIEWER MODAL */}
            {viewCode && (
                <div className={styles.modalOverlay} onClick={() => setViewCode(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Submission Code</h3>
                            <button className={styles.closeBtn} onClick={() => setViewCode(null)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <pre><code>{viewCode}</code></pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProblemWorkspace;
