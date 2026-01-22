import React, { useState } from "react";

function NotesUploadSection() {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFiles = (newFiles) => {
        const fileList = Array.from(newFiles);
        setFiles(prev => [...prev, ...fileList]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="animate-in zoom-in duration-500">
            <h2 className="text-3xl font-bold mb-8 text-violet-800 border-b-2 border-violet-100 pb-2">
                📝 Upload Notes
            </h2>

            <div className="grid lg:grid-cols-2 gap-10">
                <div
                    className={`relative border-4 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${dragActive ? 'border-violet-500 bg-violet-50 scale-102' : 'border-gray-200 bg-white hover:border-violet-300'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="text-6xl mb-6">📂</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Drag & Drop Your Notes</h3>
                    <p className="text-gray-500 mb-8 text-center max-w-xs">Supported formats: PDF, DOCX, PNG, JPG (Max 10MB)</p>

                    <label className="cursor-pointer bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-200">
                        Browse Files
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </label>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        Selected Files
                        {files.length > 0 && <span className="ml-2 bg-violet-100 text-violet-600 text-xs px-2 py-1 rounded-full">{files.length}</span>}
                    </h3>

                    {files.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <p>No files selected yet.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {files.map((file, index) => (
                                <li key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-violet-50 transition-colors">
                                    <div className="flex items-center space-x-4 overflow-hidden">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">
                                            📄
                                        </div>
                                        <div className="truncate">
                                            <p className="font-semibold text-gray-800 truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {files.length > 0 && (
                        <button className="w-full mt-8 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-200">
                            Upload All Files
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default NotesUploadSection;
