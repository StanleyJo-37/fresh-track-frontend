import axios from "./axios";

const AiAPI = {
    infer: async(image: string) => {
        return await axios.request({
            url: "/ai/infer",
            method: "POST",
            data: {
                "image_upload": image,
            }
        });
    }
};

export default AiAPI;