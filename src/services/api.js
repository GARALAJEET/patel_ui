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
        await delay(500); // Simulate network delay
        console.log('Fetching dealers (MOCK)...');
        return MOCK_DEALERS;
    },

    // Feature 2: Single Dealer Detail
    getDealerById: async (dealerId) => {
        await delay(300);
        console.log(`Fetching dealer ${dealerId} (MOCK)...`);
        const dealer = MOCK_DEALERS.content.find(d => d.id === parseInt(dealerId));
        if (!dealer) throw new Error('Dealer not found');
        return dealer;
    },

    // Feature 3: Payment History
    getDealerPayments: async (dealerId, page = 0, size = 31, sortBy = 'amountPaid', sortDir = 'desc') => {
        await delay(400);
        console.log(`Fetching payments for dealer ${dealerId} (MOCK)...`);
        return MOCK_PAYMENTS;
    },

    // Feature 4: Add New Payment
    addDealerPayment: async (dealerId, paymentData) => {
        await delay(600);
        console.log(`Adding payment for dealer ${dealerId} (MOCK):`, paymentData);

        // In a real app, we would update the backend. 
        // Here we just return success.
        // For better UX in mock mode, we could update the mock data in memory, 
        // but the prompt just asked to "Refresh the Payment History List".

        // Let's update the mock payments in memory so the user sees it
        const newPayment = {
            id: Math.floor(Math.random() * 1000),
            amountPaid: paymentData.amountPaid,
            paymentDate: paymentData.paymentDate,
            paymentMethod: paymentData.paymentMethod
        };
        MOCK_PAYMENTS.content.unshift(newPayment);

        // Also update dealer totals for the "Real-time Update" requirement
        const dealer = MOCK_DEALERS.content.find(d => d.id === parseInt(dealerId));
        if (dealer) {
            dealer.paidAmount += paymentData.amountPaid;
        }

        return newPayment;
    }
};
