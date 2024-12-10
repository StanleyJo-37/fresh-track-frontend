import axios from "./axios";

const AiAPI = {
    infer: async(image: string) => {
        console.log(`sent image: ${image}`);
        return await axios.request({
            url: "/ai/",
            method: "POST",
            data: {
                image_upload: "RTYEFUHUIVABKBAYUCBYAUVCUTBCGBAVACV",
            },
        });
    }
};

export default AiAPI;