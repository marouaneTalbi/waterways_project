import sendRequest from "../../services/axiosRequestFunction"

const commentApi = {
    add: async function (commentData) {
        return sendRequest(`/api/comments`, 'post', commentData);
    },
    getList: async function() {
        return sendRequest('/api/comments');
    }
}

export default commentApi;