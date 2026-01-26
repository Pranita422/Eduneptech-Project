import React from "react";

function GenericSection({ title, children }) {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="text-2xl font-black mb-6 text-slate-900 tracking-tight">
                {title}
            </h2>
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                {children || <p className="text-slate-500 font-medium italic">This section is currently being curated...</p>}
            </div>
        </section>
    );
}

export default GenericSection;
