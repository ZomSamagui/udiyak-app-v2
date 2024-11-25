import React from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { FontList } from "assets/Fonts/fontList";

type TheJamsilTextProps = {
    children: React.ReactNode;
    style?: object;
    fontSize?: number;
    fontWeight?: "Regular" | "Medium" | "Bold";
};

export default function TheJamsilText({ children, style, fontSize, fontWeight = "Bold" }: TheJamsilTextProps) {
    const [fontsLoaded] = useFonts(FontList);

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
