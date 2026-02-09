import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useStreak } from "../context/StreakContext";
import styles from "./ProblemWorkspace.module.css";

const ProblemWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { refreshStreak } = useStreak();
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
                const res = await API.get(`/problems/${id}`);
                setProblem(res.data);
                // Default code template based on language
                if (res.data.language.toLowerCase() === "javascript") {
                    setCode(`function solution(input) {\n    // Write your code here\n    \n}`);
                } else if (res.data.language.toLowerCase() === "html") {
                    setCode(`<!-- Create your HTML solution here -->\n\n`);
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
            // rely on token for user ID
            const res = await API.get(`/submissions?problemId=${id}`);
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
                setSubmitting(false);
                return;
            }
            const user = JSON.parse(userStr);
            const userId = user.id || user._id;

            if (!userId) {
                setResult({
                    result: "Submission Error",
                    message: "User identity missing. Please logout and login again.",
                    totalTestCases: 0,
                    testCasesPassed: 0
                });
                setSubmitting(false);
                return;
            }

            console.log("[Frontend] Submitting with payload:", {
                userId,
                problemId: id,
                language: problem.language,
                code: code.substring(0, 50) + "..."
            });

            const res = await API.post(`/submissions`, {
                userId,
                problemId: id,
                language: problem.language,
                code: code
            });

            console.log("[Frontend] Submission Response:", res.data);
            setResult(res.data);

            // Refresh streak if problem was accepted
            if (res.data.result === "Accepted") {
                await refreshStreak();
                console.log("[Frontend] Streak refreshed after successful submission");
            }

            if (activeTab === "submissions") fetchHistory();
        } catch (err) {
            console.error("[Frontend] Submission Error Details:", err);
            console.error("[Frontend] Error Response:", err.response?.data);

            // If the error response has data, it might be our custom 500 error
            if (err.response && err.response.data) {
                setResult({
                    result: err.response.data.result || "Submission Error",
                    message: err.response.data.message || "An unexpected error occurred on the server.",
                    totalTestCases: 0,
                    testCasesPassed: 0
                });
            } else {
                // Network or other client-side errors
                setResult({
                    result: "Network Error",
                    message: "Could not reach the server. Please check your connection.",
                    totalTestCases: 0,
                    testCasesPassed: 0
                });
            }
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
                    <span className="text-xl">←</span>
                    <span>Back to Programming Languages</span>
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace v1.2</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-white text-xs font-bold">E</span>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                {/* LEFT PANE */}
                <div className={`${styles.pane} ${styles.problemPane}`}>
                    <div className={styles.paneHeader}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'description' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Challenge
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'submissions' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('submissions')}
                        >
                            History
                        </button>
                    </div>

                    <div className={styles.paneContent}>
                        {activeTab === 'description' ? (
                            <>
                                <h1 className={styles.title}>{problem.title}</h1>
                                <div>
                                    <span className={`${styles.difficulty} ${styles[problem.difficulty]}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>

                                {problem.tags && (
                                    <div className={styles.tags}>
                                        {problem.tags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
                                    </div>
                                )}

                                <div className={styles.description}>
                                    {problem.description}
                                </div>

                                <h3 className={styles.sectionTitle}>Input/Output Examples</h3>
                                {problem.examples && problem.examples.map((ex, i) => (
                                    <div key={i} className={styles.example}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-5 h-5 rounded bg-surface-highlight flex items-center justify-center text-[10px] font-bold text-text-muted">{i + 1}</div>
                                            <span className="text-xs font-black text-text-primary uppercase">Case {i + 1}</span>
                                        </div>
                                        <div className="space-y-2 text-sm font-medium">
                                            <div className="flex gap-2"><span className="text-text-secondary w-16 invisible lg:visible">Input</span> <code className="bg-surface-highlight px-2 py-1 rounded text-primary">{ex.input}</code></div>
                                            <div className="flex gap-2"><span className="text-text-secondary w-16 invisible lg:visible">Output</span> <code className="bg-surface-highlight px-2 py-1 rounded text-emerald-500">{ex.output}</code></div>
                                            {ex.explanation && <div className="mt-3 pt-3 border-t border-border text-text-muted italic text-xs">Note: {ex.explanation}</div>}
                                        </div>
                                    </div>
                                ))}

                                {problem.constraints && problem.constraints.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className={styles.sectionTitle}>Constraints</h3>
                                        <ul className="space-y-2">
                                            {problem.constraints.map((c, i) => (
                                                <li key={i} className="flex gap-2 text-sm font-medium text-text-secondary">
                                                    <span className="text-primary">•</span> {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.submissionsTab}>
                                <h2 className={styles.sectionTitle}>Recent Submissions</h2>
                                {loadingHistory ? (
                                    <div className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing...</div>
                                ) : submissions.length === 0 ? (
                                    <div className="py-10 text-center">
                                        <p className="text-slate-300 font-black italic">NO RECORDS FOUND</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {submissions.map((sub) => (
                                            <div key={sub._id} className={styles.submissionItem}>
                                                <div>
                                                    <span className={`${styles.subResult} ${sub.result === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {sub.result}
                                                    </span>
                                                    <div className={styles.subDate}>
                                                        {new Date(sub.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="text-[10px] font-black text-slate-400 flex gap-2">
                                                        <span>PASSED:</span>
                                                        <span className="text-slate-900">{sub.testCasesPassed}/{sub.totalTestCases}</span>
                                                    </div>
                                                    <button
                                                        className={styles.viewBtn}
                                                        onClick={() => setViewCode(sub.code)}
                                                    >
                                                        REPLAY CODE
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANE: Code Editor */}
                <div className={`${styles.pane} ${styles.editorPane}`}>
                    <div className={styles.editorHeader}>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span>{problem.language} KERNEL</span>
                        </div>
                        <span className="opacity-40">READY</span>
                    </div>
                    <textarea
                        className={styles.codeArea}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Assemble your logic here..."
                        spellCheck="false"
                    />
                    <footer className={styles.footer}>
                        <button
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "VERIFYING..." : "DEPLOY SOLUTION"}
                        </button>
                    </footer>
                </div>
            </main>

            {/* RESULTS PANEL */}
            <div className={`${styles.resultPanel} ${result ? styles.showResult : ""}`}>
                <div className={styles.resultHeader}>
                    <h2 className={`${styles.resultTitle} ${result?.result === 'Accepted' ? styles.Accepted : styles.WrongAnswer}`}>
                        {result?.result === 'Accepted' ? 'EXECUTION SUCCESS' : (result?.result || 'EXECUTION FAILED')}
                    </h2>
                    <span className={styles.closeBtn} onClick={() => setResult(null)}>×</span>
                </div>
                {result && (
                    <div className={styles.resultBody}>
                        {result.result === 'Accepted' ? (
                            <div className="space-y-2">
                                <p className={styles.testsInfo}>
                                    INTEGRITY CHECK: <strong>{result.testCasesPassed} / {result.totalTestCases} PASSED</strong>
                                </p>
                                <p className="text-[10px] text-emerald-600 font-bold uppercase">Solution saved to repository</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {result.message && (
                                    <p className="text-rose-400 text-xs font-mono bg-slate-50 p-2 rounded border border-rose-100">
                                        DEBUG: {result.message}
                                    </p>
                                )}
                                <p className={styles.testsInfo}>
                                    Test Cases Passed: <strong>{(result.testCasesPassed ?? 0)} / {(result.totalTestCases ?? 0)}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* CODE VIEWER MODAL */}
            {viewCode && (
                <div className={styles.modalOverlay} onClick={() => setViewCode(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className="text-sm font-black text-white tracking-widest uppercase">Archive Node</h3>
                            <button className="text-white opacity-40 hover:opacity-100 text-2xl" onClick={() => setViewCode(null)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <pre className="text-emerald-400 font-mono text-sm leading-relaxed"><code>{viewCode}</code></pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProblemWorkspace;
