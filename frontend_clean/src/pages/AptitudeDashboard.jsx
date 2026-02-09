import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { API_BASE_URL } from "../data/dashboardData";
import styles from "./RoadmapAptitude.module.css";
import MockRazorpayModal from "../components/dashboard/MockRazorpayModal";

const AptitudeDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get("/aptitude/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // List of premium categories for demonstration
    const PREMIUM_CATEGORIES = []; // All categories are now free
    const [unlocked, setUnlocked] = useState([]);
    const [isPremium, setIsPremium] = useState(false);

    // Fetch user profile to get unlocked assessments
    const fetchUserProfile = async () => {
        try {
            const res = await API.get("/auth/profile");
            console.log("[Frontend] Fetched user profile:", res.data.user);
            setUnlocked(res.data.user.unlockedCategories || []);
            if (res.data.user.isPremium) setIsPremium(true);
        } catch (err) {
            console.error("Failed to fetch user profile", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const [processing, setProcessing] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Check if we're in development mode
    const isDevelopment = import.meta.env.MODE === 'development';

    const handlePayment = async (category) => {
        if (isDevelopment) {
            // Development: Show mock payment modal
            setSelectedCategory(category);
            setShowPaymentModal(true);
        } else {
            // Production: Use real Razorpay
            try {
                setProcessing(true);
                const orderRes = await API.post("/payment/order", {
                    amount: 499,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`,
                    itemName: category
                });

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyHere",
                    amount: orderRes.data.amount,
                    currency: orderRes.data.currency,
                    name: "Eduneptech",
                    description: `Unlock ${category} Assessment`,
                    order_id: orderRes.data.id,
                    handler: async function (response) {
                        try {
                            const verifyRes = await API.post("/payment/verify", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                itemName: category,
                                amount: 499
                            });

                            if (verifyRes.data.msg === "Payment success") {
                                alert("Payment Successful! Assessment Unlocked.");
                                setUnlocked((prev) => [...prev, category]);
                            }
                        } catch (error) {
                            console.error("Payment verification failed", error);
                            alert("Payment verification failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: "User Name",
                        email: "user@example.com",
                        contact: "9999999999"
                    },
                    theme: {
                        color: "#7c3aed"
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
                setProcessing(false);
            } catch (error) {
                console.error("Payment initialization failed", error);
                alert("Could not start payment. Please try again.");
                setProcessing(false);
            }
        }
    };

    const handleMockSuccess = async () => {
        try {
            setProcessing(true);
            const res = await API.post("/payment/mock-verify", {
                status: "success",
                itemName: selectedCategory, // Unlock specific category
                amount: 499
            });

            if (res.data.msg === "Payment success") {
                console.log(`[Frontend] Payment successful for ${selectedCategory}. Updating local state...`);

                // 1. Update local state immediately for instant access
                setUnlocked((prev) => [...prev, selectedCategory]);

                // 2. Refresh from DB for persistence
                try {
                    await fetchUserProfile();
                } catch (profileErr) {
                    console.error("Profile refresh failed, but individual unlock might still work locally.", profileErr);
                }

                setShowPaymentModal(false);
                setSuccessMessage(`✅ ${selectedCategory} unlocked successfully!`);
                setTimeout(() => setSuccessMessage(null), 5000);
            }
        } catch (error) {
            console.error("Mock payment failed", error);
            setSuccessMessage("❌ Payment failed. Please try again.");
            setTimeout(() => setSuccessMessage(null), 5000);
        } finally {
            setProcessing(false);
        }
    };

    const handleMockFailure = () => {
        setShowPaymentModal(false);
        setSuccessMessage("❌ Payment cancelled.");
        setTimeout(() => setSuccessMessage(null), 5000);
    };



    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-surface-highlight text-text-muted hover:text-text-primary rounded-full transition"
                    title="Go Back"
                >
                    <span className="text-xl">←</span>
                </button>
                <h1 className="text-2xl font-bold text-text-primary">Aptitude Training</h1>
            </header>

            {successMessage && (
                <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white font-semibold animate-bounce ${successMessage.includes('✅') ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                    {successMessage}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-text-muted">Loading assessments...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.length > 0 ? (
                        categories.map((cat) => {
                            const isPremiumCat = PREMIUM_CATEGORIES.includes(cat);
                            const isUnlocked = unlocked.includes(cat) || isPremium;
                            const locked = isPremiumCat && !isUnlocked;

                            return (
                                <div key={cat} className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors">
                                    <div className="text-4xl mb-4">
                                        {cat.toLowerCase().includes('quant') ? '📐' : cat.toLowerCase().includes('logic') ? '🧩' : '📖'}
                                    </div>
                                    <h2 className="text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
                                        {cat}
                                        {isPremiumCat && (
                                            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-black uppercase">
                                                Premium
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-text-secondary text-sm mb-6 flex-grow">
                                        {locked ? "Unlock this premium assessment to practice." : `Practice and improve your ${cat} skills.`}
                                    </p>

                                    {locked ? (
                                        <button
                                            onClick={() => handlePayment(cat)}
                                            disabled={processing}
                                            className="w-full py-2.5 bg-amber-500 text-white rounded-lg font-bold text-sm hover:bg-amber-600 transition disabled:opacity-50"
                                        >
                                            {processing ? "Processing..." : "Unlock Premium"}
                                        </button>
                                    ) : (
                                        <Link to={`/dashboard/aptitude/${cat}`} className="w-full">
                                            <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition">
                                                Take Test
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-border rounded-2xl">
                            <p className="text-text-muted">No aptitude assessments found.</p>
                        </div>
                    )}
                </div>
            )}


            <MockRazorpayModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handleMockSuccess}
                onFailure={handleMockFailure}
                itemName={selectedCategory}
                amount={499}
            />
        </div>
    );
};

export default AptitudeDashboard;
