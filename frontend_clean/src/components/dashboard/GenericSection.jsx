import React from "react";

function GenericSection({ title, children }) {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="text-2xl font-black mb-6 text-text-primary tracking-tight transition-colors">
                {title}
            </h2>
            <div className="bg-surface border border-border p-8 rounded-[2rem] shadow-sm transition-colors">
                {children || <p className="text-text-muted font-medium italic">This section is currently being curated...</p>}
            </div>
        </section>
    );
}

export default GenericSection;
