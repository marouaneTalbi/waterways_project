import sendRequest from "../../services/axiosRequestFunction"

const userApi = {
    update: async function (userId, user) {
        return sendRequest(`/api/users/${userId}`, 'put', user, true);
    },

    get: async function () {
        return sendRequest(`/api/user`, 'get', {}, true);
    },
};

export default userApi;