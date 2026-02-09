import React from "react";

function RoadmapSection({ title }) {
    const cards = [
        {
            title: "🌐 Web Development",
            desc: "Master HTML5, CSS3, Modern JavaScript, React.js, and Cloud Deployment strategies.",
            btn: "View Web Dev Roadmap →",
            accent: "blue"
        },
        {
            title: "📊 DSA & Problem Solving",
            desc: "Expertly curated path for Big O analysis, Data Structures, and LeetCode-style patterns.",
            btn: "View DSA Roadmap →",
            accent: "emerald"
        },
        {
            title: "🧠 Aptitude & Interview",
            desc: "Ace your placements with logical reasoning, quantitative aptitude, and soft skills.",
            btn: "Start Practicing →",
            accent: "rose"
        },
        {
            title: "📱 App Development",
            desc: "Build cross-platform mobile applications using React Native or Flutter.",
            btn: "Explore Mobile →",
            accent: "amber"
        },
        {
            title: "☁️ DevOps & Cloud",
            desc: "Learn CI/CD pipelines, Docker, Kubernetes, and AWS/Azure fundamentals.",
            btn: "Scale Up →",
            accent: "indigo"
        },
        {
            title: "🤖 Data Science & AI",
            desc: "Dive into Python, Machine Learning, Deep Learning, and Neural Networks.",
            btn: "Start AI Journey →",
            accent: "purple"
        }
    ];

    return (
        <section className="animate-in fade-in slide-in-from-top-10 duration-700">
            <h2 className="text-3xl font-bold mb-8 text-primary border-b-2 border-border pb-2">
                🧭 {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className="group bg-surface rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-border flex flex-col justify-between"
                    >
                        <div>
                            <div className={`w-14 h-14 bg-${card.accent}-50 text-${card.accent}-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                                {card.title.split(' ')[0]}
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4">
                                {card.title.split(' ').slice(1).join(' ')}
                            </h3>
                            <p className="text-text-secondary leading-relaxed mb-8">
                                {card.desc}
                            </p>
                        </div>

                        <button className="flex items-center text-primary font-bold group/btn hover:text-primary-fg transition-colors">
                            {card.btn}
                            <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">→</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RoadmapSection;
