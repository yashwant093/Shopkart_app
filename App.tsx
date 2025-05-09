// // App.tsx
// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer'; // Import DrawerNavigator

// import SplashScreen from './src/modules/auth/screens/SplashScreen';
// import LoginScreen from './src/modules/auth/screens/LoginScreen';
// import SignupScreen from './src/modules/auth/screens/SignupScreen';
// import DashboardScreen from './src/modules/auth/screens/DashboardScreen'; // Assuming you have this screen
// import DashboardNavigator from './src/navigation/DashboardNavigator'; // Assuming this is your bottom tab navigator
// import CustomHeader from './src/shared/components/CustomHeader';
// import SearchScreen from './src/modules/dashboard/screens/SearchScreen';
// import ProfileScreen from './src/modules/dashboard/screens/ProfileScreen';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator(); // Create Drawer Navigator

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 2000); // Fake loading screen for 2 seconds
//   }, []);

//   if (loading) return <SplashScreen />;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {!isAuthenticated ? (
//           <>
//             <Stack.Screen name="Login">
//               {(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
//             </Stack.Screen>
//             <Stack.Screen name="Signup" component={SignupScreen} />
//           </>
//         ) : (
//           <Stack.Screen name="Drawer">
//             {(props) => (
//               <Drawer.Navigator
//                 screenOptions={{
//                   header: ({ navigation }) => (
//                     <CustomHeader
//                       title="Dashboard"
//                       navigation={navigation} // Pass navigation to header
//                       showDrawerIcon={true} // Show the menu icon
//                     />
//                   ),
//                 }}
//               >
//                 <Drawer.Screen name="Dashboard" component={DashboardScreen} />
//                 {/* Add other screens to your drawer if needed */}
//               </Drawer.Navigator>
//             )}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/modules/auth/store/store';

const App = () => (
  <Provider store={store}>
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
    </Provider>
);

export default App;

