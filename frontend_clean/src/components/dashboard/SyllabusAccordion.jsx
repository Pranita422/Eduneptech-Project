import React from "react";

function SyllabusAccordion({
    title,
    isOpen,
    onToggle,
    children,
    variant = "root",
    icon = null
}) {
    const styles = {
        root: "bg-white p-5 rounded-2xl shadow-lg mb-6",
        year: "bg-violet-50 p-4 rounded-xl",
        sem: "bg-white border rounded-xl p-4 shadow-sm",
        category: "border-l-4 border-gray-300 pl-4",
        subject: "ml-4 mt-3 text-gray-700",
        module: "ml-4 mt-2 text-sm text-gray-600"
    };

    const titleStyles = {
        root: "text-xl font-bold text-violet-700",
        year: "font-semibold text-lg text-violet-600",
        sem: "font-semibold text-violet-600",
        category: "font-semibold text-gray-800",
        subject: "font-medium",
        module: "font-semibold"
    };

    return (
        <div className={styles[variant]}>
            <div
                onClick={onToggle}
                className={`flex justify-between items-center cursor-pointer ${titleStyles[variant]}`}
            >
                <span>{icon} {title}</span>
                <span className="text-xl">{isOpen ? "−" : "+"}</span>
            </div>
            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    );
}

export default SyllabusAccordion;
