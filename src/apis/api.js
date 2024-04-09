import axios from "axios";

export const myIP = '192.168.1.15'

export const http = axios.create({
  // timeout: 30000,
  baseURL: `http://${myIP}:8080`,
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
  resetPassword: async (params) => {
    return http.post(`auth/reset-password`, params);
  },
  getAllFriendRequests: (id) => http.get(`user/get-all-friend-requests/${id}`, {id}),
  handleFriendRequest: ({ id, type }) => http.post('user/process-friend-request',{ id, type }),
  handleSendFriendRequest: ({ senderId, receiverId }) => http.post('user/send-friend-request',{ senderId, receiverId }),
  getAllFriends: (username) => http.post(`conversation/get-list-friend`, {username}),
};
