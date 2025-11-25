import React from 'react';
import { useNavigate } from 'react-router-dom';

const DealerCard = ({ dealer }) => {
    const navigate = useNavigate();

    const {
        id,
        dealerName,
        dealerPhone,
        dealerEmail,
        dealerAddress,
        totalAmount,
        paidAmount,
    } = dealer;

    const isOverdue = totalAmount > paidAmount;

    return (
        <div
            onClick={() => navigate(`/dealer/${id}`)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 overflow-hidden flex flex-col h-full"
        >
            <div className="p-5 flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate" title={dealerName}>
                    {dealerName}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                        <span className="font-medium w-16 flex-shrink-0">Phone:</span>
                        <span className="truncate">{dealerPhone}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="font-medium w-16 flex-shrink-0">Email:</span>
                        <span className="truncate" title={dealerEmail}>{dealerEmail}</span>
                    </div>
                    <div className="flex items-start">
                        <span className="font-medium w-16 flex-shrink-0">Address:</span>
                        <span className="line-clamp-2" title={dealerAddress}>{dealerAddress}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                        <p className={`font-bold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                            ₹{totalAmount.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Paid</p>
                        <p className="font-bold text-green-600">
                            ₹{paidAmount.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerCard;
