import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  Button,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import theme from '../../../shared/theme';
import colors from '../../../shared/theme/colors';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  // To show the loading spinner
  const [locationError, setLocationError] = useState<string | null>(null);  // To handle errors

  const checkLocationService = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationError(null); // Reset errors
        setLocation(null); // Reset location if it was previously set
        setLoading(true); // Show loading indicator
        getLocation(); // Try to fetch the location
      },
      (error) => {
        if (error.code === 3) {
          // Location services are turned off
          Alert.alert(
            'Location is off',
            'Please enable location services to use this feature.',
            [
              {
                text: 'Go to Settings',
                onPress: () => Linking.openSettings(), // Open device settings
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        } else {
          setLocationError('Error fetching location');
          setLoading(false);  // Hide loading indicator when there is an error
        }
      }
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
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
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location access was not granted.');
      setLocationError('Permission denied');
      setLoading(false); // Hide loading indicator
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data?.address;

          // Extract city, district, and state
          const city = address?.city || address?.town || address?.village || 'Unknown City';
          const state = address?.state || 'Unknown State';

          const locationString = `${city}, ${state}`;
          setLocation(locationString.trim());
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          setLocationError('Error fetching address');
        }
        setLoading(false); // Hide loading indicator
      },
      (error) => {
        console.error('Location error:', error.code, error.message);
        setLocationError('Error fetching location');
        setLoading(false); // Hide loading indicator
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    // Check if location services are enabled and attempt to fetch location
    checkLocationService();
  }, []); // Empty dependency array ensures this runs once after component mounts

  return (
    <ImageBackground
      source={require('../../../assets/img.jpg')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      {/* Status bar removed for now */}
      {/* <StatusBar
        translucent
        backgroundColor={colors.statusBar} // Use the color from your theme
        barStyle="light-content" // Light text for visibility on dark background
      /> */}



      {/* Overlay for the text and button */}
      <View style={styles.overlay}>
        {/* Logo image centered at the top */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/splashLogo.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Welcome to Shopkart</Text>
        <Text style={styles.subtitle}>
          {loading
            ? 'Checking your location...'
            : location
              ? 'Location found successfully! 😊'
              : locationError
                ? 'Failed to fetch location.'
                : ''}
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : location ? (
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>📍 Your Location</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        ) : locationError ? (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{locationError}</Text>
          </View>
        ) : null}

        {/* Navigate button at the bottom */}
        {(location || locationError) && (
          <View style={styles.buttonContainer}>
            <Button
              title="Start"
              onPress={onFinish}  // Navigate to next screen
              color={theme.colors.primary}
            />
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
    justifyContent: 'flex-start', // Ensure that the content starts at the top
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0, // Adjust the margin-top to center the logo on the top
  },
  image: {
    width: '80%', // Adjust width as per your requirement
    height: height * 0.1, // Adjust height as needed (e.g., 20% of screen height)
    resizeMode: 'contain', // Ensure the logo maintains its aspect ratio
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    position: 'relative',  // Set position to relative to position the button at the bottom
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fonts.size.sm,
    color: '#fff',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  locationContainer: {
    marginTop: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing.md,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    marginBottom: theme.spacing.sm,
  },
  locationText: {
    fontSize: theme.fonts.size.sm,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',  // Position the button at the bottom
    bottom: theme.spacing.lg,
    width: '80%', // Adjust width as necessary
  },
});

export default SplashScreen;
