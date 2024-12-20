import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from 'src/context/AuthContext';
import RootNavigator from "src/navigation/RootNavigation";

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
