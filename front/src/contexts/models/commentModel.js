import sendRequest from "../../services/axiosRequestFunction"

const commentApi = {
    add: async function (commentData) {
        return sendRequest(`/api/addcomment`, 'post', commentData);
    },
    getList: async function(id) {
        return sendRequest(`/api/boat/${id}/comments`);
    },
    getAll: async function() {
        return sendRequest(`/api/comments`);
    },
    delete: async function (id) {
        return sendRequest(`/api/comment/${id}`, 'delete', {}, true);
    }
}

export default commentApi;