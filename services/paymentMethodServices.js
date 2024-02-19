import axiosClient from "@/api/axiosClient";


const paymentMethodService = {
    getAllPaymentMethods: async () => {
        const response = await axiosClient.get('/payment-terms')
        return response;
    },
    createPaymentMethod: async (data) => {
        const response = await axiosClient.post('/payment-terms', data)
        return response;
    },
    updatePaymentMethod: async (id, data) => {
        const response = await axiosClient.put(`/payment-terms/${id}`, data)
        return response;
    },
    deletePaymentMethod: async (id) => {
        const response = await axiosClient.delete(`/payment-terms/${id}`)
        return response;
    }
}

export default paymentMethodService;
