import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import DealerCard from '../components/DealerCard';
import { ChevronLeft, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';

const DealersList = () => {
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination State
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(true);

    // Sorting State
    const [sortBy, setSortBy] = useState('dealerName');
    const [sortDir, setSortDir] = useState('ASC');

    useEffect(() => {
        loadDealers();
    }, [page, size, sortBy, sortDir]);

    const loadDealers = async () => {
        try {
            setLoading(true);
            const data = await api.getAllDealers(page, size, sortBy, sortDir);
            setDealers(data.content || []);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setFirstPage(data.firstPage);
            setLastPage(data.lastPage);
        } catch (err) {
            setError('Failed to load dealers. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (!lastPage) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (!firstPage) {
            setPage(prev => prev - 1);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSortDirChange = () => {
        setSortDir(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    };

    const handlePageSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0); // Reset to first page when size changes
    };

    if (loading && dealers.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-r-lg shadow-sm">
                <div className="flex">
                    <div className="ml-3">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Dealers</h1>
                    <p className="text-gray-500 mt-1">Manage and view all your dealer partnerships</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Sort Controls */}
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <Filter size={18} className="text-gray-500" />
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
                        >
                            <option value="dealerName">Name</option>
                            <option value="totalAmount">Total Amount</option>
                            <option value="paidAmount">Paid Amount</option>
                            <option value="id">ID</option>
                        </select>
                        <button
                            onClick={handleSortDirChange}
                            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                            title={sortDir === 'ASC' ? 'Ascending' : 'Descending'}
                        >
                            <ArrowUpDown size={16} className={`text-gray-600 transform transition-transform ${sortDir === 'DESC' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Page Size Control */}
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <span className="text-sm text-gray-500 pl-2">Show:</span>
                        <select
                            value={size}
                            onChange={handlePageSizeChange}
                            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {dealers.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <Filter size={48} strokeWidth={1} />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No dealers found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dealers.map((dealer) => (
                            <DealerCard key={dealer.id} dealer={dealer} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium text-gray-900">{page * size + 1}</span> to <span className="font-medium text-gray-900">{Math.min((page + 1) * size, totalElements)}</span> of <span className="font-medium text-gray-900">{totalElements}</span> results
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={firstPage}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${firstPage
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow'
                                    }`}
                            >
                                <ChevronLeft size={16} className="mr-1" />
                                Previous
                            </button>

                            <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
                                Page {page + 1} of {totalPages}
                            </span>

                            <button
                                onClick={handleNextPage}
                                disabled={lastPage}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${lastPage
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow'
                                    }`}
                            >
                                Next
                                <ChevronRight size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DealersList;
