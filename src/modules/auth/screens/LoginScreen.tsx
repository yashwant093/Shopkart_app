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
} from 'react-native';
import theme from '../../../shared/theme';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../services/apiServices';
import { setCredentials } from '../store/authSlice';

const USE_STATIC_LOGIN = true; // Set to true to enable static login

const STATIC_EMAIL = 'admin@gmail.com';
const STATIC_PASSWORD = '123456';

const LoginScreen = ({ navigation, setIsAuthenticated }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your credentials');
      return;
    }

    if (USE_STATIC_LOGIN) {
      if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
        setIsAuthenticated(true);
        Alert.alert('Success', 'Static Login Successful');
      } else {
        Alert.alert('Login Failed', 'Invalid static credentials');
      }
    } else {
      try {
        const res = await login({ email, password }).unwrap();
        console.log({ email, password });
        console.log('Login response:', res);
        dispatch(setCredentials(res.access_token));
        setIsAuthenticated(true);
        Alert.alert('Success', 'Login Successful');
      } catch (error) {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Log In</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.muted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
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
    color: '#fff',
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
