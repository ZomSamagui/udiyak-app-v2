import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { FontList } from "Assets/Fonts/fontList";

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    styledText: {
        fontSize: 14,
    },
});

type TheJamsilTextProps = {
    children: React.ReactNode;
    style?: object;
    fontSize?: number;
    fontWeight?: "Regular" | "Medium" | "Bold";
};

export default function TheJamsilText({
                                          children,
                                          style,
                                          fontSize,
                                          fontWeight = "Bold",
                                      }: TheJamsilTextProps) {
    const [fontsLoaded] = useFonts(FontList);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Text
            style={[
                styles.styledText,
                style,
                { fontFamily: `TheJamsil${fontWeight}`, fontSize: fontSize || 14 },
            ]}
        >
            {children}
        </Text>
    );
}
