import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import DealerCard from '../components/DealerCard';

const DealersList = () => {
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDealers = async () => {
            try {
                setLoading(true);
                // Using default pagination for now as per requirements
                const data = await api.getAllDealers();
                setDealers(data.content || []);
            } catch (err) {
                setError('Failed to load dealers. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadDealers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        {/* Icon could go here */}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">All Dealers</h1>
                {/* Add Dealer button could go here in future */}
            </div>

            {dealers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500">No dealers found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dealers.map((dealer) => (
                        <DealerCard key={dealer.id} dealer={dealer} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DealersList;
