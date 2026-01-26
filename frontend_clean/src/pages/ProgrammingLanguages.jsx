import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProgrammingLanguages.module.css";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import { useStreak } from "../context/StreakContext";
import TheoryContent from "../components/TheoryContent";
import { BookOpen, Code2, CheckCircle2 } from "lucide-react";

const languages = ["HTML", "JavaScript", "C", "C++", "Java", "Python", "CSS"];

// No mock problems needed anymore as we fetch from database

export default function ProgrammingLanguages() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("HTML");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]); // Real problem data
  const [loading, setLoading] = useState(false);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [userProgress, setUserProgress] = useState({ html: 0, css: 0, javascript: 0 });

  // Fetch user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_BASE_URL}/progress/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.user) {
          setUserProgress(res.data.user.progress);
        }
      } catch (err) {
        console.error("Failed to fetch user progress", err);
      }
    };
    fetchUserProgress();
  }, [selectedLang]); // Refresh when language changes or on mount

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      // Reset active topic when search changes to show the first search result automatically
      if (search) {
        setActiveTopic(null);
      }
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        // Fetch ALL topics for the language to allow uninterrupted navigation
        const response = await axios.get(
          `${API_BASE_URL}/topics?language=${encodeURIComponent(selectedLang)}`
        );
        setTopics(response.data);
        // Reset active topic only when language changes
        setActiveTopic(null);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [selectedLang]); // Only refetch when language changes

  // Fetch problems for the selected language
  useEffect(() => {
    const fetchProblems = async () => {
      setLoadingProblems(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/problems?language=${encodeURIComponent(selectedLang)}`
        );
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setProblems([]);
      } finally {
        setLoadingProblems(false);
      }
    };

    fetchProblems();
  }, [selectedLang]);

  // Frontend filter for the sidebar display
  const sidebarTopics = topics.filter(t =>
    !debouncedSearch || t.topic.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Filtered languages for the top tabs
  const filteredLanguages = languages.filter(lang =>
    lang === selectedLang || !search || lang.toLowerCase().includes(search.toLowerCase())
  );

  // Determine current active topic
  // 1. Manually selected topic (activeTopic)
  // 2. First search result (if searching and results exist)
  // 3. First overall topic (if not searching or no search results)
  const currentTopic = activeTopic || (debouncedSearch && sidebarTopics.length > 0 ? sidebarTopics[0] : (topics.length > 0 ? topics[0] : null));

  // Use the FULL topics list for navigation logic so Prev/Next always work
  const currentIndex = currentTopic ? topics.findIndex(t => t._id === currentTopic._id) : -1;
  // Streak update function
  const { updateStreakActivity, streak, fetchStreak } = useStreak();
  useEffect(() => {
    fetchStreak();
  }, []);

  const updateStreak = async () => {
    try {
      if (currentTopic) {
        await updateStreakActivity(`Viewed topic: ${currentTopic.topic}`);
      }
    } catch (err) {
      console.error("Streak count update failed", err);
    }
  };


  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < topics.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setActiveTopic(topics[currentIndex + 1]);
      updateStreak();
    }
  };

  const handlePrev = () => {
    if (hasPrev) setActiveTopic(topics[currentIndex - 1]);
  };

  const toggleBookmark = (id) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarks(newBookmarks);
  };

  // Calculate overall language progress (mocked for now as we don't have completion status in DB)
  const completedCount = topics.filter(t => t.completed).length;
  const totalTopics = topics.length;
  const languageProgress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Real problem progress
  const progressPercentage = userProgress[selectedLang.toLowerCase()] || 0;

  return (
    <div className={styles.container}>
      {/* PROFESSIONAL HEADER */}
      <div className={styles.header}>
        <div className="mb-8">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 block">
            Guided Learning
          </span>
          <h1 className={styles.mainHeading}>Interactive Academy</h1>
          <div className="h-1.5 w-20 bg-indigo-600 rounded-full shadow-lg shadow-indigo-100"></div>
        </div>

        <div className={styles.languageTabs}>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                setActiveTopic(null);
                setSearch("");
              }}
              className={`${styles.languageTab} ${selectedLang === lang ? styles.active : ""}`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search concepts, tags, or syntax..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className={styles.grid}>
        {/* LEFT PANEL: NAVIGATION & PROGRESS */}
        <nav className={styles.topicsPanel}>
          <div className={styles.sidebarProgress}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>
                <BookOpen size={16} />
                {selectedLang} Tracks
              </span>
              <span className={styles.sidebarPercent}>{progressPercentage}%</span>
            </div>
            <div className={styles.sidebarProgressTrack}>
              <div
                className={styles.sidebarProgressFill}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {loading ? (
            <div className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Initializing...</div>
          ) : (
            <ul className={styles.topicsList}>
              {sidebarTopics.map((topic) => (
                <li
                  key={topic._id}
                  onClick={() => setActiveTopic(topic)}
                  className={`${styles.topicItem} ${currentTopic?._id === topic._id ? styles.active : ""}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate pr-2">{topic.topic}</span>
                    {bookmarks.has(topic._id) && <span className="text-indigo-400 text-xs">★</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* CENTER PANEL: THEORETICAL NODE */}
        <main className={styles.contentArea}>
          {currentTopic ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className={styles.contentControls}>
                <div className={styles.navButtons}>
                  <button onClick={handlePrev} disabled={!hasPrev} className={styles.navButton}>
                    ← PREVIOUS
                  </button>
                  <button onClick={handleNext} disabled={!hasNext} className={styles.navButton}>
                    NEXT →
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(currentTopic._id)}
                  className={`${styles.bookmarkBtn} ${bookmarks.has(currentTopic._id) ? styles.bookmarked : ''}`}
                >
                  {bookmarks.has(currentTopic._id) ? "★" : "☆"}
                </button>
              </div>

              <div className={styles.contentBody}>
                {contentLoading ? (
                  <div className="py-20 text-center text-slate-400 font-black uppercase tracking-widest text-xs animate-spin">Loading Data...</div>
                ) : (
                  <TheoryContent
                    content={currentTopic.content}
                    key={currentTopic._id}
                  />
                )}
              </div>

              <div className={`${styles.navButtons} ${styles.bottomNav}`}>
                <button onClick={handlePrev} disabled={!hasPrev} className={styles.navButton}>
                  BACK TO PREV
                </button>
                <button onClick={handleNext} disabled={!hasNext} className={styles.navButton}>
                  CONTINUE READING
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-40">
              <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-6">
                <span className="text-3xl grayscale opacity-30">📖</span>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Select a node to begin</p>
            </div>
          )}
        </main>

        {/* RIGHT PANEL: PERFORMANCE & CHALLENGES */}
        <div className={styles.rightPanel}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <span className="text-lg">🔥</span>
              Global Streak
            </h3>
            <div className="flex items-baseline gap-3">
              <div className={styles.streakCount}>{streak}</div>
              <span className="text-slate-400 font-black text-xs uppercase tracking-tighter">Days</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Code2 size={16} className="text-indigo-600" />
              Code Problems
            </h3>
            {loadingProblems ? (
              <div className="py-10 text-center text-slate-400 animate-pulse text-[10px] font-black uppercase tracking-widest">Scanning...</div>
            ) : (
              <ul className={styles.problemsList}>
                {problems.map((problem) => (
                  <li
                    key={problem._id}
                    className={styles.problemItem}
                    onClick={() => navigate(`/problem/${problem._id}`)}
                  >
                    <div className="flex items-center gap-3">
                      {problem.completed ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                      )}
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{problem.title}</span>
                    </div>
                    <span className={`${styles.difficultyBadge} ${styles[`difficulty${problem.difficulty}`]}`}>
                      {problem.difficulty}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
