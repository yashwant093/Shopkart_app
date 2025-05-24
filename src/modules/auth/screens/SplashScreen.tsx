import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Alert,
  Button,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../services/apiServices';
import { setTokens } from '../../../modules/auth/store/authSlice';
import theme from '../../../shared/theme';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [networkConnected, setNetworkConnected] = useState(true);
  const [tokenSuccess, setTokenSuccess] = useState(false);

  const dispatch = useDispatch();
  const [loginToken] = useLoginMutation();

  // Request location permission on Android
  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn('Permission error:', error);
        return false;
      }
    }
    return true;
  };

  const fetchLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLocationError('Permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const address = data?.address;
          const city = address?.city || address?.town || address?.village || 'Unknown City';
          const state = address?.state || 'Unknown State';
          setLocation(`${city}, ${state}`);
        } catch (error) {
          console.error('Reverse geocode error:', error);
          setLocationError('Error fetching address');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Error fetching location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSplash = async () => {
    try {
      const netState = await NetInfo.fetch();
      setNetworkConnected(netState.isConnected ?? false);

      if (!netState.isConnected) {
        Alert.alert('No Internet', 'Please check your internet connection.');
        return;
      }

      // Authenticate and get token
      const tokenPayload = { username: 'Admin', password: 'Shop@123' };
      const tokenData = await loginToken(tokenPayload).unwrap();

      dispatch(setTokens({
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
      }));

      setTokenSuccess(true);
      console.log('Token fetched successfully! 🔑',tokenPayload)
      await fetchLocation();
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Authentication Failed', 'Unable to fetch token. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSplash();
  }, []);

  const renderStatus = () => { 
    if (loading) {
      return (
        <>
          <Text style={styles.subtitle}>Checking token...</Text>
          <Text style={styles.subtitle}>Fetching location...</Text>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </>
      );
    }

    if (!networkConnected) {
      return <Text style={styles.subtitle}>No internet connection</Text>;
    }

    if (tokenSuccess) {
      return <Text style={styles.subtitle}>Token fetched successfully! 🔑</Text>;
    }

    if (location) {
      return <Text style={styles.subtitle}>Location found: {location}</Text>;
    }

    if (locationError) {
      return <Text style={styles.subtitle}>{locationError}</Text>;
    }

    return null;
  };

  return (
    <ImageBackground
      source={require('../../../assets/img.jpg')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../../../assets/splashLogo.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome to Shopkart</Text>

        {renderStatus()}

        {!loading && (
          <View style={styles.buttonContainer}>
            <Button title="Start" onPress={onFinish} color={theme.colors.primary} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  image: {
    width: '80%',
    height: height * 0.1,
    resizeMode: 'contain',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
    width: '80%',
  },
});

export default SplashScreen;
