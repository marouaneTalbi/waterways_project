import sendRequest from "../../services/axiosRequestFunction"

const establishmentApi = {
    add: async function ({name, address, city, startDate, endDate}) {
        return sendRequest('/api/addestablishment','post',{name, address, city, startDate, endDate},true)
    },
    getOne: async function (id) {
        return sendRequest('/api/establishments/'+id,'get',{},true)
    },
    edit: async function ({name, address, city, startDate, endDate}, id) {
        return sendRequest('/api/establishments/'+id,'put',{name, address, city, startDate, endDate},true)
    },
    getList: async function (id) {
        return sendRequest(`/api/establishment/${id}/user`, 'get', {}, true);
    },
    search: async function (search) {
        return sendRequest(`/api/establishment/search`, 'get', {}, true, search);
    },
}

export default establishmentApi;