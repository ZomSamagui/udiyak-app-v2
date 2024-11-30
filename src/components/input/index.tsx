import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Thema } from "src/style/thema";

type InputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    securePassword?: boolean;
    keyboardType?: "default" | "email-address" | "visible-password";
    returnKeyType?: 'done' | 'next' | 'search' | 'go' | 'send' | 'previous' | 'default';
};

export const UdiyakInput = ({
                                placeholder, value, onChangeText, keyboardType = 'default',
                                returnKeyType = 'done', securePassword = false,
                            }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(securePassword);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.inputContainer,
                    { fontSize: Thema.fontSize.body, color: Thema.colors.gray["300"] },
                    isFocused ? styles.focused : styles.unfocused,
                ]}
                placeholder={placeholder}
                placeholderTextColor={Thema.colors.gray[300]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={showPassword}
                keyboardType={keyboardType === "visible-password" ? "default" : keyboardType}
                returnKeyType={returnKeyType}
            />
            {securePassword && (
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={Thema.colors.gray["300"]}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 8,
        position: 'relative',
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
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: '27%',
        transform: [{ translateY: -12 }],
    },
});
