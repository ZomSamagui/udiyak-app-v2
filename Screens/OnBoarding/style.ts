import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 130,
        paddingLeft: 40,
    },
    subContainer: {
        marginTop: 12,
    },
    subTitle: {
        color: '#D9D9D9',
        marginTop: 5,
    },
    logoContainer: {
        flex: 1,                // 남은 공간을 차지
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center',    // 수평 중앙 정렬
        alignSelf: 'center',     // 부모 기준 중앙 배치
    },
});

export default styles;
