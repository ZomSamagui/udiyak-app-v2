import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Thema} from "src/style/thema";

type BackButtonProps = {
    styles?: ViewStyle;
    onPress?: () => void;
}

const BackButton = ({styles, onPress}: BackButtonProps) => {
    const navigation = useNavigation();

    // 기본 스타일과 전달받은 스타일을 병합하고, 전달받은 스타일이 없으면 기본 스타일만 사용하는 코드
    const combinedStyles = StyleSheet.flatten([defaultStyles.backButton, styles || {}]);

    return (
        <TouchableOpacity style={combinedStyles} onPress={onPress || (() => navigation.goBack())}>
            <Feather name="arrow-left" size={24} color="black"/>
        </TouchableOpacity>
    );
};

const defaultStyles = StyleSheet.create({
    backButton: {
        color: Thema.colors.gray[300],
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 8,
        zIndex: 10,
    },
});

export default BackButton;
