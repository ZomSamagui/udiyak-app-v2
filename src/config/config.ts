import dotenv from 'dotenv';
import {SERVER_URL} from "react-native-dotenv";

dotenv.config();

interface Config {
    serverUrl: string;
}

const serverUrl = process.env.SERVER_URL;

if (!serverUrl) throw new Error('서버 주소를 찾을 수 없음.');

const config: Config = {
    serverUrl,
}

export default config;