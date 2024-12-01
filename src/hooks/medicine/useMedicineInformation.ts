import { useState, useEffect } from "react";
import udiyakCustomAxios from "src/lib/axios";
import { medicineProps } from "src/type/medicine.type";

interface BaseResponse<T> {
    data: T,
    status: number;
}

const useMedicineInformation = () => {
    const [medicines, setMedicines] = useState<medicineProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const response = await udiyakCustomAxios.getData<BaseResponse<medicineProps[]>>('/medicine', {});
                console.log(response);
                console.log("성공");
                setMedicines(response.data);

            } catch (err) {
                console.log(err)
                setError('약 정보를 불러오는 데 실패했습니다.');
            }
            setLoading(false);
        };

        fetchMedicines();
    }, []);

    return { medicines, loading, error };
};

export default useMedicineInformation;
