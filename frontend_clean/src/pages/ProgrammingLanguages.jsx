import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProgrammingLanguages.module.css";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import { useStreak } from "../context/StreakContext";
import TheoryContent from "../components/TheoryContent";

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

  // Real problem progress (mocked for now as we don't have user-problem completion logic yet)
  const completedProblems = problems.filter(p => p.completed).length;
  const totalProblems = problems.length;
  const progressPercentage = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Programming Languages</h2>
        <hr className={styles.divider} />

        {/* LANGUAGE TABS */}
        <div className={styles.languageTabs}>
          {filteredLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                setActiveTopic(null);
                setSearch(""); // Clear search to show topics of the selected language
              }}
              className={`${styles.languageTab} ${selectedLang === lang ? styles.active : ""
                }`}
              aria-label={`Select ${lang}`}
              aria-pressed={selectedLang === lang}
            >
              <span>{lang}</span>
            </button>
          ))}
          {filteredLanguages.length === 0 && sidebarTopics.length === 0 && search && (
            <p className={styles.noLanguageMatch}>No matching results found</p>
          )}
        </div>

        {/* SEARCH */}
        <div className={styles.searchSection}>
          <h1 className={styles.mainHeading}>Learn to Code</h1>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              aria-label="Search topics"
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.grid}>
        {/* LEFT TOPICS PANEL - Side Navigation */}
        <nav className={styles.topicsPanel} aria-label="Topics Sidebar">
          <h3 className={styles.panelTitle}>
            <span>📚</span> {selectedLang} Tutorial
          </h3>
          {loading ? (
            <p className={styles.loadingTopics}>Loading topics...</p>
          ) : sidebarTopics.length === 0 ? (
            <p className={styles.emptyTopics}>No topics found</p>
          ) : (
            <ul className={styles.topicsList}>
              {sidebarTopics.map((topic) => (
                <li
                  key={topic._id}
                  onClick={() => setActiveTopic(topic)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveTopic(topic);
                    }
                  }}
                  className={`${styles.topicItem} ${currentTopic?._id === topic._id ? styles.active : ""
                    }`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={currentTopic?._id === topic._id}
                  aria-current={currentTopic?._id === topic._id ? "page" : undefined}
                >
                  <div className={styles.topicTitleContent}>
                    {topic.topic}
                    {bookmarks.has(topic._id) && <span className={styles.bookmarkBadge} title="Bookmarked">★</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* CENTER CONTENT AREA */}
        <main className={styles.contentArea}>
          {currentTopic ? (
            <>
              {/* Top Navigation & Actions */}
              <div className={styles.contentControls}>
                <div className={styles.navButtons}>
                  <button
                    onClick={handlePrev}
                    disabled={!hasPrev}
                    className={styles.navButton}
                    aria-label="Previous Topic"
                  >
                    ❮ Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!hasNext}
                    className={styles.navButton}
                    aria-label="Next Topic"
                  >
                    Next ❯
                  </button>
                </div>

                <button
                  onClick={() => toggleBookmark(currentTopic._id)}
                  className={`${styles.bookmarkBtn} ${bookmarks.has(currentTopic._id) ? styles.bookmarked : ''}`}
                  aria-label={bookmarks.has(currentTopic._id) ? "Remove Bookmark" : "Add Bookmark"}
                  title="Bookmark this topic"
                >
                  {bookmarks.has(currentTopic._id) ? "★" : "☆"}
                </button>
              </div>

              <h2 className={styles.contentTitle}>{currentTopic.topic}</h2>

              <div className={styles.contentBody}>
                {contentLoading ? (
                  <div className={styles.contentLoading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading content...</p>
                  </div>
                ) : (
                  <TheoryContent
                    content={currentTopic.content}
                    key={currentTopic._id}
                  />
                )}
              </div>

              <hr className={styles.contentDivider} />

              {/* Bottom Navigation */}
              <div className={`${styles.navButtons} ${styles.bottomNav}`}>
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className={styles.navButton}
                  aria-label="Previous Topic"
                >
                  ❮ Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className={styles.navButton}
                  aria-label="Next Topic"
                >
                  Next ❯
                </button>
              </div>

            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>👈</div>
              <p>Select a topic to start learning</p>
            </div>
          )}
        </main>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          {/* STREAK CARD */}
          <div className={`${styles.card} ${styles.streakCard}`}>
            <h3 className={styles.cardTitle}>
              <span className={styles.streakIcon}>🔥</span>
              Streak
            </h3>
            <div className={styles.streakCount}>{streak}</div>
            <div className={styles.streakSubtitle}>Days in a row! Keep going!</div>
          </div>


          {/* OVERALL PROGRESS CARD */}
          <div className={`${styles.card} ${styles.progressCard}`}>
            <div className={styles.progressOverview}>
              <h4 className={styles.progressTitle}>{selectedLang} Learning Progress</h4>
              <div className={styles.overallProgressTrack}>
                <div
                  className={styles.overallProgressFill}
                  style={{ width: `${languageProgress}%` }}
                  role="progressbar"
                  aria-valuenow={languageProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${selectedLang} learning progress`}
                />
              </div>


            </div>
          </div>

          {/* PROBLEMS CARD */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <span>📝</span> Coding Problems
            </h3>
            {loadingProblems ? (
              <p className={styles.loadingTopics}>Loading problems...</p>
            ) : problems.length === 0 ? (
              <p className={styles.emptyTopics}>No problems available yet</p>
            ) : (
              <ul className={styles.problemsList}>
                {problems.map((problem) => (
                  <li
                    key={problem._id}
                    className={styles.problemItem}
                    title={problem.description}
                    onClick={() => navigate(`/problem/${problem._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.problemLeft}>
                      <span className={styles.checkIcon}>
                        {problem.completed ? "✓" : "○"}
                      </span>
                      {problem.title}
                    </div>
                    <span className={`${styles.difficultyBadge} ${styles[`difficulty${problem.difficulty}`]}`}>
                      {problem.difficulty}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.progressSummary}>
              <h4 className={styles.progressTitle}>Language Mastery</h4>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
