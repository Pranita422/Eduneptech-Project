//ProgrammingLanguages.jsx
import { useState, useEffect } from "react";
import styles from "./ProgrammingLanguages.module.css";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import { useStreak } from "../context/StreakContext";
import TheoryContent from "../components/TheoryContent";

const languages = ["HTML", "JavaScript", "C", "C++", "Java", "Python", "CSS"];

const mockProblems = [
  { title: "Basics", difficulty: "Easy", completed: true },
  { title: "Syntax", difficulty: "Easy", completed: true },
  { title: "First Program", difficulty: "Medium", completed: true },
  { title: "Loops", difficulty: "Medium", completed: false },
  { title: "Advanced Concepts", difficulty: "Hard", completed: false }
];

export default function ProgrammingLanguages() {
  const [selectedLang, setSelectedLang] = useState("HTML");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
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
        const response = await axios.get(
          `http://localhost:5000/api/topics?language=${encodeURIComponent(selectedLang)}&search=${encodeURIComponent(debouncedSearch)}`
        );
        setTopics(response.data);
        // If we are searching, we might want to reset the active topic if it's no longer in the list
        // but for now let's just keep the logic simple
        setActiveTopic(null);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [selectedLang, debouncedSearch]);

  const filteredTopics = topics; // Now topics ARE filtered from backend

  // Determine current active topic (default to first if null)
  const currentTopic = activeTopic || (filteredTopics.length > 0 ? filteredTopics[0] : null);

  // Find index of current topic in filtered list
  const currentIndex = currentTopic ? filteredTopics.findIndex(t => t._id === currentTopic._id) : -1;
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
  const hasNext = currentIndex < filteredTopics.length - 1;

  const handleNext = () => {
    if (hasNext) {
      setActiveTopic(filteredTopics[currentIndex + 1]);
      updateStreak();
    }
  };

  const handlePrev = () => {
    if (hasPrev) setActiveTopic(filteredTopics[currentIndex - 1]);
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

  const completedProblems = mockProblems.filter(p => p.completed).length;
  const totalProblems = mockProblems.length;
  const progressPercentage = Math.round((completedProblems / totalProblems) * 100);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Programming Languages</h2>

        <hr className={styles.divider} />

        {/* LANGUAGE TABS */}
        <div className={styles.languageTabs}>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                setActiveTopic(null);
                setSearch(""); // Reset search on language switch for better UX
              }}
              className={`${styles.languageTab} ${selectedLang === lang ? styles.active : ""
                }`}
              aria-label={`Select ${lang}`}
              aria-pressed={selectedLang === lang}
            >
              <span>{lang}</span>
            </button>
          ))}
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
          ) : filteredTopics.length === 0 ? (
            <p className={styles.emptyTopics}>No topics found</p>
          ) : (
            <ul className={styles.topicsList}>
              {filteredTopics.map((topic) => (
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
                    content={currentTopic.theory}
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
              <span>📝</span> Problems
            </h3>
            <ul className={styles.problemsList}>
              {mockProblems.map((problem, idx) => (
                <li key={idx} className={styles.problemItem}>
                  <div className={styles.problemLeft}>
                    <span className={styles.checkIcon}>
                      {problem.completed ? "✓" : "○"}
                    </span>
                    {problem.title}
                  </div>
                  <span className={styles.difficultyBadge}>
                    {problem.difficulty}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.progressSummary}>
              <h4 className={styles.progressTitle}></h4>
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
    </div>
  );
}
