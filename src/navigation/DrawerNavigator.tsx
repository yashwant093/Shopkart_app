// navigation/DrawerNavigator.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../modules/shop/screens/DashboardScreen';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';
import CustomHeader from '../shared/components/CustomHeader';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      header: ({ navigation, route }) => (
        <CustomHeader
          title={route.name}
          navigation={navigation}
          showDrawerIcon={true}
          showIcons={true}
        />
      ),
    }}
  >
    <Drawer.Screen
      name="Shopkart"
      component={DashboardScreen}
      options={{
        headerShown: true,
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
