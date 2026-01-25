import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./RoadmapAptitude.module.css";

const RoadmapView = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/roadmaps/${slug}`);
                setRoadmap(res.data);
            } catch (err) {
                console.error("Failed to fetch roadmap", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [slug]);

    if (loading) return <div className={styles.container}>Loading roadmap...</div>;
    if (!roadmap) return <div className={styles.container}>Roadmap not found.</div>;

    return (
        <div className={styles.container}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <button onClick={() => navigate('/dashboard/roadmaps')} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', float: 'left', color: '#6b7280' }}>← Back</button>
                <div>
                    <h1 className={styles.title} style={{ margin: 0, fontSize: '2.5rem', color: '#4c1d95' }}>{roadmap.title}</h1>
                    <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '0.5rem' }}>{roadmap.description}</p>
                </div>
            </header>

            {/* Mind Map Container */}
            <div className={styles.mindMapContainer}>
                {/* Central Node */}
                <div className={styles.centralNode}>
                    <div className={styles.nodeContent}>
                        Start Here
                    </div>
                    <div className={styles.connectorVertical}></div>
                </div>

                {/* Steps */}
                <div className={styles.treeWrapper}>
                    {roadmap.steps.map((step, index) => (
                        <div key={index} className={styles.stepBlock}>
                            {/* Vertical Connector Line */}
                            {index > 0 && <div className={styles.connectorVertical}></div>}

                            <div className={styles.stepNode}>
                                <div className={styles.nodeIcon}>{index + 1}</div>
                                <div className={styles.nodeCard}>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>

                                    {step.resources.length > 0 && (
                                        <div className={styles.resourceTags}>
                                            {step.resources.map((res, i) => (
                                                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourcePill}>
                                                    {res.label} ↗
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Finish Node */}
                    <div className={styles.stepBlock}>
                        <div className={styles.connectorVertical}></div>
                        <div className={styles.centralNode} style={{ background: '#166534', borderColor: '#166534' }}>
                            <div className={styles.nodeContent} style={{ color: 'white' }}>
                                Mastery Achieved 🏆
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoadmapView;
