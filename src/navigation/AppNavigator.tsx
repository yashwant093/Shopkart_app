// import React, { useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../modules/auth/screens/SplashScreen';
// import AuthNavigator from './AuthNavigator';
// import DrawerNavigator from './DashboardNavigator';
// import CreateShop from '../modules/shop/components/CreateShop/CreateShop'; // Import CreateShop
// import CustomHeader from '../shared/components/CustomHeader';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   if (loading) {
//     return <SplashScreen onFinish={() => setLoading(false)} />;
//   }

//   return (
//     <Stack.Navigator>
//       {!isAuthenticated ? (
//         <Stack.Screen name="Auth">
//           {() => <AuthNavigator setIsAuthenticated={setIsAuthenticated} />}
//         </Stack.Screen>
//       ) : (
//         <Stack.Screen name="Main">
//           {() => <DrawerNavigator setIsAuthenticated={setIsAuthenticated} />}
//         </Stack.Screen>
//       )}

//       {/* Add CreateShop with a custom header */}
//       <Stack.Screen
//         name="CreateShop"
//         component={CreateShop}
//         options={{
//           header: ({ navigation }) => (
//             <CustomHeader
//               title="Create Shop"
//               navigation={navigation}  // Pass the navigation prop here
//               showDrawerIcon={false}  // Customize as needed
//               showIcons={false}  // Customize as needed
//             />
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;


import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../modules/auth/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DashboardNavigator';
import CreateShop from '../modules/shop/components/CreateShop/CreateShop'; // Import CreateShop
import CustomHeader from '../shared/components/CustomHeader';
import ShoppingDashboardCategory from '../modules/shop/screens/ShopDashboardCategory/ShoppingDashboardCategory';
import ShoppingProductDetailsScreen from '../modules/shop/screens/ShoppingProductDetails/ShoppingProductDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
        >
          {() => <AuthNavigator setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {() => <DrawerNavigator setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      )}

      {/* Add CreateShop with a custom header */}
      <Stack.Screen
        name="CreateShop"
        component={CreateShop}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Create Shop"
              navigation={navigation}
              showDrawerIcon={false}
              showIcons={false}
            />
          ),
        }}
      />

      {/* Add CreateShop with a custom header */}
      <Stack.Screen
        name="Category"
        component={ShoppingDashboardCategory}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Category"
              navigation={navigation}
              showDrawerIcon={false}
              showIcons={false}
            />
          ),
        }}
      />

      {/* Add CreateShop with a custom header */}
      <Stack.Screen
        name="ShoppingProductDetails"
        component={ShoppingProductDetailsScreen}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Product Details"
              navigation={navigation}
              showDrawerIcon={false}
              showIcons={false}
            />
          ),
        }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
