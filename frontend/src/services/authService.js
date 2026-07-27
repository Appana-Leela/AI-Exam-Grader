import api from "../api/axios";

const authService = {

    register(data) {
        return api.post("/auth/register", data);
    },

    login(data) {
        return api.post("/auth/login", data);
    },

    forgotPassword(email) {
        return api.post("/auth/forgot-password", {
            email,
        });
    },

    resetPassword(data) {
        return api.post("/auth/reset-password", data);
    },

    refreshToken(refreshToken) {
        return api.post("/auth/refresh-token", {
            refreshToken,
        });
    }

};

export default authService;