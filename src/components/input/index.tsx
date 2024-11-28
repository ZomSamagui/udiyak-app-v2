import React, {useState} from "react";
import {View, StyleSheet, TextInput, UIManager, LayoutAnimation} from "react-native";

import {Thema} from "src/style/thema";
import {Platform} from "expo-modules-core";

type InputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
};

export const UdiyakInput = ({placeholder, value, onChangeText}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    [styles.inputContainer],
                    isFocused ? styles.focused : styles.unfocused,
                ]}
                placeholder={placeholder}
                placeholderTextColor={Thema.colors.gray[300]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 8,
    },
    inputContainer: {
        width: Thema.width.large,
        height: Thema.height.large,
        padding: 12,
        borderRadius: Thema.borderRadius.small,
        borderWidth: 1,
        fontSize: 16,
        fontFamily: "TheJamsilMedium",
    },
    focused: {
        borderColor: Thema.colors.primary[400],
        color: Thema.colors.gray[300],
    },
    unfocused: {
        borderColor: Thema.colors.gray[300],
        color: Thema.colors.gray[300],
    },
});
