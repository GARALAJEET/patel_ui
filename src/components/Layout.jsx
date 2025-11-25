import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                                    Patel Vyapar Mitra
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    to="/"
                                    className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Dealers
                                </Link>
                                {/* Add more nav links here if needed */}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {/* User profile or other actions */}
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                    <span className="text-xs font-medium leading-none text-blue-700">AD</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
