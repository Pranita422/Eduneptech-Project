//Sidebae.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeSection, setActiveSection, openSems, setOpenSems }) {
    const navigate = useNavigate();

    const toggleMenu = (menu) => {
        setOpenSems((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col min-h-screen sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <div className="flex-1 px-4 py-8 space-y-8">
                {/* Learning Hub Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Learning Hub</h3>

                    {/* Syllabus Menu */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleMenu("nepMenu")}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all group ${openSems.nepMenu ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-lg transition-transform group-hover:scale-110 ${openSems.nepMenu ? 'scale-110' : ''}`}>📚</span>
                                <span className="font-bold text-sm">Course Syllabus</span>
                            </div>
                            <span className={`text-[10px] transform transition-transform duration-300 ${openSems.nepMenu ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {openSems.nepMenu && (
                            <div className="ml-4 pl-4 border-l-2 border-indigo-100 space-y-1 py-1 animate-in slide-in-from-left-2 transition-all">
                                <button
                                    onClick={() => setActiveSection("nep")}
                                    className={`block w-full text-left px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeSection === "nep" ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"}`}
                                >
                                    Semester Roadmap
                                </button>
                                <button
                                    onClick={() => setActiveSection("nep-mcqs")}
                                    className={`block w-full text-left px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeSection === "nep-mcqs" ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"}`}
                                >
                                    NEP Assessments
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate("/programming-languages")}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 rounded-xl hover:bg-slate-50 transition-all group"
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">💻</span>
                        <span className="font-bold text-sm">Coding Library</span>
                    </button>
                </section>

                {/* Career Path Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Career Path</h3>

                    <div className="space-y-1">
                        <button
                            onClick={() => toggleMenu("roadmapMenu")}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all group ${openSems.roadmapMenu ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-lg transition-transform group-hover:scale-110 ${openSems.roadmapMenu ? 'scale-110' : ''}`}>🧭</span>
                                <span className="font-bold text-sm">Success Roadmaps</span>
                            </div>
                            <span className={`text-[10px] transform transition-transform duration-300 ${openSems.roadmapMenu ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {openSems.roadmapMenu && (
                            <div className="ml-4 pl-4 border-l-2 border-violet-100 space-y-1 py-1 animate-in slide-in-from-left-2">
                                <button
                                    onClick={() => navigate("/dashboard/aptitude")}
                                    className="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-500 rounded-lg hover:bg-slate-50 hover:text-violet-600 transition-colors"
                                >
                                    Aptitude Training
                                </button>
                                <button
                                    onClick={() => navigate("/dashboard/roadmaps")}
                                    className="block w-full text-left px-4 py-2 text-xs font-semibold text-slate-500 rounded-lg hover:bg-slate-50 hover:text-violet-600 transition-colors"
                                >
                                    Career Journeys
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Growth Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Your Growth</h3>

                    <button
                        onClick={() => {
                            setActiveSection("notes");
                            navigate("/dashboard");
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "notes" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">📝</span>
                        <span className="font-bold text-sm">Study Notes</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveSection("certificates");
                            navigate("/dashboard");
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "certificates" ? "bg-amber-50 text-amber-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">🏆</span>
                        <span className="font-bold text-sm">Certifications</span>
                    </button>

                    <button
                        onClick={() => setActiveSection("scorecard")}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "scorecard" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">📊</span>
                        <span className="font-bold text-sm">Performance</span>
                    </button>
                </section>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all active:translate-y-0">
                    <span className="text-base">⭐</span>
                    <span className="text-sm">Go Premium</span>
                </button>
                <div className="mt-4 px-2 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Eduneptech v2.0</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
