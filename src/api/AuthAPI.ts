import axios from "./axios";

const AuthAPI = {
    register: async(data: {
        email: string;
        username: string;
        password: string;
        confirm_password: string;
    }) => {
        return await axios.request({
            url: "/register",
            method: "POST",
            data
        });
    },

    login: async(data: {
        username: string;
        password: string;
    }) => {
        return await axios.request({
            url: "/login",
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        });
    }
    
};

export default AuthAPI;