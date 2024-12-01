import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity, Button } from 'react-native';
import BackButton from 'src/components/button/back';
import useMedicineInformation from 'src/hooks/medicine/useMedicineInformation';
import StunningText from 'src/components/fonts/Stunning';
import { Thema } from 'src/style/thema';
import { medicineProps } from 'src/type/medicine.type';

const Medicine = () => {
    const { medicines, loading, error } = useMedicineInformation();
    const [selectedMedicine, setSelectedMedicine] = useState<medicineProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (medicine: medicineProps) => {
        setSelectedMedicine(medicine);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedMedicine(null);
        setModalVisible(false);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <BackButton />
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>로딩 중...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <BackButton />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* BackButton을 FlatList 외부로 배치 */}
            <View style={styles.headerContainer}>
                <BackButton />
            </View>

            <FlatList
                data={medicines}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)} style={styles.medicineItem}>
                        <StunningText fontSize={Thema.fontSize.Title2} style={styles.medicineName}>
                            {item.name}
                        </StunningText>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedMedicine && (
                            <>
                                <StunningText style={styles.modalTitle}>{selectedMedicine.name}</StunningText>
                                <Text style={styles.modalDetail}>사용 용도: {selectedMedicine.usage}</Text>
                                <Text style={styles.modalDetail}>효과: {selectedMedicine.efficacy}</Text>
                                <Text style={styles.modalDetail}>복용 방법: {selectedMedicine.dosage}</Text>
                                <Text style={styles.modalDetail}>주의사항: {selectedMedicine.precautions}</Text>
                            </>
                        )}
                        <Button title="닫기" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 20,
        marginTop: 50
    },
    medicineItem: {
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    medicineName: {
        fontSize: 20,
        marginBottom: 10,
        color: '#2b2b2b',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDetail: {
        marginTop: 5,
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
});

export default Medicine;
