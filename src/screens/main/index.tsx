import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {KAKAO_REST_API_KEY, OPEN_API_KEY} from '@env';
import LocationInput from 'src/components/input/location';
import PlaceModal from 'src/components/modal/place';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/navigation/RootNavigation';
import {Ionicons} from '@expo/vector-icons';
import useAddCoordinatesToShops from 'src/hooks/useCallShops';
import {Thema} from "src/style/thema";
import TheJamsilText from "src/components/fonts/TheJamsil";
import {getDistance} from 'geolib';


// 타입 정의
interface MedicineShop {
    위도: number;
    경도: number;
    name: string;
    isEmergencyMedicine: boolean; // 안전상비의약품 여부
    roadAddress?: string;
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
    const [mapRef, setMapRef] = useState<MapView | null>(null); // MapView 참조 추가

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

    useEffect(() => {
        if (searchedLocation) {
            fetchMedicineShopsByLocation(searchedLocation.latitude, searchedLocation.longitude);
        }
    }, [searchedLocation]);  // searchedLocation이 바뀔 때마다 호출


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

            // 도로명 주소로 위도, 경도를 추가하는 훅 사용
            const shops = data.data.map((shop: any) => ({
                name: shop['업체명'],
                roadAddress: shop['소재지(도로명)'],
                isEmergencyMedicine: shop['업종'] === '안전상비의약품판매업',
                위도: parseFloat(shop['위도']),
                경도: parseFloat(shop['경도']),
            }));

            setMedicineShops(shops); // 상태 업데이트
        } catch (error) {
            console.error('판매업소 데이터 요청 실패:', error);
        }
    };

    const searchPlaces = async (query: string) => {
        try {
            // Ensure proper URL encoding and handle potential special characters
            const encodedQuery = encodeURIComponent(query.trim());

            // Add more detailed logging
            console.log('Search Query:', query);
            console.log('Encoded Query:', encodedQuery);

            const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodedQuery}`;

            // Log the full URL for debugging
            console.log('Full Search URL:', url);

            const response = await fetch(url, {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                    // Optional: Add more headers if needed
                    'Content-Type': 'application/json'
                }
            });

            // Log the raw response status
            console.log('Response Status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Search Request Failed:', errorText);
                throw new Error('검색 실패: ' + errorText);
            }

            const data = await response.json();

            // Log the entire response data for debugging
            console.log('Full Response Data:', JSON.stringify(data, null, 2));

            // Log the number of documents found
            console.log('Documents Count:', data.documents.length);

            const placesData: Place[] = data.documents.map((place: any) => ({
                id: place.id,
                place_name: place.place_name,
                road_address: {
                    address_name: place.road_address_name || '',
                    zone_no: '',
                },
                address_name: place.address_name || '',
                x: place.x,
                y: place.y,
            }));

            // Log the processed places data
            console.log('Processed Places:', placesData);

            setPlaces(placesData);
            setModalVisible(true);
        } catch (error) {
            console.error('장소 검색 실패 (Detailed):', error);
            // Optional: Add user-friendly error handling
            Alert.alert('검색 오류', '장소를 찾을 수 없습니다. 다시 시도해 주세요.');
        }
    };

    const fetchMedicineShopsByLocation = async (latitude: number, longitude: number) => {
        const url = `https://api.odcloud.kr/api/15054008/v1/uddi:0e7f7ae5-94a3-4f56-b01c-d1f15cb02f94?page=1&perPage=10&serviceKey=${OPEN_API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('판매업소 데이터 요청 실패');
            const data = await response.json();

            // 위치에 기반한 상가 데이터를 가져오기
            const medicineShopsWithCoordinates = data.data.map((shop: any) => {
                // 도로명 주소 기반으로 좌표 추가하는 로직
                const shopCoordinates = getCoordinatesForShop(shop['업체명'], shop['소재지(도로명)']);

                return {
                    name: shop['업체명'],
                    roadAddress: shop['소재지(도로명)'],
                    isEmergencyMedicine: shop['업종'] === '안전상비의약품판매업',
                    위도: shopCoordinates?.latitude || latitude,
                    경도: shopCoordinates?.longitude || longitude,
                };
            });

            // 상태 업데이트
            setMedicineShops(medicineShopsWithCoordinates);
        } catch (error) {
            console.error('판매업소 데이터 요청 실패:', error);
        }
    };


    function getCoordinatesForShop(name: string, address: string) {
        const coordinateMap: {[key: string]: {latitude: number, longitude: number}} = {
            'GS25 대구시청점': {latitude: 35.8714, longitude: 128.6014},
            // 다른 상점들의 대략적인 좌표 추가
        };

        return coordinateMap[name];
    }

    const handlePlaceSelect = async (place: Place) => {
        const latitude = parseFloat(place.y);
        const longitude = parseFloat(place.x);

        setSearchedLocation({
            latitude,
            longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        });

        setAddress(place.road_address?.address_name || '도로명 주소 없음');
        setModalVisible(false);

        if (mapRef) {
            mapRef.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }

        await fetchMedicineShopsByLocation(latitude, longitude);
        console.log("지도 이동 및 상가 업데이트 완료");
    };
    const handleNavigateToMedicine = () => {
        navigation.navigate('Medicine'); // 약 정보 제공 스크린으로 이동
    };

    // 안전상비의약품 강조 스타일
    const highlightEmergencyMedicine = (isEmergency: boolean) => {
        return isEmergency
            ? {backgroundColor: Thema.colors.primary[300], padding: 10, borderRadius: 5}
            : {padding: 10, borderRadius: 5};
    };

    const updatedMedicineShops = useAddCoordinatesToShops(medicineShops);

    // 클릭된 상가 위치로 지도 이동
    const handleShopClick = (shop: MedicineShop) => {
        if (mapRef) {
            mapRef.animateToRegion({
                latitude: shop.위도,
                longitude: shop.경도,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                ref={(ref) => setMapRef(ref)}
                region={{
                    latitude: searchedLocation?.latitude || location?.latitude || 37.5665,
                    longitude: searchedLocation?.longitude || location?.longitude || 126.978,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {location && (
                    <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}>
                        <Ionicons name="pin" size={40} color="red"/>
                    </Marker>
                )}
                {updatedMedicineShops.map((shop, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: shop.위도,
                            longitude: shop.경도,
                        }}
                        onPress={() => handleShopClick(shop)}
                    >
                        <Ionicons name="medical" size={40} color={shop.isEmergencyMedicine ? 'green' : 'blue'}/>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.shopListContainer}>
                <FlatList
                    data={updatedMedicineShops}
                    keyExtractor={(item, index) => `${item.위도}_${item.경도}_${index}`}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={[styles.shopItem, highlightEmergencyMedicine(item.isEmergencyMedicine)]}
                            onPress={() => handleShopClick(item)}
                        >
                            <TheJamsilText fontWeight={"Medium"}
                                           fontSize={Thema.fontSize.body}>{item.name}</TheJamsilText>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.infoContainer}>
                <LocationInput
                    onSearch={searchPlaces}
                    placeholder="약국 이름을 검색하세요"
                />
            </View>

            <View style={styles.fab}>
                <TouchableOpacity onPress={handleNavigateToMedicine}>
                    <Ionicons name="medkit" size={30} color="white"/>
                </TouchableOpacity>
            </View>

            <PlaceModal
                visible={modalVisible}
                places={places}
                onSelect={handlePlaceSelect}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    shopListContainer: {
        position: 'absolute',
        top: '60%',
        left: 10,
        right: 10,
        bottom: 10,
        paddingBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        elevation: 5,
    },
    shopItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: Thema.colors.primary[200],
    },
    infoContainer: {
        position: 'absolute',
        top: '6%',
        left: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        elevation: 5,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Thema.colors.primary[400],
        borderRadius: 50,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Main;
