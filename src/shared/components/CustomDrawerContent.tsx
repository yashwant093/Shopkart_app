import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Snackbar, Portal } from 'react-native-paper';
import theme from '../theme';

const APP_VERSION = '1.0.0';

const CustomDrawerContent = (props: any) => {
  const { setIsAuthenticated } = props;

  // Snackbar state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => setIsAuthenticated(false),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <MaterialIcons name="account" size={40} color="#fff" />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Yashwant Lohar</Text>
          <Text style={styles.userEmail}>yashwantlohar@gmail.com</Text>
          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() => props.navigation.navigate('Profile')}
          >
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccessContainer}>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => props.navigation.navigate('Dashboard')}
          >
            <MaterialIcons name="store" size={28} color={theme.colors.primary} />
            <Text style={styles.quickButtonText}>Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => showSnackbar('Coming Soon...')}
          >
            <MaterialIcons name="silverware-fork-knife" size={28} color={theme.colors.primary} />
            <Text style={styles.quickButtonText}>FoodZone</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => showSnackbar('Coming Soon...')}
            >
            <MaterialIcons name="tools" size={28} color={theme.colors.primary} />
            <Text style={styles.quickButtonText}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => showSnackbar('Coming Soon...')}
          >
            <MaterialIcons name="cash" size={28} color={theme.colors.primary} />
            <Text style={styles.quickButtonText}>buy Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Drawer Items */}
      <DrawerContentScrollView {...props}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Other Options</Text>
        </View>

        <DrawerItem
          label="Offers"
          icon={({ size }) => (
            <MaterialIcons name="local-offer" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Stock Updates"
          icon={({ size }) => (
            <MaterialIcons name="trending-up" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="My Order"
          icon={({ size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="My Holdings"
          icon={({ size }) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar(' Coming Soon...')}
        />

        <DrawerItem
          label="My Wishlist"
          icon={({ size }) => (
            <MaterialIcons name="heart-outline" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Theme Store"
          icon={({ size }) => (
            <MaterialIcons name="palette" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Refer & Earn"
          icon={({ size }) => (
            <MaterialIcons name="share" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Rate Us"
          icon={({ size }) => (
            <MaterialIcons name="star" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Contact Us"
          icon={({ size }) => (
            <MaterialIcons name="support-agent" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Share with Friends"
          icon={({ size }) => (
            <MaterialIcons name="star" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Settings"
          icon={({ size }) => (
            <MaterialIcons name="cog-outline" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar('Coming Soon...')}
        />

        <DrawerItem
          label="Help & Support"
          icon={({ size }) => (
            <MaterialIcons name="help-circle-outline" size={size} color={theme.colors.text} />
          )}
          labelStyle={styles.drawerItemLabel}
          onPress={() => showSnackbar(' Coming Soon...')}
        />

        <DrawerItem
          label="Logout"
          icon={({ size }) => (
            <MaterialIcons name="logout" size={size} color={theme.colors.danger} />
          )}
          labelStyle={[styles.drawerItemLabel, { color: theme.colors.danger }]}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>App Version: {APP_VERSION}</Text>
      </View>

      {/* Snackbar Component */}
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          style={{
            backgroundColor: theme.colors.secondary,
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
          action={{
            label: 'Dismiss',
            onPress: () => setSnackbarVisible(false),
            color: theme.colors.danger,
          }}
        >
          <Text style={{ color: theme.colors.danger, fontWeight: 'bold' }}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </Portal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  profileRow: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  userName: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.muted,
    marginVertical: 2,
  },
  viewProfileButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },
  viewProfileText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.xs,
    fontFamily: theme.fonts.medium,
  },
  quickAccessContainer: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  quickButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  quickButtonText: {
    marginTop: 6,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    marginTop: -40, // or -theme.spacing.xs
  },

  sectionTitleText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.muted,
    fontFamily: theme.fonts.medium,
  },
  drawerItemLabel: {
    color: theme.colors.text,
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.regular,
  },
  versionContainer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  versionText: {
    fontSize: theme.fonts.size.xs,
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
});

export default CustomDrawerContent;
