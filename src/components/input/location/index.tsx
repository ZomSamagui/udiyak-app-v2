import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import {Thema} from "../../../style/thema";

interface LocationInputProps {
    onSearch: (query: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ width:"100%", height: 50, borderRadius: 5, borderColor: Thema.colors.gray[200], borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="장소를 입력하세요"
                value={query}
                onChangeText={setQuery}
            />
            <Button title="검색" onPress={handleSearch} />
        </View>
    );
};

export default LocationInput;
