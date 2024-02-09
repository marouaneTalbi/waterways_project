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
    edit: async function (boat) {
        return sendRequest(`/api/boat/${boat.id}`, 'patch', {boat: boat}, true)
    },
    addFavorite: async function (boat) {
        return sendRequest(`api/boat/${boat.id}/addFavorite`, 'post', boat, true)
    },
    getFavorite: async function () {
        return sendRequest(`/api/boat/favorite`, 'get', {}, true)
    },
    deleteFavorite: async function(boat) {
        return sendRequest(`api/boat/${boat.id}/removeFavorite`, 'delete', {}, true)
    }
}

export default boatApi;