import React from "react";
import {Text, StyleSheet, ActivityIndicator} from "react-native";
import {useFonts} from "expo-font";

type StunningTextProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
};

export default function StunningText({children, style, fontSize}: StunningTextProps) {
    const [fontsLoaded] = useFonts({
        Stunning: require('src/assets/fonts/STUNNINGOTF.otf')
    })

    if (!fontsLoaded) return <ActivityIndicator size="large" color="black"/>;

    return (
        <Text style={[style, {fontFamily: `Stunning`, fontSize: fontSize}]}>
            {children}
        </Text>
    )
}
