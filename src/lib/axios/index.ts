import axios, { AxiosInstance, AxiosError } from 'axios';
import { SERVER_URL } from '@env';
import { Alert } from 'react-native';

class AxiosService {
    private axiosInstance: AxiosInstance;

    constructor() {
        // 프로토콜이 없는 경우 기본값으로 http:// 추가
        const baseURL = SERVER_URL.startsWith('http') ? SERVER_URL : `http://${SERVER_URL}`;

        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request Interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                console.error('요청 에러:', error);
                return Promise.reject(error);
            }
        );

        // Response Interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                console.error('응답 에러:', error);

                if (error.response) {
                    const { status, data } = error.response;
                    const message = (data as any)?.message || '알 수 없는 오류 발생';

                    switch (status) {
                        case 400:
                            Alert.alert('요청 오류', message);
                            break;
                        case 401:
                            Alert.alert('인증 오류', '로그인이 필요합니다.');
                            break;
                        case 403:
                            Alert.alert('권한 오류', '접근 권한이 없습니다.');
                            break;
                        case 404:
                            Alert.alert('요청 오류', '요청하신 리소스를 찾을 수 없습니다.');
                            break;
                        case 500:
                            Alert.alert('서버 오류', '서버에서 문제가 발생했습니다.');
                            break;
                        default:
                            Alert.alert('오류', message);
                    }
                } else if (error.request) {
                    Alert.alert('네트워크 오류', '서버와 통신이 원활하지 않습니다.');
                } else {
                    Alert.alert('오류', error.message || '알 수 없는 오류 발생');
                }

                return Promise.reject(error);
            }
        );
    }

    // GET 요청 함수
    public async fetchData<T>(endpoint: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    // POST 요청 함수
    public async postData<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}

const udiyakCustomAxios = new AxiosService();

export default udiyakCustomAxios;
