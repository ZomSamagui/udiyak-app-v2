import React from "react";
import {Text, StyleSheet, ActivityIndicator, View} from "react-native";
import {useFonts} from "expo-font";

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

import {Fontlist} from "../../../assets/fonts/Fontlist";

type StunningTextProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
};

export default function StunningText({children, style, fontSize}: StunningTextProps) {

    const [fontsLoaded] = useFonts(Fontlist);


    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    return (
        <Text style={[style, {fontFamily: `Stunning`, fontSize: fontSize}]}>
            {children}
        </Text>
    )
}
