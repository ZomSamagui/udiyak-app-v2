import React from "react";
import {Text, StyleSheet} from "react-native";
import {useFonts} from "expo-font";
import {FontList} from "assets/fonts/FontList";

type StunningProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
    fontWeight?: "Bold" | "Medium" | "Regular";
};

export default function StunningText({children, style, fontSize, fontWeight}: StunningProps) {
    const [fontsLoaded] = useFonts(FontList);

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <Text style={[style, {fontFamily: `Stunning`, fontSize: fontSize}]}>
            {children}
        </Text>
    )
}
