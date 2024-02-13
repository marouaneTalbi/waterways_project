import sendRequest from "../../services/axiosRequestFunction"

const noteApi = {
    getNotesList: async function() {
        return sendRequest(`/api/notes`, 'GET');
    }
}

export default noteApi;