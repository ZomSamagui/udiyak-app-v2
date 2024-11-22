// RN
import React, {useState} from "react";
import {View, TouchableOpacity,} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

// Assets
import TheJamsilText from "components/font/TheJamsil";
import StunningText from "components/font/Stunning";
import Udiyak_Logo from "assets/image/udiyak-Logo.svg"

// File & Folder
import {AuthStackParamList} from "navigation/AuthNavigation";
import styles from "./style"

type ScreenNavigationProps = StackNavigationProp<AuthStackParamList, 'OnBoarding'>

const OnBoarding = () => {

    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const navigation = useNavigation<ScreenNavigationProps>();

    return (
        <View style={styles.container}>
            <TheJamsilText fontSize={40} fontWeight={'Bold'}>어디약</TheJamsilText>
            <View style={styles.subContainer}>
                <StunningText fontSize={16}>어디서나 쉽고 간편하게</StunningText>
                <StunningText fontSize={16}>안전상비약을 찾아보세요</StunningText>
            </View>
            <StunningText style={styles.subTitle} fontSize={10}>어디약을 이용하기 위해 로그인 해주세요.</StunningText>
            <View style={styles.container}>
                <Udiyak_Logo />
            </View>
        </View>
    )
}

export default OnBoarding;
