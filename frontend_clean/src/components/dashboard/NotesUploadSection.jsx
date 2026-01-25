import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../data/dashboardData";

function NotesUploadSection() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Track which note is pending deletion

    // Fetch notes on load
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/notes`);
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
        } finally {
            setLoadingNotes(false);
        }
    };

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
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title) return alert("Please select a file and enter a title.");

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);

        try {
            await axios.post(`${API_BASE_URL}/notes/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // Reset form
            setFile(null);
            setTitle("");
            setDescription("");
            // Refresh list
            fetchNotes();
            // alert("Note uploaded successfully!"); // Removed as per user request
        } catch (err) {
            console.error("Upload failed", err);
            // alert("Failed to upload note.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = (id) => {
        if (confirmDeleteId === id) {
            // Already confirmed, proceed to delete
            handleDelete(id);
        } else {
            // First click, asking for confirmation
            setConfirmDeleteId(id);
            // Reset after 3 seconds if not confirmed
            setTimeout(() => setConfirmDeleteId(null), 3000);
        }
    };

    const handleDelete = async (id) => {
        // Confirm dialog removed, using inline state
        try {
            await axios.delete(`${API_BASE_URL}/notes/${id}`);
            fetchNotes();
            setConfirmDeleteId(null);
        } catch (err) {
            console.error("Delete failed", err);
        }
    }

    return (
        <section className="animate-in zoom-in duration-500 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-violet-800 border-b-2 border-violet-100 pb-2">
                📝 Upload Notes
            </h2>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Upload Form */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Note</h3>

                    <form onSubmit={handleUpload} className="space-y-6">
                        {/* File Drop Zone */}
                        <div
                            className={`relative border-4 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 ${dragActive ? 'border-violet-500 bg-violet-50' : 'border-gray-200 bg-gray-50 hover:border-violet-300'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="text-center">
                                    <div className="text-4xl mb-2">📄</div>
                                    <p className="font-semibold text-gray-800 break-all">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="mt-4 text-red-500 text-sm hover:underline"
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-4xl mb-4 text-violet-300">📂</div>
                                    <p className="text-gray-500 mb-2 text-center text-sm">Drag & Drop files here</p>
                                    <p className="text-xs text-gray-400 mb-4">PDF, DOCX, PNG, JPG (Max 10MB)</p>
                                    <label className="cursor-pointer bg-white text-violet-600 border border-violet-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-50 transition-all">
                                        Browse Computer
                                        <input type="file" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </>
                            )}
                        </div>

                        {/* Metadata Inputs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                placeholder="e.g. Physics Formula Sheet"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all h-24 resize-none"
                                placeholder="Short description about the notes..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading || !file || !title}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${uploading || !file || !title ? 'bg-gray-300 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 hover:shadow-violet-200 transform hover:-translate-y-0.5'}`}
                        >
                            {uploading ? "Uploading..." : "Upload Note"}
                        </button>
                    </form>
                </div>

                {/* Notes List */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                        Your Library
                        <span className="bg-violet-100 text-violet-600 text-xs px-2 py-1 rounded-full">{notes.length} Items</span>
                    </h3>

                    {loadingNotes ? (
                        <p className="text-center text-gray-400 py-10">Loading library...</p>
                    ) : notes.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                            <div className="text-5xl mb-4 opacity-50">📚</div>
                            <p className="text-gray-500">Your library is empty.</p>
                            <p className="text-sm text-gray-400">Upload your first note to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {notes.map((note) => (
                                <div key={note._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-2xl text-violet-600 shrink-0">
                                                {note.fileType.includes("pdf") ? "📕" : note.fileType.includes("image") ? "🖼️" : "📄"}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 leading-tight mb-1">{note.title}</h4>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{note.description}</p>
                                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                                    <span>{(note.size / 1024).toFixed(1)} KB</span>
                                                    <span>•</span>
                                                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <a
                                                href={`${API_BASE_URL.replace('/api', '')}${note.filePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors text-center"
                                            >
                                                View
                                            </a>
                                            <button
                                                onClick={() => handleDeleteClick(note._id)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${confirmDeleteId === note._id
                                                        ? "bg-red-600 text-white shadow-md scale-105"
                                                        : "text-red-500 bg-red-50 hover:bg-red-100"
                                                    }`}
                                            >
                                                {confirmDeleteId === note._id ? "Confirm?" : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default NotesUploadSection;
