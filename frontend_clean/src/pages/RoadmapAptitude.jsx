import React from "react";
import { Link } from "react-router-dom";
import styles from "./RoadmapAptitude.module.css";

const RoadmapAptitude = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Career & Skills</h1>

            <div className={styles.grid}>
                {/* Roadmaps Card */}
                <Link to="/roadmaps" className={styles.card}>
                    <div className={styles.cardIcon}>🗺️</div>
                    <h2 className={styles.cardTitle}>Learning Roadmaps</h2>
                    <p className={styles.cardDesc}>
                        Step-by-step guides for developer paths. Frontend, Backend, DSA, and more.
                    </p>
                </Link>

                {/* Aptitude Card */}
                <Link to="/aptitude" className={styles.card}>
                    <div className={styles.cardIcon}>🧠</div>
                    <h2 className={styles.cardTitle}>Aptitude Practice</h2>
                    <p className={styles.cardDesc}>
                        Prepare for placements and interviews. Quantitative, Logical, and Verbal reasoning.
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default RoadmapAptitude;
