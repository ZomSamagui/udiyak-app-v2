import { SERVER_URL, GOOGLE_MAP_API_KEY, MEDICINES_API_KEY } from "@env";

interface Config {
    SERVER_URL: string;
    GOOGLE_MAP_API_KEY: string;
    MEDICINES_API_KEY: string;
}


if (!SERVER_URL) throw new Error('서버 주소를 찾을 수 없음.');
if (!GOOGLE_MAP_API_KEY) throw new Error('구글 API 에러');
if (!MEDICINES_API_KEY) throw new Error('약 API 에러');

const config: Config = {
    SERVER_URL,
    GOOGLE_MAP_API_KEY,
    MEDICINES_API_KEY,
};

export default config;
