import sendRequest from "../../services/axiosRequestFunction"

const boatApi = {
    add: async function (boat) {
        return sendRequest(`/api/addboat`, 'post', boat, true);
    },
    getList: async function () {
        return sendRequest(`/api/boats`, 'get', {}, true);
    },
    search: async function (search) {
        return sendRequest(`/api/search`, 'get', {}, true, search);
    },
    get: async function (id) {
        return sendRequest(`api/boat/${id}`, 'get', {}, true)
    },
    edit: async function (boat, id) {
        return sendRequest(`/api/boat/${id}?_method=PUT`, 'post', boat, true)
    }
}

export default boatApi;