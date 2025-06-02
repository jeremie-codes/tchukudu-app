import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://api.chukudu.com', // This would be your Laravel backend API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    // Get token from storage (AsyncStorage in real app)
    const token = null; // await AsyncStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Client API calls
export const clientApi = {
  // Get nearby transporters
  getNearbyTransporters: (lat: number, lng: number, radius: number = 5) => {
    return api.get('/transporters/nearby', { params: { lat, lng, radius } });
  },
  
  // Submit a new order
  createOrder: (orderData: any) => {
    return api.post('/orders', orderData);
  },
  
  // Rate a transporter
  rateTransporter: (transporterId: number, rating: number, comment: string = '') => {
    return api.post(`/transporters/${transporterId}/rate`, { rating, comment });
  },
};

// Transporter API calls
export const transporterApi = {
  // Auth
  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (userData: any) => {
    return api.post('/auth/register', userData);
  },
  
  // Profile
  getProfile: () => {
    return api.get('/profile');
  },
  
  updateProfile: (profileData: any) => {
    return api.put('/profile', profileData);
  },
  
  // Availability
  updateAvailability: (isAvailable: boolean) => {
    return api.post('/availability', { isAvailable });
  },
  
  // Orders
  getOrders: (status?: string) => {
    return api.get('/orders', { params: { status } });
  },
  
  getOrderDetails: (orderId: string) => {
    return api.get(`/orders/${orderId}`);
  },
  
  updateOrderStatus: (orderId: string, status: string) => {
    return api.put(`/orders/${orderId}/status`, { status });
  },
  
  // Location
  updateLocation: (lat: number, lng: number) => {
    return api.post('/location', { lat, lng });
  },
};

export default api;