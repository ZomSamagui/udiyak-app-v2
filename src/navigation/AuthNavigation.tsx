import { createStackNavigator } from "@react-navigation/stack";

import Login from "src/screens/auth/login";
import SignUp from "src/screens/auth/signUp";
import OnBoarding from "src/screens/onBoarding";

export type AuthStackParamList = {
    OnBoarding: undefined;
    Login: undefined;
    SignUp: undefined
}

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
    return (
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
}