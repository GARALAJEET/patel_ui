import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Tag, Building2, DollarSign, Percent } from 'lucide-react';

const ModalCard = ({ modal }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/modals/${modal.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Package className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    ID: {modal.id}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">{modal.productName || 'Unknown Product'}</h3>
            <p className="text-sm text-gray-500 mb-4 font-mono">{modal.productModal}</p>

            <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{modal.companyName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Tag className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{modal.productCategory}</span>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Store Price</p>
                        <div className="flex items-center font-medium text-gray-900">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {modal.storePrice ? modal.storePrice.toLocaleString() : 'N/A'}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Rate</p>
                        <div className="flex items-center font-medium text-green-600">
                            <Percent className="h-3 w-3 mr-1" />
                            {modal.rate ? modal.rate : 'N/A'}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCard;
