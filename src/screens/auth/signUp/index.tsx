import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";

// Assets
import TheJamsilText from "src/components/fonts/TheJamsil";
import StunningText from "src/components/fonts/Stunning";
import { UdiyakButton } from "src/components/button/auth";
import { UdiyakInput } from "src/components/input";

// File & Folder
import {RootStackParamList} from "src/navigation/RootNavigation";
import BackButton from "src/components/button/back";
import { Thema } from "src/style/thema";
import useSignUp from "src/hooks/auth/useSignUp";

type AuthNavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
    const navigation = useNavigation<AuthNavigationProps>();
    const { signUp, loading, error } = useSignUp();

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUp = async () => {
        const { nickname, email, password } = formData;

        if (!nickname || !email || !password) {
            Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
            return;
        }

        try {
            await signUp(email, password, nickname);
            navigation.navigate('Login');
        } catch (e) {
            console.error('회원가입 실패:', e);
        }
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.titleContainer}>
                <TheJamsilText fontSize={Thema.fontSize.Title1} fontWeight={"Bold"}>
                    회원가입
                </TheJamsilText>
                <View style={styles.captionContainer}>
                    <StunningText fontSize={Thema.fontSize.Title2}>어디서나 쉽고 간편하게</StunningText>
                    <StunningText fontSize={Thema.fontSize.Title2}>안전상비약을 찾아보세요</StunningText>
                    <StunningText
                        style={{
                            fontSize: Thema.fontSize.caption,
                            color: Thema.colors.gray["100"],
                            marginTop: 5
                        }}>
                        어디약을 이용하기 위해 회원가입 해주세요.
                    </StunningText>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <UdiyakInput
                    placeholder="닉네임을 입력해주세요."
                    value={formData.nickname}
                    onChangeText={(value) => handleChange('nickname', value)}
                />
                <UdiyakInput
                    keyboardType="email-address"
                    placeholder="이메일을 입력해주세요."
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                />
                <UdiyakInput
                    keyboardType="visible-password"
                    securePassword={true}
                    placeholder="비밀번호를 입력해주세요."
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                />
            </View>
            <UdiyakButton
                style={styles.buttonMargin}
                title={loading ? "회원가입 중..." : "회원가입"}
                onPress={handleSignUp}
                disabled={loading}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 130,
    },
    titleContainer: {
        flex: 0.2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    captionContainer: {
        flex: 0.5,
        marginTop: 5,
    },
    inputContainer: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonMargin: {
        marginTop: 10,
    }
});

export default SignUp;
