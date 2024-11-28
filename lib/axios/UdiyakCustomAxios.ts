import axios from 'axios';
import {SERVER_URL} from 'react-native-dotenv'

const udiyakCustomAxios = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchData = async (endpoint: string) => {
    try {
        const response = await udiyakCustomAxios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default udiyakCustomAxios;
