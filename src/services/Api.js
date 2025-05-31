import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.data){
            const apiError = error.response.data;

            return Promise.reject(apiError);
        }

        return Promise.reject({
            message: "Server connection failed!",
            code: "NETWORK_ERROR"
        })
    }
);

export default api;