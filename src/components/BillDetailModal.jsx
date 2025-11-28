import React from 'react';

const BillDetailModal = ({ isOpen, onClose, bill }) => {
    if (!isOpen || !bill) return null;

    const { dealer, items, billingSumma } = bill;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                {/* Modal panel */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">

                    {/* Header with Close Button */}
                    <div className="bg-blue-900 px-4 py-3 sm:px-6 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white p-1 rounded">
                                {/* Placeholder logo */}
                                <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                    Tax Invoice
                                </h3>
                                <p className="text-blue-200 text-xs">E-Bill System</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="bg-blue-800 rounded-md p-2 inline-flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {/* Invoice Header Info */}
                        <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Bill Date</p>
                                <p className="text-gray-900 font-medium">
                                    {bill.billDate ? new Date(bill.billDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Bill Number</p>
                                <p className="text-blue-600 font-bold text-lg">INV-{bill.id}</p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold bg-gray-800 text-white">
                                    {bill.paymentMethod}
                                </span>
                            </div>
                        </div>

                        {/* Dealer Details */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Dealer Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-lg font-bold text-gray-900 mb-1">{dealer?.dealerName}</p>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {dealer?.dealerEmail}
                                        </p>
                                        <p className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {dealer?.dealerPhone}
                                        </p>
                                        <p className="flex items-start">
                                            <svg className="h-4 w-4 mr-2 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {dealer?.dealerAddress}
                                        </p>
                                    </div>
                                </div>
                                {dealer?.note && (
                                    <div className="border-l-4 border-blue-200 pl-4">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Note</p>
                                        <p className="text-sm text-gray-600 italic">{dealer.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-8">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Items</h4>
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product / Model</th>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items?.map((item, index) => (
                                            <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.serialNumber}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    <div className="font-medium">{item.productModel?.productName}</div>
                                                    <div className="text-xs text-gray-500">{item.productModel?.productModal}</div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{item.productModel?.companyName}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 text-right">₹{item.price?.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.rate}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-1/2 md:w-1/3 bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Total Items</span>
                                    <span className="text-sm font-medium text-gray-900">{billingSumma?.totalItems}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Total Amount</span>
                                    <span className="text-lg font-bold text-gray-900">₹{billingSumma?.totalAmount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-gray-600">Paid Amount</span>
                                    <span className="text-sm font-medium text-green-600">₹{billingSumma?.paidAmount?.toLocaleString()}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-base font-bold text-gray-900">Balance Due</span>
                                    <span className="text-xl font-bold text-blue-600">₹{billingSumma?.remainingAmount?.toLocaleString()}</span>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${billingSumma?.paymentStatus === 'PAID'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {billingSumma?.paymentStatus === 'PAID' ? 'Paid in Full' : billingSumma?.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => window.print()}
                        >
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillDetailModal;
