import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import MockRazorpayModal from "./MockRazorpayModal";

function Sidebar({ activeSection, setActiveSection, openSems, setOpenSems }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [processing, setProcessing] = useState(false);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        const checkPremium = async () => {
            if (!currentUser) return;
            try {
                const res = await API.get("/auth/profile");
                if (res.data.user.isPremium) {
                    setIsPremium(true);
                }
            } catch (e) {
                console.error("Error checking premium status", e);
            }
        };
        checkPremium();
    }, [currentUser]);

    const toggleMenu = (menu) => {
        setOpenSems((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Check if we're in development mode
    const isDevelopment = import.meta.env.MODE === 'development';

    const handleSubscription = async () => {
        if (isPremium) return;

        if (isDevelopment) {
            // Development: Show mock payment modal
            setShowPaymentModal(true);
        } else {
            // Production: Use real Razorpay
            try {
                setProcessing(true);
                if (!currentUser) {
                    navigate("/login");
                    return;
                }

                const orderRes = await API.post("/payment/order", {
                    amount: 1499,
                    currency: "INR",
                    receipt: `sub_${Date.now()}`,
                    itemName: "Premium Subscription"
                });

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyHere",
                    amount: orderRes.data.amount,
                    currency: orderRes.data.currency,
                    name: "Eduneptech Premium",
                    description: "Lifetime Premium Access",
                    order_id: orderRes.data.id,
                    handler: async function (response) {
                        try {
                            const verifyRes = await API.post("/payment/verify", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                itemName: "Premium Subscription",
                                amount: 1499
                            });

                            if (verifyRes.data.msg === "Payment success") {
                                alert("Welcome to Premium! 🌟");
                                setIsPremium(true);
                                window.location.reload();
                            }
                        } catch (error) {
                            console.error("Payment verification failed", error);
                            alert("Verification failed. Contact support.");
                        }
                    },
                    theme: { color: "#4f46e5" }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
                setProcessing(false);
            } catch (error) {
                console.error("Subscription failed", error);
                const errorMsg = error.response?.data?.msg || error.message || "Unknown error";
                alert(`Could not start subscription: ${errorMsg}`);
                setProcessing(false);
            }
        }
    };

    const handleMockSuccess = async () => {
        try {
            setProcessing(true);
            if (!currentUser) {
                navigate("/login");
                return;
            }

            const res = await API.post("/payment/mock-verify", {
                status: "success",
                itemName: "Premium Subscription",
                amount: 1499
            });

            if (res.data.msg === "Payment success") {
                setIsPremium(true);
                window.location.reload();
            }
        } catch (error) {
            console.error("Mock subscription failed", error);
        } finally {
            setProcessing(false);
            setShowPaymentModal(false);
        }
    };

    const handleMockFailure = () => {
        setShowPaymentModal(false);
    };

    return (
        <aside className="w-72 bg-surface border-r border-border flex flex-col min-h-screen sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto transition-colors">
            <div className="flex-1 px-4 py-8 space-y-8">
                {/* Learning Hub Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Learning Hub</h3>

                    {/* Syllabus Menu */}
                    <div className="space-y-1">
                        <button
                            onClick={() => toggleMenu("nepMenu")}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all group ${openSems.nepMenu ? 'bg-primary/5 text-primary' : 'text-text-secondary hover:bg-surface-highlight'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-lg transition-transform group-hover:scale-110 ${openSems.nepMenu ? 'scale-110' : ''}`}>📚</span>
                                <span className="font-bold text-sm">Course Syllabus</span>
                            </div>
                            <span className={`text-[10px] transform transition-transform duration-300 ${openSems.nepMenu ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {openSems.nepMenu && (
                            <div className="ml-4 pl-4 border-l-2 border-indigo-100 dark:border-indigo-900/30 space-y-1 py-1 animate-in slide-in-from-left-2 transition-all">
                                <button
                                    onClick={() => setActiveSection("nep")}
                                    className={`block w-full text-left px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeSection === "nep" ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-surface-highlight hover:text-primary"}`}
                                >
                                    Semester Roadmap
                                </button>
                                <button
                                    onClick={() => setActiveSection("nep-mcqs")}
                                    className={`block w-full text-left px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeSection === "nep-mcqs" ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-surface-highlight hover:text-primary"}`}
                                >
                                    NEP Assessments
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate("/programming-languages")}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">💻</span>
                        <span className="font-bold text-sm">Coding Library</span>
                    </button>
                </section>

                {/* Career Path Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Career Path</h3>

                    <div className="space-y-1">
                        <button
                            onClick={() => toggleMenu("roadmapMenu")}
                            className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all group ${openSems.roadmapMenu ? 'bg-primary/5 text-primary' : 'text-text-secondary hover:bg-surface-highlight'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-lg transition-transform group-hover:scale-110 ${openSems.roadmapMenu ? 'scale-110' : ''}`}>🧭</span>
                                <span className="font-bold text-sm">Success Roadmaps</span>
                            </div>
                            <span className={`text-[10px] transform transition-transform duration-300 ${openSems.roadmapMenu ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {openSems.roadmapMenu && (
                            <div className="ml-4 pl-4 border-l-2 border-violet-100 dark:border-violet-900/30 space-y-1 py-1 animate-in slide-in-from-left-2">
                                <button
                                    onClick={() => navigate("/dashboard/aptitude")}
                                    className="block w-full text-left px-4 py-2 text-xs font-semibold text-text-secondary rounded-lg hover:bg-surface-highlight hover:text-primary transition-colors"
                                >
                                    Aptitude Training
                                </button>
                                <button
                                    onClick={() => navigate("/dashboard/roadmaps")}
                                    className="block w-full text-left px-4 py-2 text-xs font-semibold text-text-secondary rounded-lg hover:bg-surface-highlight hover:text-primary transition-colors"
                                >
                                    Career Journeys
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Growth Group */}
                <section className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3">Your Growth</h3>

                    <button
                        onClick={() => {
                            setActiveSection("notes");
                            navigate("/dashboard");
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "notes" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">📝</span>
                        <span className="font-bold text-sm">Study Notes</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveSection("certificates");
                            navigate("/dashboard");
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "certificates" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">🏆</span>
                        <span className="font-bold text-sm">Certifications</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveSection("scorecard");
                            navigate("/dashboard");
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all group ${activeSection === "scorecard" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <span className="text-lg group-hover:scale-110 transition-transform">📊</span>
                        <span className="font-bold text-sm">Performance</span>
                    </button>
                </section>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-border bg-surface-highlight/50">
                <button
                    onClick={handleSubscription}
                    disabled={processing || isPremium}
                    className={`flex items-center justify-center gap-2 w-full font-bold py-3 rounded-2xl shadow-lg transition-all active:translate-y-0 ${isPremium ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-amber-200 dark:shadow-none' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-indigo-200 dark:shadow-none hover:shadow-indigo-300 hover:-translate-y-0.5'}`}
                >
                    <span className="text-base">{isPremium ? "👑" : "⭐"}</span>
                    <span className="text-sm">{processing ? "Processing..." : isPremium ? "Premium Member" : "Go Premium"}</span>
                </button>
                <div className="mt-4 px-2 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Eduneptech v2.0</p>
                </div>
            </div>



            <MockRazorpayModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handleMockSuccess}
                onFailure={handleMockFailure}
                itemName="Premium Subscription"
                amount={1499}
            />
        </aside >

    );
}

export default Sidebar;
