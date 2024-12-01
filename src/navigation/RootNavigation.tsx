import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Login from "src/screens/auth/login";
import SignUp from "src/screens/auth/signUp";
import onBoarding from "src/screens/onBoarding";
import Main from "src/screens/main";
import Medicine from "src/screens/medicine";
import OnBoarding from "src/screens/onBoarding";
import {NavigatorScreenParams} from "@react-navigation/core";

export type RootStackParamList = {
    OnBoarding: undefined;
    Login: undefined;
    SignUp: undefined
    Main: undefined;
    Medicine: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigation() {
    return (
        <Stack.Navigator initialRouteName="OnBoarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Medicine" component={Medicine} />
        </Stack.Navigator>
    );
}


export default RootNavigation;