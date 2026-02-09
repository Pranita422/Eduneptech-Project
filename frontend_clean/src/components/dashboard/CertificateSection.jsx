import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function CertificateSection() {
    const { currentUser } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(null);

    useEffect(() => {
        if (currentUser) {
            fetchCertificates();
        }
    }, [currentUser]);

    const fetchCertificates = async () => {
        try {
            const res = await API.get("/certificates");
            setCertificates(res.data);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (type) => {
        if (!currentUser) return;
        setClaiming(type);
        try {
            await API.post("/certificates/claim", { type });
            fetchCertificates(); // Refresh to show "EARNED"
            alert("Certificate Claimed! 🎉");
        } catch (err) {
            console.error("Claim failed", err);
            alert("Failed to claim certificate. " + (err.response?.data?.message || ""));
        } finally {
            setClaiming(null);
        }
    };

    const handleDownload = async (type) => {
        if (!currentUser) return;
        try {
            const res = await API.get(`/certificates/download/${type}`, {
                responseType: 'blob', // Important for PDF
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificate-${type}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Download failed", err);
            alert("Failed to download certificate.");
        }
    };

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Certifications</h2>

            {loading ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">Loading your certificates...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.length > 0 ? (
                        certificates.map((cert) => (
                            <div key={cert.type} className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col">
                                <div className="text-4xl mb-4 text-primary">
                                    {cert.status === 'EARNED' ? '🎖️' : '📜'}
                                </div>
                                <h3 className="text-lg font-bold text-text-primary mb-2">{cert.title}</h3>
                                <p className="text-text-muted text-sm mb-4 flex-grow">{cert.description}</p>

                                {cert.status !== "EARNED" ? (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs font-semibold text-text-muted mb-1">
                                            <span>Progress</span>
                                            <span>{Math.min(cert.progress, cert.target)}/{cert.target}</span>
                                        </div>
                                        <div className="w-full bg-surface-highlight rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((cert.progress / cert.target) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4 text-emerald-600 text-xs font-bold inline-flex items-center gap-1">
                                        <span>✓ Certificate Earned</span>
                                    </div>
                                )}

                                {cert.status === "LOCKED" ? (
                                    <button disabled className="w-full py-2 bg-surface-highlight text-text-muted rounded-lg font-bold text-xs uppercase cursor-not-allowed">
                                        Locked
                                    </button>
                                ) : cert.status === "UNLOCKED" ? (
                                    <button
                                        onClick={() => handleClaim(cert.type)}
                                        disabled={claiming === cert.type}
                                        className="w-full py-2 bg-primary text-white rounded-lg font-bold text-xs uppercase hover:bg-primary-fg transition"
                                    >
                                        {claiming === cert.type ? "Claiming..." : "Claim Certificate"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDownload(cert.type)}
                                        className="w-full py-2 bg-text-primary text-surface rounded-lg font-bold text-xs uppercase hover:bg-text-secondary transition flex items-center justify-center gap-2"
                                    >
                                        <span>📥</span> Download
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl">
                            <p className="text-text-muted">No certificates available yet. Start learning to earn them!</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default CertificateSection;
