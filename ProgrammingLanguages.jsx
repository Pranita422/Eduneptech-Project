//ProgrammingLanguages.jsx
//import { useState } from "react";
import { useState, useEffect } from "react";

import styles from "./ProgrammingLanguages.module.css";
//import { htmlData } from "../data/htmlData";

const languages = ["HTML", "JavaScript", "C", "C++", "Java", "Python", "CSS"];



// Mock problems data
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
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState(new Set());
//const [topics, setTopics] = useState([]);
//const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/topics?language=${encodeURIComponent(selectedLang)}`
      );
      const data = await res.json();
      setTopics(data);
      setActiveTopic(null); // reset topic on language change
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTopics();
}, [selectedLang]);

  const filteredTopics = topics.filter((t) =>
    t.topic.toLowerCase().includes(search.toLowerCase())
  );
  
   const currentTopic =
    activeTopic || (filteredTopics.length > 0 ? filteredTopics[0] : null);

const currentIndex = currentTopic
    ? filteredTopics.findIndex((t) => t._id === currentTopic._id)
    : -1;

     const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filteredTopics.length - 1;

  const handleNext = () => {
    if (hasNext) setActiveTopic(filteredTopics[currentIndex + 1]);
  };

  const handlePrev = () => {
    if (hasPrev) setActiveTopic(filteredTopics[currentIndex - 1]);
  };

  const toggleBookmark = (title) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(title)) {
      newBookmarks.delete(title);
    } else {
      newBookmarks.add(title);
    }
    setBookmarks(newBookmarks);
  };

  // Calculate overall language progress
  //const allTopics = data[selectedLang]?.topics || [];
  const allTopics = topics;

  const completedTopics = allTopics.filter(topic => topic.completed).length;
  const totalTopics = allTopics.length;
  const languageProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

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
              className={`${styles.languageTab} ${
                selectedLang === lang ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedLang(lang);
                setSearch("");
                setActiveTopic(null);
              }}
            >
              {lang}
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
        <nav className={styles.topicsPanel}>
          <h3 className={styles.panelTitle}>📚 {selectedLang} Tutorial</h3>

          {loading ? (
            <p>Loading...</p>
          ) : filteredTopics.length === 0 ? (
            <p>No topics found</p>
          ) : (
            <ul className={styles.topicsList}>
              {filteredTopics.map((topic) => (
                <li
                  key={topic._id}
                  className={`${styles.topicItem} ${
                    currentTopic?._id === topic._id ? styles.active : ""
                  }`}
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic.order}. {topic.topic}
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

             <h2 className={styles.contentTitle}>
  {currentTopic.topic}
</h2>

<div className={styles.contentBody}>
  {currentTopic.theory
    ?.split("\n\n")
    .map((paragraph, idx) => (
      <p key={idx}>{paragraph}</p>
    ))}
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
            <div className={styles.streakCount}>7</div>
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