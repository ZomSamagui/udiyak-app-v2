import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import {FontList} from 'assets/fonts/FontList';

type TheJamsilProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
    fontWeight?: "Bold" | "Medium" | "Regular";
};

export default function TheJamsilText({children, style, fontSize, fontWeight}: TheJamsilProps) {
    const [fontsLoaded] = useFonts(FontList);

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <Text style={[style, {fontFamily: `TheJamsil${fontWeight}`, fontSize: fontSize}]}>
            {children}
        </Text>
    );
}
