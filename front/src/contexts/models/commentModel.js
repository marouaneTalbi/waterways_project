import sendRequest from "../../services/axiosRequestFunction"

const commentApi = {
    add: async function (commentData) {
        return sendRequest(`/api/comments`, 'post', commentData);
    },
    getList: async function() {
        return sendRequest('/api/comments');
    },
    delete: async function (id) {
        return sendRequest(`/api/comments/${id}`, 'delete', {}, true);
    }
}

export default commentApi;