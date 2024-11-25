import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {View, Text,} from "react-native";

// Assets
import TheJamsilText from "Components/Font/TheJamsil";
import StunningText from "Components/Font/Stunning";
import Udiyak_Logo from "Assets/Images/Udiyak_Logo.svg";

// File & Folder
import {AuthStackParamList} from "Navigation/AuthNavigation";
import styles from "./style";

type ScreenNavigationProps = StackNavigationProp<AuthStackParamList, "OnBoarding">;


const OnBoarding = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const navigation = useNavigation<ScreenNavigationProps>();

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TheJamsilText fontSize={40} fontWeight={"Bold"}>
                    어디약
                </TheJamsilText>
                <StunningText fontSize={16}>어디서나 쉽고 간편하게</StunningText>
                <StunningText fontSize={16}>안전상비약을 찾아보세요</StunningText>
            </View>
            <StunningText style={{fontSize: 10, color: "#D9D9D9", marginTop: 5}}>
                어디약을 이용하기 위해 로그인 해주세요.
            </StunningText>
            <View style={styles.logoContainer}>
                <Udiyak_Logo/>
            </View>
        </View>
    );
};

export default OnBoarding;
