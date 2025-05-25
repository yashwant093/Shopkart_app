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
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import theme from '../../../shared/theme';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../services/apiServices'; // Your RTK Query login mutation
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [mobileNo, setMobileNo] = useState('');
  const [passWord, setPassWord] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!mobileNo || !passWord) {
      Alert.alert('Error', 'Please enter your mobile number and password');
      return;
    }

    try {
      // Call login API with mobileNo and passWord
      const response = await login({ mobileNo, passWord }).unwrap();
      if (response.result === 1) {
        const token = response.resultData;
        if (token) await AsyncStorage.setItem('accessToken', token);
        Alert.alert('Success', response.resultMessage || 'Login Successful');
         navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed', response.resultMessage || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.loginText}>Log In</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={theme.colors.muted}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  value={mobileNo}
                  onChangeText={setMobileNo}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.muted}
                  secureTextEntry
                  value={passWord}
                  onChangeText={setPassWord}
                />
              </View>

              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color={theme.colors.white} />
                  ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.forgotPasswordWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
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
  loginText: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
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
  buttonWrapper: {
    marginBottom: theme.spacing.md,
  },
  loginButton: {
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
  signupText: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
    marginTop: theme.spacing.sm,
  },
  forgotPasswordWrapper: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.medium,
  },
});

export default LoginScreen;



