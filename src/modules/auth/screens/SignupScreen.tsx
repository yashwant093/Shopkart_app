// screens/auth/SignupScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import theme from '../../../shared/theme';
import { useGenerateOtpMutation } from '../../../services/apiServices';
import { AuthStackParamList } from '../../../navigation/AuthNavigation';
import { setTokens, setUser } from '../store/authSlice';

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    mobileNumber: '',
    password: '',
  });

  const [generateOtp] = useGenerateOtpMutation();

  const validateForm = () => {
    const newErrors = { name: '', mobileNumber: '', password: '' };

    if (!name.trim()) newErrors.name = 'Full Name is required';
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== '');
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('mobileNumber', mobileNumber);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };

  const handleSignup = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await generateOtp({ mobileNo: mobileNumber, password }).unwrap();

      if (response.result === 1) {
        if (response.accessToken && response.refreshToken) {
          await AsyncStorage.setItem('accessToken', response.accessToken);
          await AsyncStorage.setItem('refreshToken', response.refreshToken);
          dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken }));

          if (response.user) {
            dispatch(setUser(response.user));
            await AsyncStorage.setItem('user', JSON.stringify(response.user));
          }

          await saveUserData();
          Alert.alert('Success', response.resultMessage || 'OTP sent');
          navigation.navigate('OTP', { mobileNumber, password });
        } else {
          Alert.alert('Error', 'Missing tokens in response');
        }
      } else {
        Alert.alert('Error', response.resultMessage || 'Failed to generate OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while generating OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          {/* Full Name */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your full name"
              placeholderTextColor={theme.colors.muted}
              value={name}
              maxLength={20}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Mobile Number */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={[styles.input, errors.mobileNumber && styles.inputError]}
              placeholder="Enter your mobile number"
              placeholderTextColor={theme.colors.muted}
              keyboardType="phone-pad"
              value={mobileNumber}
              maxLength={10}
              onChangeText={setMobileNumber}
            />
            {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={password}
              maxLength={15}
              onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Sign-Up Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.white} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.lg,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.fonts.size.sm,
    marginTop: 4,
  },
  buttonWrapper: {
    marginBottom: theme.spacing.md,
  },
  signupButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
    marginTop: theme.spacing.sm,
  },
});

export default SignupScreen;
