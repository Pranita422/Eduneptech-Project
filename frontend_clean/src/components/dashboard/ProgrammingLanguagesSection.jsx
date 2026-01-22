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
        <section className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-8 text-violet-800 border-b-2 border-violet-100 pb-2">
                💻 Programming Languages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {languages.map((lang, index) => (
                    <div
                        key={index}
                        className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${lang.color} opacity-5 rounded-bl-full transition-all duration-300 group-hover:scale-150`}></div>

                        <div className="w-20 h-20 mb-6 relative group-hover:scale-110 transition-transform duration-300">
                            <img src={lang.icon} alt={lang.name} className="w-full h-full object-contain" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-violet-600 transition-colors">
                            {lang.name}
                        </h3>

                        <p className="text-gray-600 leading-relaxed max-w-xs">
                            {lang.description}
                        </p>

                        <button className="mt-8 px-8 py-3 bg-violet-50 text-violet-700 rounded-full font-semibold hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-sm">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProgrammingLanguagesSection;
