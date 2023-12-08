import sendRequest, { currentUser } from "../../services/axiosRequestFunction";

const EstablishmentApi = {
    add: async function ({name, address, startDate, endDate}) {
        return sendRequest('/api/addestablishment','post',{name, address, startDate, endDate},true)
    },
    getAll: async function () {
        return sendRequest('/api/establishments','get',{},true)
    },
    getOne: async function (id) {
        return sendRequest('/api/establishments/'+id,'get',{},true)
    }
};

export default EstablishmentApi;



