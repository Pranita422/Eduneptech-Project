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
            <div key={subKey} className="ml-4 mt-3 text-gray-700">
                <div
                    onClick={() => hasModules && toggleItem(subKey)}
                    className={`flex justify-between items-center ${hasModules ? "cursor-pointer font-medium" : "cursor-default font-medium"}`}
                >
                    <span>
                        {sub.code ? `${sub.code} – ` : ""}
                        {sub.name}
                    </span>
                    {hasModules && (
                        <span>{openItems[subKey] ? "−" : "+"}</span>
                    )}
                </div>

                {hasModules && openItems[subKey] && sub.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="ml-4 mt-2 text-sm text-gray-600">
                        <div className="font-semibold">{mod.title}</div>
                        <ul className="list-disc ml-6 mt-1">
                            {mod.topics?.map((topic, tIdx) => (
                                <li key={tIdx}>{topic}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    const renderCategories = (categories, parentId) => (
        <div className="mt-4 ml-4 space-y-4">
            {categories.map((cat, cIdx) => {
                const catKey = `${parentId}-cat-${cIdx}`;
                return (
                    <div key={catKey} className="border-l-4 border-gray-300 pl-4">
                        <div
                            onClick={() => toggleItem(catKey)}
                            className="font-semibold text-gray-800 cursor-pointer flex justify-between"
                        >
                            {cat.categoryName}
                            <span>{openItems[catKey] ? "−" : "+"}</span>
                        </div>
                        {openItems[catKey] && cat.subjects?.map((sub, sIdx) =>
                            renderSubject(sub, catKey, sIdx, cat.categoryName === "Major Courses")
                        )}
                    </div>
                );
            })}
        </div>
    );

    const renderSemesters = (sems, parentId) => (
        <div className="mt-4 ml-4 space-y-4">
            {sems.map((sem, sIdx) => {
                const semKey = `${parentId}-sem-${sIdx}`;
                return (
                    <div key={semKey} className="bg-white border rounded-xl p-4 shadow-sm">
                        <div
                            onClick={() => toggleItem(semKey)}
                            className="flex justify-between cursor-pointer font-semibold text-violet-600"
                        >
                            {sem.semester}
                            <span>{openItems[semKey] ? "−" : "+"}</span>
                        </div>
                        {openItems[semKey] && renderCategories(sem.categories || [], semKey)}
                    </div>
                );
            })}
        </div>
    );

    const renderYear = (yearData, courseId) => {
        const yearKey = `${courseId}-${yearData._id || yearData.year}`;
        return (
            <div key={yearKey} className="bg-violet-50 p-4 rounded-xl mb-5">
                <div
                    onClick={() => toggleItem(yearKey)}
                    className="flex justify-between cursor-pointer font-semibold text-lg text-violet-600"
                >
                    {yearData.year}
                    <span>{openItems[yearKey] ? "−" : "+"}</span>
                </div>
                {openItems[yearKey] && renderSemesters(yearData.sems || [], yearKey)}
            </div>
        );
    };

    const renderCourseSection = (courseName, filterFn, sectionId) => {
        const courses = nepData.filter(filterFn);
        if (courses.length === 0) return null;

        return (
            <div className="bg-white p-5 rounded-2xl shadow-lg mb-6">
                <div
                    onClick={() => toggleItem(sectionId)}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h3 className="text-xl font-bold text-violet-700">{courseName}</h3>
                    <span className="text-xl">{openItems[sectionId] ? "−" : "+"}</span>
                </div>
                {openItems[sectionId] && (
                    <div className="mt-6 space-y-5 ml-4 border-l-2 border-violet-200 pl-4">
                        {courses.map(course => {
                            if (course.sems && !course.year) { // Case for root containers if any
                                return renderSemesters(course.sems, sectionId);
                            }
                            // Normal year-based entries
                            if (course.semesters) { // DS standard nested structure
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
        <section>
            <h2 className="text-2xl font-semibold mb-6 text-violet-700">
                📚 SYLLABUS
            </h2>

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
