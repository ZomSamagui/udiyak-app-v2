import React, {useState} from "react";
import {View, StyleSheet, TextInput,} from "react-native";

import {Thema} from "src/style/thema";

type InputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    securePassword?: boolean;
    keyboardType?: "default" | "email-address" | "visible-password";
    returnKeyType?: '완료' | '다음' | '검색하기';
};

export const UdiyakInput = ({
                                placeholder, value, onChangeText, keyboardType = 'default',
                                returnKeyType = '완료', securePassword = false,
                            }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.inputContainer,
                    {fontSize: Thema.fontSize.body, color: Thema.colors.gray["300"],},
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
