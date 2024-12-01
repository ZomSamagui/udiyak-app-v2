import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";

// Assets
import TheJamsilText from "src/components/fonts/TheJamsil";
import StunningText from "src/components/fonts/Stunning";
import {UdiyakButton} from "src/components/button/auth";
import {UdiyakInput} from "src/components/input";

// File & Folder
import {RootStackParamList} from "src/navigation/RootNavigation";
import BackButton from "src/components/button/back";
import {Thema} from "src/style/thema";
import useLogin from "src/hooks/auth/useLogin";

type RootNavigationProps = StackNavigationProp<RootStackParamList, "OnBoarding">;

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {loading, login, error} = useLogin();

    const navigation = useNavigation<RootNavigationProps>();

    useEffect(() => {
        if (error) {
            Alert.alert('로그인 오류', error);
        }
    }, [error]);

    const handleSignUp =  () => {
        navigation.navigate("SignUp")
    }


    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) return Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
        const loginResult = await login(email, password);

        if (loginResult){
            console.log("navigate to Main")
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }]
            });
        }
    }

    return (
        <View style={styles.container}>
            <BackButton styles={styles.backButton}/>
            <View style={styles.titleContainer}>
                <TheJamsilText fontSize={40} fontWeight={"Bold"}>
                    로그인
                </TheJamsilText>
                <View style={styles.captionContainer}>
                    <StunningText fontSize={16}>어디서나 쉽고 간편하게</StunningText>
                    <StunningText fontSize={16}>안전상비약을 찾아보세요</StunningText>
                    <StunningText style={{fontSize: 10, color: "#D9D9D9", marginTop: 5}}>
                        어디약을 이용하기 위해 로그인 해주세요.
                    </StunningText>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <UdiyakInput
                    keyboardType={"email-address"}
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChangeText={setEmail}
                />
                <UdiyakInput
                    keyboardType={'visible-password'}
                    securePassword={true}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <UdiyakButton
                title={loading ? '로그인 중...' : '로그인'}
                onPress={handleLogin}
                disabled={loading}
            />
            <View style={styles.signUpContainer}>
                <TheJamsilText fontSize={12} fontWeight={"Regular"}>
                    계정이 없으신가요?
                </TheJamsilText>
                <TouchableOpacity onPress={handleSignUp}>
                    <TheJamsilText
                        fontSize={12}
                        fontWeight={"Medium"}
                        style={{color: Thema.colors.primary[400]}}
                    >
                        회원가입하기
                    </TheJamsilText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 50,
        paddingTop: 130,
    },
    titleContainer: {
        flex: 0.2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 12,
        paddingTop: 10,
    },
    captionContainer: {
        marginTop: 5,
    },
    inputContainer: {
        flex: 0.25,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    signUpContainer: {
        flexDirection: "row",
        flex: 0.1,
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        marginTop: 2,
    }
});

export default Login;
