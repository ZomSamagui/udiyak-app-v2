import 'dotenv/config';

export default {
    expo: {
        extra: {
            apiUrl: process.env.GOOGLE_MAP_API_KEY,
            secretKey: process.env.SERVER_URL,
        },
    },
};