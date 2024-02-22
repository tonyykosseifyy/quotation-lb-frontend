import axiosClient from "@/api/axiosClient";

const authServices = {
    getMe: async () => {
        const response = await axiosClient.get('user')
        return response;
    }
}

export default authServices;