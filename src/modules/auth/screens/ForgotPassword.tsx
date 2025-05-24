// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import theme from '../../../shared/theme';

// const ForgotPassword = ({ navigation }: any) => {
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = () => {
//     if (!newPassword || !confirmPassword) {
//       Alert.alert('Error', 'Please fill in both password fields');
//       return;
//     }
  
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }
  
//     setLoading(true);
  
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       Alert.alert('Success', 'Your password has been reset successfully.', [
//         {
//           text: 'OK',
//           onPress: () => navigation.navigate('Login'), // make sure 'Login' is the correct screen name
//         },
//       ]);
//     }, 2000);
//   };
  

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={styles.content}>
//         <Text style={styles.title}>Reset Password</Text>
//         <Text style={styles.label}>New Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="New Password"
//           placeholderTextColor={theme.colors.muted}
//           secureTextEntry
//           value={newPassword}
//           onChangeText={setNewPassword}
//         />

//         <Text style={styles.label}>Confirm Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor={theme.colors.muted}
//           secureTextEntry
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />

//         <TouchableOpacity
//           style={styles.resetButton}
//           onPress={handleResetPassword}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.resetButtonText}>Reset Password</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     justifyContent: 'center',
//     padding: theme.spacing.lg,
//   },
//   content: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: theme.spacing.lg,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: theme.fonts.size.xl,
//     fontFamily: theme.fonts.bold,
//     color: theme.colors.text,
//     marginBottom: theme.spacing.md,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: theme.fonts.size.md,
//     fontFamily: theme.fonts.regular,
//     color: theme.colors.text,
//     marginBottom: theme.spacing.xs,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: theme.colors.muted,
//     borderRadius: 6,
//     padding: theme.spacing.md,
//     fontSize: theme.fonts.size.md,
//     color: theme.colors.text,
//     marginBottom: theme.spacing.md,
//   },
//   resetButton: {
//     backgroundColor: theme.colors.primary,
//     borderRadius: 6,
//     paddingVertical: theme.spacing.sm,
//     alignItems: 'center',
//   },
//   resetButtonText: {
//     fontSize: theme.fonts.size.md,
//     fontFamily: theme.fonts.medium,
//     color: '#fff',
//   },
// });

// export default ForgotPassword;


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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../../shared/theme';

const ForgotPassword = ({ navigation }: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your password has been reset successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    }, 2000);
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
            disabled={loading}
          >
            {loading ? (
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
    height: 48, // Fixed height
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
    color:  theme.colors.white,
  },
});

export default ForgotPassword;
