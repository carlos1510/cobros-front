import { jwtDecode } from "jwt-decode";
//import { tokenKey, userName, rol } from "./constants";
//import Cookies from 'js-cookie';
import axios from "axios";

interface UserTokenData {
    tokenType: 'refresh' | 'token' | '';
    iat: number;
    exp: number;
    user: User;
}

interface User {
    id: number;
    fullName: string;
    numberDocument: string;
    role: string;
    isActive: boolean;
    username: string;
}

const userTokenData: UserTokenData = {
    tokenType: '',
    iat: 0,
    exp: 0,
    user: {
        id: 0,
        fullName: '',
        numberDocument: '',
        role: '',
        isActive: false,
        username: ''
    }
}

//const savedToken = Cookies.get('access_token')?jwtDecode(Cookies.get('access_token')):userTokenData;
//const savedRefreshToken = Cookies.get('refresh_token')?jwtDecode(Cookies.get('refresh_token')):userTokenData;
const savedToken = window.localStorage.getItem('cobros_access_token')?jwtDecode(window.localStorage.getItem('cobros_access_token')):userTokenData;
const savedRefreshToken = window.localStorage.getItem('cobros_refresh_token')?jwtDecode(window.localStorage.getItem('cobros_refresh_token')):userTokenData;

export const authProvider = {
    token: savedToken,
    refresh: savedRefreshToken,
    isAuthenticated: savedToken.exp===0?false:true,
    async login(username, password){
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/auth/login`, 
                { username, password }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Habilita el envío y recepción de cookies
                }
            );

            console.log(response);
            
            if(response.data.ok === true) {
                authProvider.isAuthenticated = true;
                //authProvider.token = Cookies.get('access_token')?jwtDecode(Cookies.get('access_token')):userTokenData;
                //authProvider.refresh = Cookies.get('refresh_token')?jwtDecode(Cookies.get('refresh_token')):userTokenData;
                //authProvider.token = response.data.token;
                authProvider.token = jwtDecode(response.data.token);
                authProvider.refresh = jwtDecode(response.data.refresh);

                window.localStorage.setItem('cobros_access_token', response.data.token);
                window.localStorage.setItem('cobros_refresh_token', response.data.refresh);
            }
        } catch (error) {
            console.error("Error during login:", error); // Manejo de errores
            throw error; // Propaga el error para manejarlo en el lugar de la llamada
        }
    },
    async logout(){
        window.localStorage.removeItem('cobros_access_token');
        window.localStorage.removeItem('cobros_refresh_token');

        authProvider.isAuthenticated = false;
        authProvider.token = null;
        authProvider.refresh = null;
    }
}
//const savedToken = document.cookie;

//export default savedToken;
//console.log(savedToken);