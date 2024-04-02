import axios  from "axios";


export  const http = axios.create({
    timeout: 30000,
    baseURL: 'http://192.168.1.7:8080'
});

export const apiLogin = {
    login: async (params) => {
        return http.post(`/auth/sign-in`, params);
    },
};
