import { useState, useEffect } from 'react';
import { KAKAO_REST_API_KEY } from '@env';

interface MedicineShop {
    위도: number;
    경도: number;
    name: string;
    isEmergencyMedicine: boolean; // 안전상비의약품 여부
    roadAddress?: string;
}

const useAddCoordinatesToShops = (shops: MedicineShop[]) => {
    const [updatedShops, setUpdatedShops] = useState<MedicineShop[]>([]);

    useEffect(() => {
        const fetchCoordinates = async (roadAddress: string) => {
            try {
                const response = await fetch(
                    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(roadAddress)}`,
                    {
                        headers: {
                            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
                        },
                    }
                );
                const data = await response.json();
                if (data.documents.length > 0) {
                    const { x, y } = data.documents[0].address;
                    return { latitude: parseFloat(y), longitude: parseFloat(x) };
                }
                return null;
            } catch (error) {
                console.error('위도 경도 검색 실패:', error);
                return null;
            }
        };

        const addCoordinatesToShops = async () => {
            const shopsWithCoordinates = await Promise.all(
                shops.map(async (shop) => {
                    const coordinates = await fetchCoordinates(shop.roadAddress || "");
                    if (coordinates) {
                        return {
                            ...shop,
                            위도: coordinates.latitude,
                            경도: coordinates.longitude,
                        };
                    }
                    return shop;
                })
            );
            setUpdatedShops(shopsWithCoordinates);
        };

        if (shops.length > 0) {
            addCoordinatesToShops();
        }
    }, [shops]);

    return updatedShops;
};

export default useAddCoordinatesToShops;
