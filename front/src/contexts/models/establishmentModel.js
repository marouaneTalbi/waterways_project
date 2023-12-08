import sendRequest from "../../services/axiosRequestFunction"

const establishmentApi = {
    getList: async function () {
        return sendRequest(`/api/establishments`, 'get', {}, true);
    }

}

export default establishmentApi;