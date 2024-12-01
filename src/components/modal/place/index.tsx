import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Place } from 'src/type/place.type';

interface PlaceModalProps {
    visible: boolean;
    places: Place[];
    onSelect: (place: Place) => void;
    onClose: () => void;
}

const PlaceModal = ({ visible, places, onSelect, onClose }: PlaceModalProps) => (
    <Modal visible={visible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                <FlatList
                    data={places}
                    keyExtractor={(item) => item.id || item.place_name}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSelect(item)}>
                            <Text style={{ padding: 10 }}>{item.place_name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity onPress={onClose}>
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>닫기</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

export default PlaceModal;
