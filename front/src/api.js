import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:8001', // Assurez-vous que cela correspond à l'URL de votre serveur Symfony
});

export default api;