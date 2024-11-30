import { useState } from 'react';
import { Alert } from 'react-native';
import udiyakCustomAxios from 'src/lib/axios';
import { SignUpResponse, User } from "src/type/signup.type";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async (email: string, password: string, nickname: string) => {
        setLoading(true);
        setError(null);

        if (password.length < 10) {
            Alert.alert('비밀번호 오류', '비밀번호는 최소 10자리 이상이어야 합니다.');
            setLoading(false);
            return;
        }

        try {
            const response = await udiyakCustomAxios.postData<SignUpResponse>('/auth/register', {
                email,
                password,
                nickname,
            });

            const user = response?.data?.user;
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;

            console.log('회원가입 성공:', user);

            if (user) {
                Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');

                if (accessToken && refreshToken) {
                    const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7일 후

                    await AsyncStorage.setItem('accessToken', accessToken);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    await AsyncStorage.setItem('tokenExpiration', expirationDate.toString());

                    console.log('AccessToken과 RefreshToken 저장 완료');
                }
            } else {
                throw new Error('회원가입 응답에 사용자 정보가 없습니다.');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || '회원가입에 실패했습니다.';
            setError(errorMessage);
            Alert.alert('회원가입 오류', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { signUp, loading, error };
};

export default useSignUp;
