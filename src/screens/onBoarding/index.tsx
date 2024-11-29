// RN
import React from "react";
import {View, TouchableOpacity, StyleSheet,} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/core";

// Assets
import TheJamsilText from "src/components/fonts/TheJamsil";
import StunningText from "src/components/fonts/Stunning";
import Udiyak_Logo from "src/assets/images/Udiyak_Logo.svg";
import {UdiyakButton} from "src/components/button/auth";

// File & Folder
import {AuthStackParamList} from "src/navigation/AuthNavigation";
import {Thema} from "src/style/thema";


type AuthNavigationProps = StackNavigationProp<AuthStackParamList, 'OnBoarding'>;

const OnBoarding = () => {
    const navigation = useNavigation<AuthNavigationProps>();

    return (
        <View style={styles.container}>
            <View style={styles.title1Container}>
                <TheJamsilText fontSize={40} fontWeight={"Bold"}>
                    어디약
                </TheJamsilText>
                <View style={styles.title2Container}>
                    <StunningText fontSize={16}>어디서나 쉽고 간편하게</StunningText>
                    <StunningText fontSize={16}>안전상비약을 찾아보세요</StunningText>
                </View>
            </View>
            <View style={styles.logoContainer}>
                <Udiyak_Logo/>
            </View>
            <UdiyakButton
                title="로그인"
                onPress={() => navigation.navigate("Login")}
            />
            <View style={styles.signUpContainer}>
                <TheJamsilText fontSize={12} fontWeight={"Regular"}>계정이 없으신가요?</TheJamsilText>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <TheJamsilText
                        fontSize={12}
                        fontWeight={"Medium"}
                        style={[{color: Thema.colors.primary[400]}]}
                    >
                        회원가입하기
                    </TheJamsilText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 130,
    },
    title1Container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    title2Container: {
        marginTop: 5,
    },
    logoContainer: {
        marginVertical: "40%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpContainer: {
        marginTop: 5,
        flexDirection: 'row',
        gap: 4,
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OnBoarding;
