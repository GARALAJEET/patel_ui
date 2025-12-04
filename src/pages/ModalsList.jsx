import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ModalCard from '../components/ModalCard';
import { ChevronLeft, ChevronRight, Filter, ArrowUpDown, Search, Package } from 'lucide-react';

const ModalsList = () => {
    const [modals, setModals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination State
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(true);

    // Sorting State
    const [sortDir, setSortDir] = useState('DESC');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(0); // Reset to first page on new search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        loadModals();
    }, [page, size, sortDir, debouncedSearch]);

    const loadModals = async () => {
        try {
            setLoading(true);
            let data;
            if (debouncedSearch) {
                data = await api.modalService.searchModals(debouncedSearch, page, size, sortDir);
            } else {
                data = await api.modalService.getAllModals(page, size, sortDir);
            }

            setModals(data.content || []);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setFirstPage(data.firstPage);
            setLastPage(data.lastPage);
        } catch (err) {
            setError('Failed to load modals. Please try again later.');
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

    const handleSortDirChange = () => {
        setSortDir(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    };

    const handlePageSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Modals</h1>
                    <p className="text-gray-500 mt-1">Browse and manage product modals</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-grow md:flex-grow-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search modals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm w-full md:w-64"
                        />
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <button
                            onClick={handleSortDirChange}
                            className="p-1 hover:bg-gray-200 rounded-md transition-colors flex items-center text-sm font-medium text-gray-700"
                            title={sortDir === 'ASC' ? 'Ascending' : 'Descending'}
                        >
                            <span className="mr-2">Sort</span>
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
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-r-lg shadow-sm">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                </div>
            ) : modals.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <Package className="h-12 w-12" strokeWidth={1} />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No modals found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {modals.map((modal) => (
                            <ModalCard key={modal.id} modal={modal} />
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

export default ModalsList;
