// Mock Data
const MOCK_DEALERS = {
    content: [
        {
            id: 1,
            dealerName: "ABC Traders",
            dealerPhone: "+91-9876543210",
            dealerEmail: "dealer@example.com",
            dealerAddress: "123 Market Road, Business District, Mumbai, Maharashtra 400001",
            totalAmount: 10000.0,
            paidAmount: 5000.0,
            note: "Preferred delivery timings: 10 AM - 5 PM. Contact Mr. Sharma.",
            dealerDate: null
        },
        {
            id: 2,
            dealerName: "XYZ Enterprises",
            dealerPhone: "+91-9876543211",
            dealerEmail: "xyz@example.com",
            dealerAddress: "456 Industrial Area, Delhi 110020",
            totalAmount: 15000.0,
            paidAmount: 15000.0,
            note: null,
            dealerDate: null
        },
        {
            id: 3,
            dealerName: "PQR Supplies",
            dealerPhone: "+91-9876543212",
            dealerEmail: "pqr@example.com",
            dealerAddress: "789 Ring Road, Bangalore 560001",
            totalAmount: 20000.0,
            paidAmount: 5000.0,
            note: "Late payer",
            dealerDate: null
        }
    ],
    totalElements: 3,
    totalPages: 1
};

const MOCK_PAYMENTS = {
    content: [
        {
            id: 3,
            amountPaid: 5000.0,
            paymentDate: "2025-11-24T14:30:00",
            paymentMethod: "Cash"
        },
        {
            id: 1,
            amountPaid: 0.0,
            paymentDate: "2025-11-24T22:34:57",
            paymentMethod: "NOT PAID YET"
        }
    ],
    totalPages: 1
};

// Helper to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // Feature 1: All Dealers List
    getAllDealers: async (page = 0, size = 5, sortBy = 'dealerName', sortDir = 'ASC') => {
        try {
            const response = await fetch(`http://localhost:8080/api/dealer/allDealers?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dealers:', error);
            throw error;
        }
    },

    // Feature 2: Single Dealer Detail
    getDealerById: async (dealerId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/dealer/${dealerId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching dealer ${dealerId}:`, error);
            throw error;
        }
    },

    // Feature 3: Payment History
    getDealerPayments: async (dealerId, page = 0, size = 3, sortBy = 'amountPaid', sortDir = 'desc') => {
        try {
            const response = await fetch(`http://localhost:8080/api/dealer/${dealerId}/payments?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dealer payments:', error);
            throw error;
        }
    },

    // Feature 4: Add New Payment
    addDealerPayment: async (dealerId, paymentData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/dealer/${dealerId}/payments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                throw new Error('Failed to add payment');
            }

            return await response.json();
        } catch (error) {
            console.error(`Error adding payment for dealer ${dealerId}:`, error);
            throw error;
        }
    },

    // Feature 5: Get Dealer Bills
    getDealerBills: async (dealerId, page = 0, size = 20) => {
        try {
            const response = await fetch(`http://localhost:8080/api/ebill/all?dealerId=${dealerId}&page=${page}&size=${size}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching dealer bills:', error);
            throw error;
        }
    },

    // Feature 6: Modal Management
    modalService: {
        getAllModals: async (page = 0, size = 15, sortDir = 'DESC') => {
            try {
                const response = await fetch(`http://localhost:8080/api/modal/all_modals?page=${page}&size=${size}&sortDir=${sortDir}`);
                if (!response.ok) throw new Error('Failed to fetch modals');
                return await response.json();
            } catch (error) {
                console.error('Error fetching all modals:', error);
                throw error;
            }
        },
        getModalById: async (id, page = 0, size = 15, sortDir = 'DESC') => {
            try {
                const response = await fetch(`http://localhost:8080/api/modal/all/${id}?page=${page}&size=${size}&sortDir=${sortDir}`);
                if (!response.ok) throw new Error('Failed to fetch modal details');
                return await response.json();
            } catch (error) {
                console.error(`Error fetching modal ${id}:`, error);
                throw error;
            }
        },
        searchModals: async (str, page = 0, size = 15, sortDir = 'DESC') => {
            try {
                const response = await fetch(`http://localhost:8080/api/modal/searchProduct?str=${str}&page=${page}&size=${size}&sortDir=${sortDir}`);
                if (!response.ok) throw new Error('Failed to search modals');
                return await response.json();
            } catch (error) {
                console.error('Error searching modals:', error);
                throw error;
            }
        }
    }
};
