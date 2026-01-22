import React from "react";

function GenericSection({ title, children }) {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-violet-700">
                {title}
            </h2>
            {children || <p className="text-gray-700">Content for {title} placeholder.</p>}
        </section>
    );
}

export default GenericSection;
