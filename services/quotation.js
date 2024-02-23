import axiosClient from "@/api/axiosClient";


// do not trust this file, it is not tested
// it is just a placeholder for the actual services
const quotationServices = {
    getQuotation: async (id) => {
        const response = await axiosClient.get(`quotation/${id}`)
        return response;
    },
    getQuotations: async () => {
        const response = await axiosClient.get('quotation')
        return response;
    },
    createQuotation: async (data) => {
        const response = await axiosClient.post('quotation', data)
        return response;
    },
    updateQuotation: async (id, data) => {
        const response = await axiosClient.put(`quotation/${id}`, data)
        return response;
    },
    deleteQuotation: async (id) => {
        const response = await axiosClient.delete(`quotation/${id}`)
        return response;
    }
}

export default quotationServices;
// 