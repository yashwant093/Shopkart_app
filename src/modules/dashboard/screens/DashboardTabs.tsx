import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../../shared/components/CustomHeader';
import theme from '../../../shared/theme';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import DashboardScreen from '../../shop/screens/DashboardScreen';
import { DrawerActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => (
          <CustomHeader
            title={route.name}
            navigation={navigation}
            backgroundColor={theme.colors.primary}
            titleColor={theme.colors.white}
            showDrawerIcon={true}
            onStorePress={() => navigation.navigate('Cart')} // Navigate to MyCart when pressed
          />
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.muted,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'circle-outline';
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          if (route.name === 'MyProfile') iconName = focused ? 'account' : 'account-outline';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="My Cart" component={CartScreen} />
      <Tab.Screen name="My Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
