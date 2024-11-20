import React from "react";
import {Text, StyleSheet, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";

type TheJamsilTextProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
    fontWeight?: "Regular" | "Medium" | "Bold";
};

export default function TheJamsilText({children, style, fontSize, fontWeight = `Bold`}: TheJamsilTextProps) {
    const [fontsLoaded] = useFonts({
        TheJamsilBold: require('src/assets/fonts/TheJamsilBold.otf'),
        TheJamsilMedium: require('src/assets/fonts/TheJamsilMedium.otf'),
        TheJamsilRegular: require('src/assets/fonts/TheJamsilRegular.otf'),
    });

    if (!fontsLoaded) return <ActivityIndicator size="large" color="#0000ff"/>;

    return (
        <Text style={[style, {fontFamily: `TheJamsil${fontWeight}`, fontSize: fontSize}]}>
            {children}
        </Text>
    )
}
