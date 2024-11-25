import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

// Assets
import { FontList } from "Assets/Fonts/fontList";

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    styledText: {
        fontFamily: "Stunning",
        fontSize: 14,
    },
});

type StunningTextProps = {
    children: React.ReactNode;
    style?: any;
    fontSize?: number;
};

export default function StunningText({ children, style, fontSize }: StunningTextProps) {
    const [fontsLoaded] = useFonts(FontList);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Text style={[styles.styledText, style, { fontSize: fontSize || 14 }]}>
            {children}
        </Text>
    );
}
