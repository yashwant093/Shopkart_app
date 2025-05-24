import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../modules/auth/screens/LoginScreen';
import SignupScreen from '../modules/auth/screens/SignupScreen';
import OTPScreen from '../modules/auth/screens/OTPScreen';
import ForgotPassword from '../modules/auth/screens/ForgotPassword';

// Define the stack param types for type safety (optional)
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OTP: { mobileNumber: string; password: string };
  ForgotPassword: { userId?: string } | undefined; // Add params if needed
};

// Create the stack navigator
const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigationProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const AuthNavigation = ({ setIsAuthenticated }: AuthNavigationProps) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {(props) => (
        <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
      )}
    </Stack.Screen>
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="OTP" component={OTPScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthNavigation;
