import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./RoadmapAptitude.module.css";

const AptitudeDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/aptitude/categories`);
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className={styles.container}>
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>←</button>
                <h1 className={styles.title} style={{ margin: 0, textAlign: 'left' }}>Aptitude Practice</h1>
            </header>

            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <div className={styles.grid}>
                    {categories.map((cat) => (
                        <Link key={cat} to={`/dashboard/aptitude/${cat}`} className={styles.card} style={{ minHeight: '200px' }}>
                            <div className={styles.cardIcon} style={{ fontSize: '2.5rem' }}>
                                {cat === 'Quantitative' ? '📐' : cat === 'Logical Reasoning' ? '🧩' : '📖'}
                            </div>
                            <h2 className={styles.cardTitle}>{cat}</h2>
                            <p className={styles.cardDesc}>
                                Take a practice test for {cat}.
                            </p>
                            <button style={{
                                marginTop: '1.5rem',
                                background: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}>
                                Start Test
                            </button>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AptitudeDashboard;
