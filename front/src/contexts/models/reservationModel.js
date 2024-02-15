import sendRequest from "../../services/axiosRequestFunction"

const ReservationApi = {
    getList: async function () {
        return sendRequest(`/api/reservations`, 'get', {}, true);
    },
    add: async function (slots) {
        return sendRequest('/api/reservation','post', slots,true)
    },
    delete: async function (id) {
        return sendRequest(`/api/reservation/${id}`, 'delete', {}, true);
    },
    getSlots: async function (id) {
        return sendRequest(`/api/reservation/display/${id}`, 'get', {}, true);
    },
    getHistory: async function (id) {
        return sendRequest(`/api/history/${id}`, 'get', {}, true);
    },
    getBoat: async function (id) {
        return sendRequest(`/api/reservation/${id}/boat`, 'get', {}, true);
    }
}

export default ReservationApi;