import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import login from "src/screens/auth/login";
import signUp from "src/screens/auth/signUp";
import onBoarding from "src/screens/onBoarding";

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    OnBoarding: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OnBoarding">
                <Stack.Screen name="OnBoarding" component={onBoarding} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={signUp} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
