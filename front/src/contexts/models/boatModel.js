import sendRequest from "../../services/axiosRequestFunction"

const boatApi = {
    add: async function (boat) {
        return sendRequest(`/api/addboat`, 'post', boat, true);
    },
    getList: async function () {
        return sendRequest(`/api/boats`, 'get', {}, true);
    }

}

export default boatApi;