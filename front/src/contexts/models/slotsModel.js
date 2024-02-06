import sendRequest from "../../services/axiosRequestFunction"

const slotsApi = {
    getList: async function () {
        return sendRequest(`/api/slots`, 'get', {}, true);
    },
    add: async function (slots) {
        return sendRequest('/api/slots','post', slots,true)
    },
    getOne: async function (id) {
        return sendRequest('/api/slots'+id,'get',{},true)
    },
    delete: async function (id) {
        return sendRequest(`/api/slots/${id}`, 'delete', {}, true);
    }

}

export default slotsApi;