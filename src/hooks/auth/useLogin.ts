import {useState} from 'react';
import {Alert} from 'react-native';
import udiyakCustomAxios from 'src/lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse} from "src/type/login.type";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await udiyakCustomAxios.postData<LoginResponse>('/auth/login', {
                email,
                password,
            });

            const {accessToken, refreshToken, user} = response.data || {};

            if (accessToken && refreshToken) {
                const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

                await AsyncStorage.setItem('accessToken', accessToken);
                await AsyncStorage.setItem('refreshToken', refreshToken);
                await AsyncStorage.setItem('tokenExpiration', expirationDate.toString());

                console.log('AccessToken과 RefreshToken 저장 완료');
                Alert.alert('로그인 성공', '로그인에 성공했습니다.');

                setLoading(false);
                return true;
            }

            if (user) {
                console.log('로그인한 사용자:', user);
            } else {
                throw new Error('로그인 응답에 사용자 정보가 없습니다.');
            }

            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || '로그인에 실패했습니다.';
            setError(errorMessage);
            Alert.alert('로그인 오류', errorMessage);
            setLoading(false);
            return false;
        }
    };

    return {login, loading, error};
};

export default useLogin;