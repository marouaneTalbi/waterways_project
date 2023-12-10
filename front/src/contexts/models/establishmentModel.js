import sendRequest from "../../services/axiosRequestFunction"

const establishmentApi = {
    getList: async function () {
        return sendRequest(`/api/establishments`, 'get', {}, true);
    },
    add: async function ({name, address, startDate, endDate}) {
        return sendRequest('/api/addestablishment','post',{name, address, startDate, endDate},true)
    },
    getOne: async function (id) {
        return sendRequest('/api/establishments/'+id,'get',{},true)
    }
}

export default establishmentApi;