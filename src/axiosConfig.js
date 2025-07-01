import axios from 'axios';

// Create Axios instance
const instance = axios.create({
  baseURL: 'http://192.168.1.143:8085/api', // ✅ Adjust to your backend IP/port
});

// ✅ Request Interceptor - attach token to all requests
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`; // ✅ Use backticks
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;