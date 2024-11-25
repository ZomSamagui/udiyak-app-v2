import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Assets
import TheJamsilText from "Components/Font/TheJamsil";
import StunningText from "Components/Font/Stunning";
import Udiyak_Logo from "Assets/Images/Udiyak_Logo.svg";

// File & Folder
import { AuthStackParamList } from "Navigation/AuthNavigation";
import * as S from "./style"; // styled-components 사용

type ScreenNavigationProps = StackNavigationProp<AuthStackParamList, 'OnBoarding'>;

const OnBoarding = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const navigation = useNavigation<ScreenNavigationProps>();

    return (
        <S.Container>
            <TheJamsilText fontSize={40} fontWeight={'Bold'}>어디약</TheJamsilText>
            <S.SubContainer>
                <StunningText fontSize={16}>어디서나 쉽고 간편하게</StunningText>
                <StunningText fontSize={16}>안전상비약을 찾아보세요</StunningText>
            </S.SubContainer>
            <StunningText style={{ fontSize: 10, color: '#D9D9D9', marginTop: 5 }}>
                어디약을 이용하기 위해 로그인 해주세요.
            </StunningText>
            <S.LogoContainer>
                <Udiyak_Logo />
            </S.LogoContainer>
        </S.Container>
    );
};

export default OnBoarding;