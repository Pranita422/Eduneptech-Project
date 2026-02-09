import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const MockRazorpayModal = ({ isOpen, onClose, onSuccess, onFailure, itemName, amount }) => {
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [processing, setProcessing] = useState(false);

    // Scroll Lock logic
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            // Simulate successful payment
            onSuccess();
            setProcessing(false);
        }, 2000);
    };

    const modalContent = (
        <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex justify-center items-center z-[999999] p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-surface w-full max-w-[480px] rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-none rounded-full text-white text-xl cursor-pointer transition-all active:scale-95 z-50"
                        title="Close"
                    >×</button>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">🛡️</span>
                        <div className="text-xs font-black uppercase tracking-[3px] opacity-90">Eduneptech Secure</div>
                    </div>
                    <div className="text-4xl font-black tracking-tight mb-2">₹{amount}</div>
                    <div className="text-xs font-bold opacity-70 tracking-widest uppercase">{itemName}</div>
                </div>

                {/* Payment Methods */}
                <div className="p-8">
                    <div className="mb-8">
                        <div className="flex bg-surface-highlight p-1.5 rounded-2xl mb-8 border border-border/50">
                            <button
                                onClick={() => setPaymentMethod('upi')}
                                className={`flex-1 py-3 px-4 border-none rounded-xl text-xs cursor-pointer font-black uppercase tracking-widest transition-all ${paymentMethod === 'upi' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-border' : 'bg-transparent text-text-muted hover:text-text-primary'}`}
                            >UPI</button>
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 py-3 px-4 border-none rounded-xl text-xs cursor-pointer font-black uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-border' : 'bg-transparent text-text-muted hover:text-text-primary'}`}
                            >Card</button>
                        </div>

                        {paymentMethod === 'upi' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                    Enter UPI ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="yourname@upi"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    className="w-full px-6 py-4 border border-border rounded-2xl text-sm box-border bg-surface-highlight text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                />
                                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 leading-relaxed">
                                    💡 <strong>Sandbox Mode:</strong> Use any valid-looking UPI ID to test the premium unlock flow.
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="block mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                    Card Details
                                </label>
                                <input
                                    type="text"
                                    placeholder="4242 4242 4242 4242"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    maxLength="19"
                                    className="w-full px-6 py-4 border border-border rounded-2xl text-sm mb-4 box-border bg-surface-highlight text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                />
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        className="flex-1 px-6 py-4 border border-border rounded-2xl text-sm bg-surface-highlight text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                    />
                                    <input
                                        type="password"
                                        placeholder="CVV"
                                        maxLength="3"
                                        className="flex-1 px-6 py-4 border border-border rounded-2xl text-sm bg-surface-highlight text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                    />
                                </div>
                                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-[10px] font-bold text-amber-800 dark:text-amber-200 leading-relaxed">
                                    💡 <strong>Sandbox Mode:</strong> Enter any details to test the payment success state.
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={processing || (paymentMethod === 'upi' && !upiId) || (paymentMethod === 'card' && !cardNumber)}
                        className={`w-full py-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none rounded-2xl text-sm font-black uppercase tracking-[2px] cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all active:translate-y-0`}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                PROCESSING...
                            </span>
                        ) : `PAY ₹${amount.toLocaleString()}`}
                    </button>

                    <div className="mt-8 text-center text-[10px] text-text-muted font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                        <span className="text-emerald-500">🔒</span> 256-BIT ENCRYPTED SECURE PAYMENT
                    </div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default MockRazorpayModal;
