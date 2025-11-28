import React from 'react';

const BillListTable = ({ bills, onViewBill }) => {
    if (!bills || bills.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
                No bills found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bill ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Amount
                        </th>

                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bills.map((bill, index) => (
                        <tr key={bill.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                #{bill.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {bill.billDate ? new Date(bill.billDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                ₹{bill.billingSumma?.totalAmount?.toLocaleString() || '0'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onViewBill(bill)}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div >
    );
};

export default BillListTable;
