import React, { useState } from 'react';
import { Appbar, Snackbar, Text } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardTabParamList } from '../../navigation/DashboardTabNavigator';
import colors from '../../shared/theme/colors'; // Import your theme colors

type CustomHeaderProps = {
  title: string;
  navigation: any;
  showDrawerIcon?: boolean;
  showIcons?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  navigation,
  showDrawerIcon = true,
  showIcons = false,
}) => {
  const nav = useNavigation<NativeStackNavigationProp<DashboardTabParamList>>();
  const [visible, setVisible] = useState(false);

  const canGoBack = navigation.canGoBack?.();

  const handleQRCodePress = () => {
    setVisible(true);
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.header }}>
        {canGoBack ? (
          <Appbar.BackAction color={colors.textOnPrimary} onPress={() => navigation.goBack()} />
        ) : showDrawerIcon ? (
          <Appbar.Action
            icon="menu"
            color={colors.textOnPrimary}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ) : null}

        <Appbar.Content title={title} titleStyle={{ color: colors.textOnPrimary }} />

        {showIcons && (
          <>
            <Appbar.Action
              icon="qrcode-scan"
              color={colors.textOnPrimary}
              onPress={handleQRCodePress}
            />
            <Appbar.Action
              icon="bell-outline"
              color={colors.textOnPrimary}
              onPress={() => nav.navigate('Notifications')}
            />
            <Appbar.Action
              icon="cart-outline"
              color={colors.textOnPrimary}
              onPress={() => nav.navigate('Cart')}
            />
          </>
        )}
      </Appbar.Header>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
        action={{
          label: 'Dismiss',
          onPress: () => setVisible(false),
          color: colors.danger,
        }}
      >
        <Text style={{ color: colors.danger, fontWeight: 'bold' }}>Coming Soon!</Text>
      </Snackbar>
    </>
  );
};

export default CustomHeader;
