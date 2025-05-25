
import React, { useState, useEffect } from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../../shared/theme';
import { useResetPasswordMutation } from '../../../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ForgotPasswordProps {
  navigation: any;
  // removed route because mobileNo will be fetched from AsyncStorage
}

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [mobileNo, setMobileNo] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Fetch mobile number from AsyncStorage on mount
  useEffect(() => {
    const fetchMobileNo = async () => {
      try {
        const storedMobile = await AsyncStorage.getItem('mobileNumber');
        if (storedMobile) {
          setMobileNo(storedMobile);
        } else {
          Alert.alert('Error', 'Mobile number not found. Please login again.', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
          ]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve mobile number.');
      }
    };
    fetchMobileNo();
  }, [navigation]);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!mobileNo) {
      Alert.alert('Error', 'Mobile number not available. Please try again.');
      return;
    }

    try {
      const response = await resetPassword({ mobileNo, newPassword, confirmPassword }).unwrap();

      if (response.result === 1) {
        const token = response.resultData;
        if (token) {
          await AsyncStorage.setItem('accessToken', token);
        }
        Alert.alert('Success', response.resultMessage || 'Password reset successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', response.resultMessage || 'Password reset failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.iconWrapper}
            >
              <Ionicons
                name={showNewPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.muted}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.iconWrapper}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.muted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.resetButtonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    height: 48,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  iconWrapper: {
    paddingHorizontal: 8,
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
    color: theme.colors.white,
  },
});

export default ForgotPassword;
