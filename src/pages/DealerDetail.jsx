import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import PaymentHistoryTable from '../components/PaymentHistoryTable';
import AddPaymentModal from '../components/AddPaymentModal';

const DealerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [dealer, setDealer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Action states
    const [activeTab, setActiveTab] = useState(null); // 'payments' or 'ebills'
    const [payments, setPayments] = useState([]);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch Dealer Details
    useEffect(() => {
        const fetchDealer = async () => {
            try {
                setLoading(true);
                const data = await api.getDealerById(id);
                setDealer(data);
            } catch (err) {
                setError('Failed to load dealer details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDealer();
    }, [id]);

    // Fetch Payments
    const fetchPayments = async () => {
        try {
            setPaymentsLoading(true);
            const data = await api.getDealerPayments(id);
            setPayments(data.content || []);
        } catch (err) {
            console.error('Failed to load payments', err);
            // Optional: show toast
        } finally {
            setPaymentsLoading(false);
        }
    };

    const handleShowPayments = () => {
        if (activeTab === 'payments') {
            setActiveTab(null); // Toggle off
        } else {
            setActiveTab('payments');
            fetchPayments();
        }
    };

    const handleAddPayment = async (paymentData) => {
        try {
            setSubmitLoading(true);
            await api.addDealerPayment(id, paymentData);
            setIsModalOpen(false);

            // Show success message
            setSuccessMessage('Payment added successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);

            // Refresh payments if the tab is open, or open it
            setActiveTab('payments');
            fetchPayments();
            // Refresh dealer details to update totals
            const updatedDealer = await api.getDealerById(id);
            setDealer(updatedDealer);
        } catch (err) {
            console.error('Failed to add payment', err);
            alert('Failed to add payment. Please try again.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!dealer) return <div className="p-8 text-center">Dealer not found</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
                &larr; Back to Dealers
            </button>

            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm animate-fade-in-down">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700 font-medium">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Dealer Details Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                    <h1 className="text-2xl font-bold text-gray-900">{dealer.dealerName}</h1>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Contact Information</label>
                            <div className="mt-2 space-y-2">
                                <p className="text-gray-900"><span className="font-semibold">Phone:</span> {dealer.dealerPhone}</p>
                                <p className="text-gray-900"><span className="font-semibold">Email:</span> {dealer.dealerEmail}</p>
                                <p className="text-gray-900"><span className="font-semibold">Address:</span> {dealer.dealerAddress}</p>
                            </div>
                        </div>
                        {dealer.note && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Notes</label>
                                <p className="mt-1 text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-100">{dealer.note}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Financial Overview</label>
                            <div className="mt-2 grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{dealer.totalAmount?.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Paid Amount</p>
                                    <p className="text-2xl font-bold text-green-600">₹{dealer.paidAmount?.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Balance</p>
                                    <p className={`text-2xl font-bold ${dealer.paidAmount > dealer.totalAmount ? 'text-green-600' : 'text-red-600'}`}>
                                        {dealer.paidAmount > dealer.totalAmount ? '+' : dealer.paidAmount < dealer.totalAmount ? '-' : ''}₹{Math.abs(dealer.paidAmount - dealer.totalAmount).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setActiveTab(activeTab === 'ebills' ? null : 'ebills')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'ebills'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Show All E-Bills
                    </button>
                    <button
                        onClick={handleShowPayments}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'payments'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Show All Payments
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    >
                        + Add Payment
                    </button>
                </div>

                {/* Dynamic Content Area */}
                <div className="transition-all duration-300 ease-in-out">
                    {activeTab === 'ebills' && (
                        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
                            <p className="text-gray-500 italic">Feature coming soon...</p>
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
                            {paymentsLoading ? (
                                <div className="text-center py-8">Loading payments...</div>
                            ) : (
                                <PaymentHistoryTable payments={payments} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <AddPaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddPayment}
                loading={submitLoading}
            />
        </div>
    );
};

export default DealerDetail;
