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

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Manage loading state

  const handleSignup = () => {
    if (name && email && password) {
      setLoading(true);  // Show loader
      setTimeout(() => {
        // Simulate a signup API call
        setLoading(false);  // Hide loader after the attempt
        Alert.alert('Success', 'Account created!');
        navigation.navigate('OTP');
      }, 2000);  // Simulating a 2-second delay (replace with actual API call)
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        {/* Title for Signup */}
        <Text style={styles.title}>Create Account</Text>

        {/* Full Name Label and Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={theme.colors.muted}
            value={name}
            onChangeText={setName}
          />
        </View>

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

        {/* Sign-Up Button with Loader */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}  // Disable the button when loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />  // Show loader inside the button
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Opacity effect for background
    padding: theme.spacing.lg,
    borderRadius: 8,  // Optional: rounded corners for the form container
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
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
    marginTop: theme.spacing.sm,
  },
});

export default SignupScreen;
