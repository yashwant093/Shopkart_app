import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator, // Add ActivityIndicator for the loader
} from 'react-native';
import theme from '../../../shared/theme';

const OTPScreen = ({ navigation }: any) => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(60); // Countdown for resend
  const [isVerifying, setIsVerifying] = useState(false); // Loader for OTP verification
  const [isResending, setIsResending] = useState(false); // Loader for OTP resend

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      setIsVerifying(true); // Start loader
      setTimeout(() => {
        setIsVerifying(false); // Stop loader
        Alert.alert('Success', 'OTP Verified!');
        navigation.navigate('ForgotPassword'); // Or next step in auth flow
      }, 2000); // Simulate network delay
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setIsResending(true); // Start loader
      setTimeout(() => {
        setIsResending(false); // Stop loader
        setTimer(60); // Reset timer
        Alert.alert('OTP Sent', 'A new OTP has been sent to your phone/email');
      }, 2000); // Simulate network delay
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>We sent a code to your email or phone</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={4} // Allow only 4 digits
          placeholder="Enter 4-digit OTP"
          placeholderTextColor={theme.colors.muted}
          value={otp}
          onChangeText={setOTP}
        />

        {/* Verify OTP Button */}
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyOTP}
          disabled={isVerifying} // Disable while verifying
        >
          {isVerifying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.timerText}>
          {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive the code?'}
        </Text>

        {/* Resend OTP Button */}
        {timer === 0 && (
          <TouchableOpacity onPress={handleResend} disabled={isResending}>
            {isResending ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <Text style={styles.resendText}>Resend OTP</Text>
            )}
          </TouchableOpacity>
        )}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  subtitle: {
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.muted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  input: {
    width: 240, // Fixed width for 4 digits
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 5,
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Optional: makes it more even
  },
  verifyButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  buttonText: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
    color: '#fff',
  },
  timerText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text,
  },
  resendText: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    fontSize: theme.fonts.size.sm,
  },
});

export default OTPScreen;
