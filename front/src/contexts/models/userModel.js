import sendRequest from "../../services/axiosRequestFunction"

const userApi = {
    getById: async function (id) {
        return sendRequest(`/api/user/${id}`, 'get', {}, true);
    },
    update: async function (userId, user) {
        const userJson = JSON.stringify(user);
        console.log(userJson)
        return sendRequest(`/api/user/${userId}`, 'put', userJson, true);
    },
    get: async function () {
        return sendRequest(`/api/user`, 'get', {}, true);
    },
    getAll: async function () {
        return sendRequest(`/api/users`, 'get', {}, true);
    },
    search: async function (search) {
        return sendRequest(`/api/user/search`, 'get', {}, true, search);
    },
    satisfaction: async function (userId) {
        return sendRequest(`api/user/${userId}/satisfaction`, 'get', {}, true)
    },
    reservation: async function (userId) {
        return sendRequest(`api/user/${userId}/reservation`, 'get', {}, true)
    },
    reservationPassed: async function (userId) {
        return sendRequest(`api/user/${userId}/reservationPassed`, 'get', {}, true)
    },
    gain: async function (userId) {
        return sendRequest(`api/user/${userId}/gain`, 'get', {}, true)
    }
};

export default userApi;