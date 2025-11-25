import React, { useState } from 'react';

const AddPaymentModal = ({ isOpen, onClose, onSubmit, loading }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('Cash');
    const [date, setDate] = useState(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!isOpen) return null;

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        onSubmit({
            amountPaid: parseFloat(amount),
            paymentMethod: method,
            paymentDate: date,
        });
        // Reset state after submission (optional, depending on if modal closes)
        // setShowConfirmation(false); 
    };

    const handleBack = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {!showConfirmation ? (
                        // Form View
                        <form onSubmit={handleInitialSubmit}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Add New Payment
                                        </h3>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    id="amount"
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="method" className="block text-sm font-medium text-gray-700">Payment Method</label>
                                                <select
                                                    id="method"
                                                    name="method"
                                                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    value={method}
                                                    onChange={(e) => setMethod(e.target.value)}
                                                >
                                                    <option value="Cash">Cash</option>
                                                    <option value="Online">Online</option>
                                                    <option value="Cheque">Cheque</option>
                                                    <option value="Bank Transfer">Bank Transfer</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                                <input
                                                    type="datetime-local"
                                                    name="date"
                                                    id="date"
                                                    required
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Next
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Confirmation View
                        <div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Confirm Payment
                                        </h3>
                                        <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-md p-4">
                                            <p className="text-sm text-yellow-800 mb-2">Please review the details before confirming.</p>
                                            <dl className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <dt className="font-medium text-gray-600">Amount:</dt>
                                                    <dd className="font-bold text-gray-900">₹{parseFloat(amount).toLocaleString()}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="font-medium text-gray-600">Method:</dt>
                                                    <dd className="text-gray-900">{method}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt className="font-medium text-gray-600">Date:</dt>
                                                    <dd className="text-gray-900">{new Date(date).toLocaleString()}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleConfirm}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Processing...' : 'Confirm Payment'}
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPaymentModal;
