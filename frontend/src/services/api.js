
import axios from 'axios';
const api = axios.create({ baseURL:'http://localhost:8080' });
api.interceptors.request.use(config=>{
 const token=localStorage.getItem('token');
 if(token) config.headers.Authorization=`Bearer ${token}`;
 return config;
});
export const loginUser=(email,password)=>api.post('/auth/login',{email,password});
export const registerUser=(data)=>api.post('/auth/register',data);
export const getLaptops=()=>api.get('/laptops');
export const getProfile=()=>api.get('/users/profile');
export default api;
