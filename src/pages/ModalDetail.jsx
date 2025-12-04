import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import SerialNumbersTable from '../components/SerialNumbersTable';
import { ChevronLeft, ChevronRight, ArrowLeft, Package, Filter, ArrowUpDown } from 'lucide-react';

const ModalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [serialNumbers, setSerialNumbers] = useState([]);
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

    useEffect(() => {
        loadModalDetails();
    }, [id, page, size, sortDir]);

    const loadModalDetails = async () => {
        try {
            setLoading(true);
            const data = await api.modalService.getModalById(id, page, size, sortDir);
            setSerialNumbers(data.content || []);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setFirstPage(data.firstPage);
            setLastPage(data.lastPage);
        } catch (err) {
            setError('Failed to load modal details. Please try again later.');
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
        <div className="space-y-6 pb-10">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/modals')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="h-6 w-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Modal Details</h1>
                    <p className="text-gray-500 text-sm">ID: {id}</p>
                </div>
            </div>

            {/* Controls Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Serial Numbers</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {totalElements}
                    </span>
                </div>

                <div className="flex items-center gap-3">
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
                <div className="flex justify-center items-center h-64 bg-white rounded-xl border border-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <SerialNumbersTable serialNumbers={serialNumbers} />
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

export default ModalDetail;
