import axios from "./axios";

const AiAPI = {
    infer: async(data: any) => {
        return await axios.request({
            url: "/ai",
            method: "POST",
            data,
        });
    },
    
};

export default AiAPI;