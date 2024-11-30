import axios, { AxiosInstance } from 'axios';
import { SERVER_URL } from '@env';

class AxiosService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: SERVER_URL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SERVER_URL}`,
            },
        });
    }

    // GET 요청 함수
    public async fetchData<T>(endpoint: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error?.response?.data?.message || '알 수 없는 오류 발생');
        }
    }

    // POST 요청 함수
    public async postData<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error?.response?.data?.message || '알 수 없는 오류 발생');
        }
    }
}

const udiyakCustomAxios = new AxiosService();

export default udiyakCustomAxios;
