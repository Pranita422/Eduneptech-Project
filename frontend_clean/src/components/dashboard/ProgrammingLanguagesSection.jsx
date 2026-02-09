import React from "react";

const languages = [
    {
        name: "C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        description: "The foundations of modern programming, procedural and powerful.",
        color: "blue-600"
    },
    {
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        description: "Versatile language for system/software development and performance.",
        color: "blue-700"
    },
    {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        description: "Object-oriented, platform-independent, and robust.",
        color: "orange-600"
    },
    {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        description: "High-level, readable, and widely used in AI and data science.",
        color: "yellow-500"
    },
    {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        description: "Responsive and dynamic language for the modern web.",
        color: "yellow-400"
    },
    {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Library for building component-based user interfaces.",
        color: "cyan-500"
    }
];

function ProgrammingLanguagesSection() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-text-primary tracking-tight mb-2">
                    Interactive Coding Library
                </h2>
                <p className="text-text-muted font-medium">Select a language to begin your guided learning path</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {languages.map((lang, index) => (
                    <div
                        key={index}
                        className="group relative bg-surface rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-border flex flex-col items-center text-center overflow-hidden hover:-translate-y-2 cursor-pointer"
                    >
                        {/* Gradient Backdrop Mask */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="w-24 h-24 mb-8 relative">
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-surface-highlight rounded-full scale-0 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
                            <img src={lang.icon} alt={lang.name} className="w-full h-full object-contain relative z-10 filter group-hover:drop-shadow-xl transition-all duration-500" />
                        </div>

                        <h3 className="text-2xl font-black text-text-primary mb-4 group-hover:text-primary transition-colors">
                            {lang.name}
                        </h3>

                        <p className="text-text-secondary text-sm leading-relaxed font-medium mb-8">
                            {lang.description}
                        </p>

                        <button className="relative z-10 w-full py-4 bg-surface-highlight text-text-secondary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                            Explore Curriculum
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProgrammingLanguagesSection;
