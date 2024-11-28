// RN
import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";

// Assets
import TheJamsilText from "src/components/fonts/TheJamsil";
import StunningText from "src/components/fonts/Stunning";
import Udiyak_Logo from "src/assets/images/Udiyak_Logo.svg";
import {UdiyakButton} from "src/components/button";

// File & Folder
import {AuthStackParamList} from "src/navigation/AuthNavigation";
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 50,
        paddingTop: 130,
    },
    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    captionContainer: {
        marginTop: 5,
    },
    logoContainer: {
        marginVertical: "40%",
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OnBoarding;
