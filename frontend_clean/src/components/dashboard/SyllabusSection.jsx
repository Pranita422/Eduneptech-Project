import React, { useState } from "react";
import SyllabusAccordion from "./SyllabusAccordion";

function SyllabusSection({ nepData }) {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderSubject = (sub, parentId, subIdx, isMajor) => {
        const subKey = `${parentId}-sub-${subIdx}`;
        const hasModules = isMajor && sub.modules && sub.modules.length > 0;

        return (
            <div key={subKey} className="ml-4 mt-3 text-text-secondary transition-colors">
                <div
                    onClick={() => hasModules && toggleItem(subKey)}
                    className={`flex justify-between items-center ${hasModules ? "cursor-pointer font-bold" : "cursor-default font-medium"}`}
                >
                    <span className={hasModules ? "text-primary" : ""}>
                        {sub.code ? <span className="text-[10px] opacity-60 mr-1">{sub.code}</span> : ""}
                        {sub.name}
                    </span>
                    {hasModules && (
                        <span className="text-xl leading-none">{openItems[subKey] ? "−" : "+"}</span>
                    )}
                </div>

                {hasModules && openItems[subKey] && sub.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="ml-4 mt-3 p-4 bg-surface-highlight/50 rounded-2xl border border-border animate-in slide-in-from-top-2 duration-300">
                        <div className="font-black text-xs uppercase tracking-widest text-text-muted mb-2">{mod.title}</div>
                        <ul className="space-y-2">
                            {mod.topics?.map((topic, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2 text-sm font-medium text-text-secondary">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"></span>
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    const renderCategories = (categories, parentId) => (
        <div className="mt-4 ml-2 space-y-4">
            {categories.map((cat, cIdx) => {
                const catKey = `${parentId}-cat-${cIdx}`;
                return (
                    <div key={catKey} className="border-l-2 border-border pl-4 py-1">
                        <div
                            onClick={() => toggleItem(catKey)}
                            className="font-black text-[10px] uppercase tracking-[0.2em] text-text-muted cursor-pointer flex justify-between items-center hover:text-primary transition-colors"
                        >
                            {cat.categoryName}
                            <span className="text-lg">{openItems[catKey] ? "−" : "+"}</span>
                        </div>
                        {openItems[catKey] && (
                            <div className="animate-in fade-in duration-300">
                                {cat.subjects?.map((sub, sIdx) =>
                                    renderSubject(sub, catKey, sIdx, cat.categoryName === "Major Courses")
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    const renderSemesters = (sems, parentId) => (
        <div className="mt-4 space-y-4">
            {sems.map((sem, sIdx) => {
                const semKey = `${parentId}-sem-${sIdx}`;
                const isOpen = openItems[semKey];
                return (
                    <div key={semKey} className={`bg-surface border ${isOpen ? 'border-primary/20 ring-4 ring-primary/5' : 'border-border'} rounded-[2rem] p-6 transition-all duration-300 hover:shadow-lg shadow-slate-100 dark:shadow-none`}>
                        <div
                            onClick={() => toggleItem(semKey)}
                            className={`flex justify-between items-center cursor-pointer font-black text-sm uppercase tracking-widest ${isOpen ? 'text-primary' : 'text-text-secondary'}`}
                        >
                            {sem.semester}
                            <span className="text-2xl">{isOpen ? "−" : "+"}</span>
                        </div>
                        {isOpen && <div className="animate-in slide-in-from-top-4 duration-500">{renderCategories(sem.categories || [], semKey)}</div>}
                    </div>
                );
            })}
        </div>
    );

    const renderYear = (yearData, courseId) => {
        const yearKey = `${courseId}-${yearData._id || yearData.year}`;
        const isOpen = openItems[yearKey];
        return (
            <div key={yearKey} className={`rounded-[2.5rem] mb-6 transition-all duration-500 ${isOpen ? 'bg-primary/5 p-8 ring-1 ring-primary/10' : 'bg-surface-highlight/40 p-6'}`}>
                <div
                    onClick={() => toggleItem(yearKey)}
                    className={`flex justify-between items-center cursor-pointer font-black text-xl tracking-tight ${isOpen ? 'text-primary' : 'text-text-primary hover:text-primary'}`}
                >
                    {yearData.year}
                    <span className="text-3xl leading-none">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <div className="animate-in slide-in-from-left-4 duration-500">{renderSemesters(yearData.sems || [], yearKey)}</div>}
            </div>
        );
    };

    const renderCourseSection = (courseName, filterFn, sectionId) => {
        const courses = nepData.filter(filterFn);
        if (courses.length === 0) return null;
        const isOpen = openItems[sectionId];

        return (
            <div className={`bg-surface p-8 rounded-[3rem] shadow-xl shadow-slate-100 dark:shadow-none border ${isOpen ? 'border-primary/20' : 'border-border'} mb-8 transition-all duration-500`}>
                <div
                    onClick={() => toggleItem(sectionId)}
                    className="flex justify-between items-center cursor-pointer group"
                >
                    <h3 className={`text-2xl font-black tracking-tighter transition-colors ${isOpen ? 'text-primary' : 'text-text-primary group-hover:text-primary'}`}>{courseName}</h3>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all ${isOpen ? 'bg-primary text-white rotate-0' : 'bg-surface-highlight text-text-muted rotate-90'}`}>
                        {isOpen ? "−" : "+"}
                    </div>
                </div>
                {isOpen && (
                    <div className="mt-10 space-y-6 animate-in zoom-in-95 duration-700">
                        {courses.map(course => {
                            if (course.sems && !course.year) {
                                return renderSemesters(course.sems, sectionId);
                            }
                            if (course.semesters) {
                                return course.semesters.map(yData => renderYear(yData, sectionId));
                            }
                            return renderYear(course, sectionId);
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="max-w-5xl mx-auto py-10">
            <header className="mb-12 flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-1000">
                <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-2xl shadow-xl shadow-primary/20">📚</div>
                <div>
                    <h2 className="text-3xl font-black text-text-primary tracking-tighter uppercase transition-colors">
                        Syllabus Explorer
                    </h2>
                    <p className="text-text-muted font-medium text-sm">Comprehensive guide to YOUR academic journey.</p>
                </div>
            </header>

            {renderCourseSection(
                "B.Sc Information Technology",
                (y) => y.course === "B.Sc Information Technology",
                "bsc-it"
            )}

            {renderCourseSection(
                "B.Sc Computer Science",
                (y) => y.course === "B.Sc Computer Science",
                "bsc-cs"
            )}

            {renderCourseSection(
                "B.Sc Data Science",
                (y) =>
                    y.course === "B.Sc Data Science" ||
                    y.program?.includes("B.Sc. Data Science") ||
                    y.program === "B.Sc Data Science",
                "bsc-ds"
            )}
        </section>
    );
}

export default SyllabusSection;
