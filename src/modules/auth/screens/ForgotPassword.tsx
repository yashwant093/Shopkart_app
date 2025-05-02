import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import theme from '../../../shared/theme';

const ForgotPassword = ({ navigation }: any) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    setLoading(true);
  
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your password has been reset successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // make sure 'Login' is the correct screen name
        },
      ]);
    }, 2000);
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={theme.colors.muted}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.muted}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetButtonText}>Reset Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.lg,
    borderRadius: 8,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  label: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
    color: '#fff',
  },
});

export default ForgotPassword;
