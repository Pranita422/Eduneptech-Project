//Sidebae.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeSection, setActiveSection, openSems, setOpenSems }) {
const navigate = useNavigate();

    const toggleMenu = (menu) => {
        setOpenSems((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <aside className="w-64 bg-white p-4 shadow-lg min-h-screen">
            <nav className="space-y-4 text-violet-700 font-medium">
                {/* NEP Syllabus expandable menu */}
                <div>
                    <button
                        onClick={() => toggleMenu("nepMenu")}
                        className="block hover:text-violet-900 cursor-pointer w-full text-left"
                    >
                        📚 Syllabus
                    </button>

                    {openSems.nepMenu && (
                        <div className="ml-6 mt-2 space-y-2 text-gray-700">
                            <button
                                onClick={() => setActiveSection("nep")}
                                className={`block hover:text-violet-900 cursor-pointer ${activeSection === "nep" ? "text-violet-900 font-bold" : ""
                                    }`}
                            >
                                ↳ Semester-wise Syllabus
                            </button>

                            <button
                                onClick={() => setActiveSection("nep-mcqs")}
                                className={`block hover:text-violet-900 cursor-pointer ${activeSection === "nep-mcqs" ? "text-violet-900 font-bold" : ""
                                    }`}
                            >
                                ↳ NEP Based MCQs
                            </button>
                        </div>
                    )}
                </div>

                {/* Programming Languages */}
                <button
    onClick={() => navigate("/programming-languages")}
    className="block hover:text-violet-900 cursor-pointer w-full text-left"
>
    💻 Programming Languages
</button>

                {/* Roadmap / Career expandable menu */}
                <div>
                    <button
                        onClick={() => toggleMenu("roadmapMenu")}
                        className="block hover:text-violet-900 cursor-pointer w-full text-left"
                    >
                        🧭 Roadmap / Career
                    </button>

                    {openSems.roadmapMenu && (
                        <div className="ml-6 mt-2 space-y-2 text-gray-700">
                            <button
                                onClick={() => setActiveSection("aptitude")}
                                className={`block hover:text-violet-900 ${activeSection === "aptitude" ? "text-violet-900 font-bold" : ""
                                    }`}
                            >
                                ↳ Aptitude
                            </button>
                            <button
                                onClick={() => setActiveSection("interview")}
                                className={`block hover:text-violet-900 ${activeSection === "interview" ? "text-violet-900 font-bold" : ""
                                    }`}
                            >
                                ↳ Interview Questions
                            </button>
                            <button
                                onClick={() => setActiveSection("web-roadmap")}
                                className={`block hover:text-violet-900 ${activeSection === "web-roadmap" ? "text-violet-900 font-bold" : ""
                                    }`}
                            >
                                ↳ Web Dev Roadmap
                            </button>
                        </div>
                    )}
                </div>

                {/* Upload Notes */}
                <button
                    onClick={() => setActiveSection("notes")}
                    className={`block hover:text-violet-900 w-full text-left ${activeSection === "notes" ? "text-violet-900 cursor-pointer font-bold" : ""
                        }`}
                >
                    📝 Upload Notes
                </button>

                {/* Upgrade Button */}
                <button className="block bg-violet-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 shadow-md hover:bg-violet-700 transition w-full">
                    ⭐ Upgrade
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;
