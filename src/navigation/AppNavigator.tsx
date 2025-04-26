import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../modules/auth/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DashboardNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth">
          {() => <AuthNavigator setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main">
          {() => <DrawerNavigator setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
