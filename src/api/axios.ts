import { Axios } from 'axios';
const baseURL = "http://localhost:8000/api";
// const baseURL = "https://api.fresh-track.com";

const axios = new Axios({
    baseURL: baseURL, // Replace with your API base URL
    timeout: 30000, // Request timeout in milliseconds
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        if(config.data && typeof config.data === 'object' && config.headers['Content-Type'] == 'application/json'){
            config.data = JSON.stringify(config.data);
        }

        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axios;