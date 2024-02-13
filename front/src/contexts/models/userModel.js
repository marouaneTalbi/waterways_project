import sendRequest from "../../services/axiosRequestFunction"

const userApi = {
    getById: async function (id) {
        return sendRequest(`/api/user/${id}`, 'get', {}, true);
    },
    update: async function (userId, user) {
        return sendRequest(`/api/users/${userId}`, 'put', user, true);
    },
    get: async function () {
        return sendRequest(`/api/user`, 'get', {}, true);
    },
    getAll: async function () {
        return sendRequest(`/api/users`, 'get', {}, true);
    },
    search: async function (search) {
        return sendRequest(`/api/user/search`, 'get', {}, true, search);
    }
};

export default userApi;