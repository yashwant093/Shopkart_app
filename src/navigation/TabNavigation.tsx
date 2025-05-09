
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

// ✅ Define your tab screen types
export type DashboardTabParamList = {
    Dashboard: undefined;
    Cart: undefined;
    MyProfile: undefined;
    Search: undefined;
    Notifications: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                header: () => (
                    <CustomHeader
                        title={route.name}
                        navigation={navigation}
                        showDrawerIcon={!navigation.canGoBack()}
                        showIcons={route.name === 'Dashboard'} // Show icons only on main dashboard
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

                    switch (route.name) {
                        case 'Dashboard':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Cart':
                            iconName = focused ? 'cart' : 'cart-outline';
                            break;
                        case 'MyProfile':
                            iconName = focused ? 'account' : 'account-outline';
                            break;
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="MyProfile" component={ProfileScreen} />

            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarItemStyle: { width: 100 }, // Set width for MyProfile tab
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarItemStyle: { width: 100 }, // Set width for MyProfile tab
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
