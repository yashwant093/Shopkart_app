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

const LoginScreen = ({ navigation, setIsAuthenticated }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // State for managing loader visibility

  const handleLogin = () => {
    if (email && password) {
      setLoading(true);  // Show loader
      setTimeout(() => {
        // Simulate a login API call or logic
        setLoading(false); // Hide loader after login attempt
        setIsAuthenticated(true); // Set the user as authenticated (for now)
        Alert.alert('Success', 'Login Successful!');
      }, 2000);  // Simulating a 2-second delay (replace with actual API call)
    } else {
      Alert.alert('Error', 'Please enter your credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        {/* Login Text */}
        <Text style={styles.loginText}>Log In</Text>

        {/* Email Label and Input */}
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

        {/* Password Label and Input */}
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

        {/* Button with Loader inside */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}  // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />  // Show loader inside the button
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* SignUp Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Use the background color from the theme
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Set background opacity here (rgba format)
    padding: theme.spacing.lg,
    borderRadius: 8,  // Optional: to round the corners of the background box
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
});

export default LoginScreen;
