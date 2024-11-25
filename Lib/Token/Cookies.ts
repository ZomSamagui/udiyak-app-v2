import CookieManager from '@react-native-cookies/cookies';
import {SERVER_URL} from "react-native-dotenv";

export const setCookie = async (name: string, value: string, path: string = '/') => {
    await CookieManager.set(`${SERVER_URL}`, {
        name,
        value,
        path,
        version: '1',
        expires: '2030-01-01T12:30:00.00-05:00',
    });
};

export const getCookie = async (name: string) => {
    const cookies = await CookieManager.get(`${SERVER_URL}`);
    return cookies[name]?.value;
};

export const clearCookies = async () => {
    await CookieManager.clearAll();
};
