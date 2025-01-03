import axios from 'axios';

// URL de base pour l'API Django locale
const apiUrl = "http://localhost:8000/api";

// Configuration de l'instance axios
const api = axios.create({
    baseURL: apiUrl,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;  // Django utilise Token auth
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API endpoints
const userAPI = {
    register: (userData) => api.post('/register/', userData),
    login: (credentials) => api.post('/login/', credentials),
    logout: () => api.post('/logout/'),
};

const trackerAPI = {
    getAll: () => api.get('/trackers/'),
    create: (data) => api.post('/trackers/', data),
    delete: (id) => api.delete(`/trackers/${id}/`),
};

export { userAPI, trackerAPI };
export default api;