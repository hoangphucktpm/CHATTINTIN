import axios from "axios";

export const http = axios.create({
    timeout: 30000,
    baseURL: "http://172.16.3.223:8080",
});

export const api = {
    login: async (params) => {
        return http.post(`/auth/sign-in`, params);
    },
    register: async (params) => {
        return http.post(`/auth/sign-up`, params);
    },
    checkUserExist: async (params) => {
        return http.post(`/auth/check-existing-user`, params);
    },
    getUserByPhone: async (phone) => {
        return http.get(`/user/get-user/${phone}`);
    },
    updateInfo: async (id, params) => {
        return http.post(`auth/update-info/${id}`, params);
    },
    updatePassword: async (params) => {
        return http.patch(`auth/update-password`, params);
    },
};
