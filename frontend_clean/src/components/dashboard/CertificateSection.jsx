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
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-7xl mx-auto px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                    Official Certifications
                </h2>
                <p className="text-slate-500 font-medium italic">Validate your expertise and build your professional portfolio</p>
            </div>

            {loading ? (
                <div className="py-24 text-center">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compiling Records...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {certificates.map((cert) => (
                        <div
                            key={cert.type}
                            className={`group relative rounded-[2.5rem] p-10 border transition-all duration-500 flex flex-col overflow-hidden ${cert.status === "LOCKED"
                                ? "bg-slate-50 border-slate-100 opacity-60"
                                : "bg-white border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2"
                                }`}
                        >
                            {/* Ornamental Backdrop */}
                            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${cert.status === 'LOCKED' ? 'bg-slate-200' : 'bg-indigo-400'}`}></div>

                            {/* Status Indicator */}
                            <div className="absolute top-10 right-10">
                                {cert.status === "LOCKED" && <span className="text-slate-300 font-black text-[10px] uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Secure</span>}
                                {cert.status === "UNLOCKED" && <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full animate-pulse">Claim Ready</span>}
                                {cert.status === "EARNED" && <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200"><span className="text-white text-xs">✓</span></div>}
                            </div>

                            <div className="mb-10 relative z-10">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-white transition-transform group-hover:scale-110 duration-500 ${cert.status === "LOCKED" ? "bg-slate-100 text-slate-400" : "bg-indigo-50 text-indigo-600"
                                    }`}>
                                    {cert.status === 'EARNED' ? '🎖️' : '📜'}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{cert.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{cert.description}</p>
                            </div>

                            {/* Progress or Status Label */}
                            <div className="mt-auto relative z-10">
                                {cert.status !== "EARNED" ? (
                                    <div className="mb-8">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Course Integrity</span>
                                            <span className="text-sm font-black text-slate-900">{Math.min(cert.progress, cert.target)}<span className="text-slate-300 mx-1">/</span>{cert.target}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-white">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${cert.status === "LOCKED" ? "bg-slate-300" : "bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.3)]"}`}
                                                style={{ width: `${Math.min((cert.progress / cert.target) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-8 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Verify ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                    </div>
                                )}

                                {/* Actions */}
                                {cert.status === "LOCKED" ? (
                                    <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] cursor-not-allowed">
                                        LOCKED NODE
                                    </button>
                                ) : cert.status === "UNLOCKED" ? (
                                    <button
                                        onClick={() => handleClaim(cert.type)}
                                        disabled={claiming === cert.type}
                                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98]"
                                    >
                                        {claiming === cert.type ? "VALIDATING..." : "REDEEM CREDENTIAL"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDownload(cert.type)}
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        <span className="text-base">📥</span> DOWNLOAD DATA
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
