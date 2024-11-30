import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Thema} from "src/style/thema";
import TheJamsilText from "src/components/fonts/TheJamsil";

type ButtonProps = {
    title?: string,
    onPress?: () => void,
    disabled?: any,
    style?: any,
};

export const UdiyakButton = ({title = "Text", onPress, disabled, style}: ButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, isPressed && styles.buttonPressed]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
        >
            <TheJamsilText fontSize={18} fontWeight={"Medium"} style={styles.buttonText}>
                {title}
            </TheJamsilText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Thema.colors.primary[400],
        paddingVertical: 12,
        paddingHorizontal: 25,
        width: Thema.width.large,
        height: Thema.height.large,
        borderRadius: Thema.borderRadius.primary,
        elevation: 5,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPressed: {
        backgroundColor: Thema.colors.primary[500],
    },
    buttonText: {
        color: Thema.colors.white,
        fontSize: 16,
        textAlign: "center",
    },
});
