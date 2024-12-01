import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Thema } from "src/style/thema";

interface LocationInputProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const LocationInput = ({ onSearch }: LocationInputProps) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="장소 또는 도로명을 입력하세요"
                value={query}
                onChangeText={setQuery}
                placeholderTextColor={Thema.colors.gray[300]}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>검색</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: Thema.colors.gray[200],
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: Thema.colors.white,
        marginRight: 10,
    },
    button: {
        backgroundColor: Thema.colors.primary[400],
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonText: {
        color: Thema.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LocationInput;
