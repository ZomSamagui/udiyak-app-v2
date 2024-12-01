import React, { createContext, useState, useContext, ReactNode } from 'react';

// 인증 상태 타입 정의
interface AuthContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// 기본 값 정의
const defaultAuthContext: AuthContextType = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
};

// Context 생성
export const AuthContext = createContext<AuthContextType>(defaultAuthContext); // AuthContext를 export

// Provider 컴포넌트
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = (email: string, password: string) => {
        // 로그인 로직 (예시로 간단히 상태만 변경)
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 인증 관련 정보 사용을 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);
