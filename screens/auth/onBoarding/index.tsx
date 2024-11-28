// RN
import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";

// Assets
import TheJamsilText from "components/fonts/TheJamsil";
import StunningText from "components/fonts/Stunning";
import Udiyak_Logo from "assets/images/Udiyak_Logo.svg";
import {UdiyakButton} from "components/button";

// File & Folder
import {AuthStackParamList} from "navigation/AuthNavigation";
import styles from "./style";
import {useNavigation} from "@react-navigation/core";


type AuthNavigationProps = StackNavigationProp<AuthStackParamList, 'OnBoarding'>;

const OnBoarding = () => {
    const navigation = useNavigation<AuthNavigationProps>();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TheJamsilText fontSize={40} fontWeight={"Bold"}>
                    어디약
                </TheJamsilText>
                <View style={styles.captionContainer}>
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
        </View>
    )
}

export default OnBoarding;
