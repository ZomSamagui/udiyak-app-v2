import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Thema} from "src/style/thema";

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="black"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
