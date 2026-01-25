import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./RoadmapAptitude.module.css"; // Reusing styles

const RoadmapDashboard = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/roadmaps`);
                setRoadmaps(res.data);
            } catch (err) {
                console.error("Failed to fetch roadmaps", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    return (
        <div className={styles.container}>
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>←</button>
                <h1 className={styles.title} style={{ margin: 0, textAlign: 'left' }}>Learning Roadmaps</h1>
            </header>

            {loading ? (
                <p>Loading roadmaps...</p>
            ) : (
                <div className={styles.grid}>
                    {roadmaps.map((map) => (
                        <Link key={map._id} to={`/dashboard/roadmap/${map.slug}`} className={styles.card} style={{ minHeight: '200px' }}>
                            <div className={styles.cardIcon} style={{ fontSize: '2.5rem' }}>📍</div>
                            <h2 className={styles.cardTitle}>{map.title}</h2>
                            <p className={styles.cardDesc}>{map.description}</p>
                            <span style={{
                                marginTop: '1rem',
                                background: '#ede9fe',
                                color: '#7c3aed',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}>
                                {map.category}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoadmapDashboard;
