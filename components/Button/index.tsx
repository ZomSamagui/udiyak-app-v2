import React from "react";
import * as S from "./style";

type ButtonProps = {
    text: string;
    onPress: () => void;
}

const Button = ({text, onPress}: ButtonProps) => {
    return (
        <S.ButtonContainer onPress={onPress}>
            <S.ButtonText>{text}</S.ButtonText>
        </S.ButtonContainer>
    )
}

export default Button;