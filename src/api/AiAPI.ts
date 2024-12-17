import axios from "./axios";

const token = '10|cBz3Z2VjFbbAbllob6VvAa6n8YqDfclh9J7XKdgT9faf048c';

const AiAPI = {
    infer: async(data: any) => {
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