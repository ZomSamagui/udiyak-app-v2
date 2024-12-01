import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {KAKAO_REST_API_KEY, OPEN_API_KEY} from "@env";
import LocationInput from 'src/components/input/location';
import PlaceModal from 'src/components/modal/place';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/navigation/RootNavigation';
import {Ionicons} from '@expo/vector-icons';

// 타입 정의
interface MedicineShop {
    위도: number;
    경도: number;
    [key: string]: any;
}

interface Place {
    id?: string;
    place_name: string;
    road_address: {
        address_name: string;
        zone_no?: string;
    } | null;
    address_name: string;
    x: string;
    y: string;
}

type RootNavigationProps = StackNavigationProp<RootStackParamList, 'Main'>;

const Main = () => {
    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [searchedLocation, setSearchedLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [medicineShops, setMedicineShops] = useState<MedicineShop[]>([]);

    const navigation = useNavigation<RootNavigationProps>();

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation.coords);
                await fetchAddress(currentLocation.coords.latitude, currentLocation.coords.longitude);
                await fetchMedicineShops();
            }
        })();
    }, []);

    const fetchAddress = async (latitude: number, longitude: number) => {
        try {
            const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                },
            });

            if (!response.ok) {
                console.error('주소 요청 실패');
                setAddress('주소 검색 실패');
                return;
            }

            const data = await response.json();
            const addressInfo = data.documents[0]?.address?.address_name || '주소를 찾을 수 없습니다.';
            const roadAddressInfo = data.documents[0]?.road_address?.address_name;
            setAddress(roadAddressInfo ? `${roadAddressInfo} (${addressInfo})` : addressInfo);
        } catch (error) {
            console.error('주소 요청 실패:', error);
            setAddress('주소 검색 실패');
        }
    };

    const fetchMedicineShops = async () => {
        const url = `https://api.odcloud.kr/api/15054008/v1/uddi:0e7f7ae5-94a3-4f56-b01c-d1f15cb02f94?page=1&perPage=10&serviceKey=${OPEN_API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('판매업소 데이터 요청 실패');
            const data = await response.json();
            const filteredShops = data.data.filter((shop: any) => shop['위도'] && shop['경도']);
            const convertedShops = filteredShops.map((shop: any) => ({
                ...shop,
                위도: parseFloat(shop['위도']),
                경도: parseFloat(shop['경도']),
            }));
            setMedicineShops(convertedShops);
        } catch (error) {
            console.error('판매업소 데이터 요청 실패:', error);
        }
    };

    const searchPlaces = async (query: string) => {
        try {
            const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`;
            const response = await fetch(url, {
                headers: {Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`},
            });

            if (!response.ok) throw new Error('검색 실패');
            const data = await response.json();
            const placesData: Place[] = data.documents.map((place: any) => ({
                ...place,
                road_address: place.road_address || null,
                address_name: place.address_name || '',
            }));

            setPlaces(placesData);
            setModalVisible(true);
        } catch (error) {
            console.error('장소 검색 실패:', error);
        }
    };

    const handlePlaceSelect = (place: Place) => {
        setSearchedLocation({
            latitude: parseFloat(place.y),
            longitude: parseFloat(place.x),
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        });
        setModalVisible(false);
    };

    const handleNavigateToMedicine = () => {
        navigation.navigate('Medicine');
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: searchedLocation?.latitude || location?.latitude || 37.5665,
                    longitude: searchedLocation?.longitude || location?.longitude || 126.978,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                    >
                        <Ionicons name="pin" size={40} color="red" />
                    </Marker>
                )}
                {medicineShops.map((shop, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: shop.위도,
                            longitude: shop.경도,
                        }}
                    >
                        <Ionicons name="medical" size={40} color="blue" />
                    </Marker>
                ))}
            </MapView>
            <View style={styles.infoContainer}>
                <Text>현재 위치: {address || '주소를 불러오는 중...'}</Text>
                <LocationInput onSearch={searchPlaces} />
            </View>
            <PlaceModal
                visible={modalVisible}
                places={places}
                onSelect={handlePlaceSelect}
                onClose={() => setModalVisible(false)}
            />
            <TouchableOpacity style={styles.fab} onPress={handleNavigateToMedicine}>
                <Ionicons name="medkit" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '70%',
    },
    infoContainer: {
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: 'blue',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
});

export default Main;
