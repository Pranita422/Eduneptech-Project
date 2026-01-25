import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../data/dashboardData";

function CertificateSection() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(null);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/certificates`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCertificates(res.data);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (type) => {
        setClaiming(type);
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${API_BASE_URL}/certificates/claim`, { type }, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_BASE_URL}/certificates/download/${type}`, {
                headers: { Authorization: `Bearer ${token}` },
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
        <section className="animate-in zoom-in duration-500 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-violet-800 border-b-2 border-violet-100 pb-2">
                🏆 Achievements & Certificates
            </h2>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading achievements...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                        <div
                            key={cert.type}
                            className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${cert.status === "LOCKED"
                                    ? "bg-gray-50 border-gray-200 opacity-80 grayscale"
                                    : "bg-white border-violet-100 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                }`}
                        >
                            {/* Status Badge */}
                            <div className="absolute top-6 right-6">
                                {cert.status === "LOCKED" && <span className="text-2xl">🔒</span>}
                                {cert.status === "UNLOCKED" && <span className="text-2xl animate-bounce">🔓</span>}
                                {cert.status === "EARNED" && <span className="text-2xl">✅</span>}
                            </div>

                            <div className="mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 ${cert.status === "LOCKED" ? "bg-gray-200" : "bg-violet-100"
                                    }`}>
                                    📜
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                                <p className="text-sm text-gray-500">{cert.description}</p>
                            </div>

                            {/* Progress Bar */}
                            {cert.status !== "EARNED" && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span>{Math.min(cert.progress, cert.target)} / {cert.target}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full ${cert.status === "LOCKED" ? "bg-gray-400" : "bg-violet-600"}`}
                                            style={{ width: `${Math.min((cert.progress / cert.target) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="mt-auto">
                                {cert.status === "LOCKED" ? (
                                    <button disabled className="w-full py-3 bg-gray-200 text-gray-400 rounded-xl font-bold text-sm cursor-not-allowed">
                                        Locked
                                    </button>
                                ) : cert.status === "UNLOCKED" ? (
                                    <button
                                        onClick={() => handleClaim(cert.type)}
                                        disabled={claiming === cert.type}
                                        className="w-full py-3 bg-violet-600 text-white rounded-xl font-bold text-sm hover:bg-violet-700 transition-colors shadow-lg hover:shadow-violet-200"
                                    >
                                        {claiming === cert.type ? "Claiming..." : "Claim Certificate"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDownload(cert.type)}
                                        className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
                                    >
                                        <span>⬇️</span> Download PDF
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CertificateSection;
