import { LoginProps, RegisterProps } from "@/types";
import axios from "./axios";

const AuthAPI = {
    register: async(data: RegisterProps) => {
        return await axios.request({
            url: "/register",
            method: "POST",
            data
        });
    },

    login: async(data: LoginProps) => {
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