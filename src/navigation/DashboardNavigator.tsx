import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartScreen from '../modules/dashboard/screens/CartScreen';
import ProfileScreen from '../modules/dashboard/screens/ProfileScreen';
import SearchScreen from '../modules/dashboard/screens/SearchScreen';
import NotificationScreen from '../modules/dashboard/screens/NotificationScreen';
import CustomHeader from '../shared/components/CustomHeader';
import theme from '../shared/theme';
import DashboardScreen from '../modules/shop/screens/DashboardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';
import CreateShop from '../modules/shop/components/CreateShop/CreateShop';

export type DashboardTabParamList = {
  Dashboard: undefined;
  CreateShop: undefined;
  Profile: undefined;
  Search: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();
const Drawer = createDrawerNavigator();

// DrawerNavigator for Dashboard
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      header: ({ navigation, route }) => (
        <CustomHeader
          title={route.name}
          navigation={navigation}
          showDrawerIcon={true} // To show the Drawer icon in header
          showIcons={true} // Customize any additional header icons if needed
        />
      ),
    }}
  >
    <Drawer.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerShown: true, // Show header for the Dashboard screen
      }}
    />
  </Drawer.Navigator>
);

const DashboardNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      header: () => (
        <CustomHeader
          title={route.name}
          navigation={navigation}
          showDrawerIcon={true}
          showIcons={true}
        />
      ),
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.muted,
      tabBarStyle: {
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.muted,
        alignSelf: 'center', // Center the tab bar horizontally
        width: '100%', // 👈 Adjust the width here (e.g., 90% of screen)
        borderRadius: 20, // Optional: rounded corners for a floating effect
        position: 'absolute', // Optional: float the tab bar
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'circle-outline';
        switch (route.name) {
          case 'Dashboard':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'CreateShop':
            iconName = focused ? 'store' : 'store-outline'; 
            break;
          case 'Search':
            // Set Search icon
            iconName = focused ? 'magnify' : 'magnify';
            break;
          case 'Notifications':
            // Set Notifications icon
            iconName = focused ? 'bell' : 'bell-outline';
            break;
          case 'Profile':
            iconName = focused ? 'account' : 'account-outline';
            break;
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    {/* Use DrawerNavigator for the Dashboard */}
    <Tab.Screen
      name="Dashboard"
      component={DrawerNavigator}  // The Dashboard screen is inside the DrawerNavigator
      options={{
        headerShown: false, // Disable header for this tab screen (as it's handled in the CustomHeader)
        tabBarItemStyle: { width: 200 }, // Set width for Dashboard tab
      }}
    />

    <Tab.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        tabBarItemStyle: { width: 100 }, // Set width for MyProfile tab
      }}
    />
    {/* <Tab.Screen
      name="CreateShop"
      component={CreateShop}
      options={{
        tabBarItemStyle: { width: 100 }, // Set width for MyCart tab
      }}
    /> */}
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarItemStyle: { width: 100 }, // Set width for MyProfile tab
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarItemStyle: { width: 100 }, // Set width for MyProfile tab
      }}
    />
  </Tab.Navigator>
);

export default DashboardNavigator;
