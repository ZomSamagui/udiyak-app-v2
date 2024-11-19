import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Login from "../screens/auth/login";
import SignUp from "../screens/auth/signup";
import OnBoarding from "../screens/OnBoarding";

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
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
