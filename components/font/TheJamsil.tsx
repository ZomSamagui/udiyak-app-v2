import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Fontlist } from "assets/fonts/Fontlist";

type TheJamsilTextProps = {
    children: React.ReactNode;
    style?: object;
    fontSize?: number;
    fontWeight?: "Regular" | "Medium" | "Bold";
};

export default function TheJamsilText({ children, style, fontSize, fontWeight = "Bold" }: TheJamsilTextProps) {
    const [fontsLoaded] = useFonts(Fontlist);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Text style={[style, { fontFamily: `TheJamsil${fontWeight}`, fontSize }]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
