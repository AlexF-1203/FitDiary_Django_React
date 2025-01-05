import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL de base pour l'API Django locale
const apiUrl = 'http://172.25.86.210:8000/api';

// Configuration de l'instance axios
const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API endpoints
const userAPI = {
    register: (userData) => api.post('/user/register/', userData),
    login: (credentials) => api.post('/token/', {
        username: credentials.email.toLowerCase(),
        password: credentials.password
    }),
    logout: () => api.post('/logout/'),
};

const trackerAPI = {
    getAll: () => api.get('/trackers/'),
    create: (data) => api.post('/trackers/', data),
    delete: (id) => api.delete(`/trackers/${id}/`),
};

export { userAPI, trackerAPI };
export default api;
