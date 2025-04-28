
import axios from "axios";
import {useAuthStore} from "./store/useUserStore";

const BASE_URL = "http://localhost:5000";
const DEFAULT_TIMEOUT = 30000;
const instance=axios.create({
	baseURL:BASE_URL,
	timeout:DEFAULT_TIMEOUT,
	withCredentials:true,
})
instance.interceptors.request.use((config)=>{
	const token=useAuthStore.getState().token;
	if(token){
		config.headers.Authorization=`Bearer ${token}`;
	}
	return config;
})

export default instance;