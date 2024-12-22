import axios from "./axios";

const AiAPI = {
    infer: async(data: any, token?: string) => {
        return await axios.request({
            url: "/ai",
            method: "POST",
            data,
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
    },
    
};

export default AiAPI;