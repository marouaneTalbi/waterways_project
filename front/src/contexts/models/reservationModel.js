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
    }

}

export default ReservationApi;