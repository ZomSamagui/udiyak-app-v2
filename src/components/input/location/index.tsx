import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { Thema } from "src/style/thema";

interface LocationInputProps {
    onSearch: (query: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);  // 입력된 텍스트를 onSearch 함수에 전달
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ width: "100%", height: 50, borderRadius: 5, borderColor: Thema.colors.gray[200], borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="장소 또는 도로명을 입력하세요"
                value={query}
                onChangeText={setQuery}
            />
            <Button title="검색" onPress={handleSearch} />
        </View>
    );
};

export default LocationInput;
