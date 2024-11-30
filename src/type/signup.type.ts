export interface User {
    id: number;
    email: string;
    nickname: string;
}

export interface SignUpResponse {
    status: number;
    message: string;
    data: {
        user: User;
    };
}