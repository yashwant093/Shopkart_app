// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import theme from '../../../shared/theme';

// const OTPScreen = ({ navigation }: any) => {
//   const [otp, setOTP] = useState('');
//   const [timer, setTimer] = useState(60);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isResending, setIsResending] = useState(false);
  

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       if (timer > 0) {
//         setTimer(prev => prev - 1);
//       }
//     }, 1000);
//     return () => clearInterval(countdown);
//   }, [timer]);

//   const handleVerifyOTP = () => {
//     if (otp.length === 4) {
//       setIsVerifying(true);
//       setTimeout(() => {
//         setIsVerifying(false);
//         Alert.alert('Success', 'OTP Verified!');
//         navigation.navigate('ForgotPassword');
//       }, 2000);
//     } else {
//       Alert.alert('Error', 'Please enter a valid 4-digit OTP');
//     }
//   };

//   const handleResend = () => {
//     if (timer === 0) {
//       setIsResending(true);
//       setTimeout(() => {
//         setIsResending(false);
//         setTimer(60);
//         Alert.alert('OTP Sent', 'A new OTP has been sent to your phone/email');
//       }, 2000);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.container}
//       >
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Enter OTP</Text>
//           <Text style={styles.subtitle}>We sent a code to your email or phone</Text>

//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             maxLength={4}
//             placeholder="Enter 4-digit OTP"
//             placeholderTextColor={theme.colors.muted}
//             value={otp}
//             onChangeText={setOTP}
//           />

//           <TouchableOpacity
//             style={styles.verifyButton}
//             onPress={handleVerifyOTP}
//             disabled={isVerifying}
//           >
//             {isVerifying ? (
//               <ActivityIndicator color={theme.colors.white} />
//             ) : (
//               <Text style={styles.buttonText}>Verify</Text>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.timerText}>
//             {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive the code?'}
//           </Text>

//           {timer === 0 && (
//             <TouchableOpacity onPress={handleResend} disabled={isResending}>
//               {isResending ? (
//                 <ActivityIndicator color={theme.colors.primary} />
//               ) : (
//                 <Text style={styles.resendText}>Resend OTP</Text>
//               )}
//             </TouchableOpacity>
//           )}
//         </View>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     padding: theme.spacing.lg,
//     justifyContent: 'center',
//   },
//   formContainer: {
//     backgroundColor: 'rgba(0,0,0,0.5)',
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
//   subtitle: {
//     fontSize: theme.fonts.size.sm,
//     fontFamily: theme.fonts.regular,
//     color: theme.colors.muted,
//     textAlign: 'center',
//     marginBottom: theme.spacing.lg,
//   },
//   input: {
//     width: 240,
//     borderWidth: 1,
//     borderColor: theme.colors.muted,
//     borderRadius: 6,
//     padding: theme.spacing.md,
//     fontSize: theme.fonts.size.md,
//     color: theme.colors.text,
//     textAlign: 'center',
//     letterSpacing: 5,
//     alignSelf: 'center',
//     fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
//   },
//   verifyButton: {
//     backgroundColor: theme.colors.primary,
//     borderRadius: 6,
//     paddingVertical: theme.spacing.sm,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: theme.spacing.lg,
//   },
//   buttonText: {
//     fontSize: theme.fonts.size.md,
//     fontFamily: theme.fonts.medium,
//     color: theme.colors.white,
//   },
//   timerText: {
//     marginTop: theme.spacing.md,
//     textAlign: 'center',
//     color: theme.colors.text,
//   },
//   resendText: {
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: theme.spacing.sm,
//     fontSize: theme.fonts.size.sm,
//   },
// });

// export default OTPScreen;

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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../../shared/theme';

const OTPScreen = ({ navigation, route }: any) => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // If you want to get mobileNumber/password passed as params from Signup:
  const { mobileNumber, password } = route.params || {};

  // Optional: Load saved user details from AsyncStorage on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedMobile = await AsyncStorage.getItem('mobileNumber');
        const storedPassword = await AsyncStorage.getItem('password');
        // You can use these if needed or validate OTP for this user
        console.log('Stored mobile:', storedMobile);
        console.log('Stored password:', storedPassword);
      } catch (error) {
        console.error('Failed to load user data from storage', error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (timer === 0) return;
    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp.trim().length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert('Success', 'OTP Verified!');
      navigation.navigate('ForgotPassword'); // or next screen
    }, 2000);
  };

  const handleResend = () => {
    if (timer === 0) {
      setIsResending(true);
      setOTP('');
      setTimeout(() => {
        setIsResending(false);
        setTimer(60);
        Alert.alert('OTP Sent', 'A new OTP has been sent to your phone/email');
      }, 2000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            We sent a code to your email or phone {mobileNumber ? `(${mobileNumber})` : ''}
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            placeholder="Enter 4-digit OTP"
            placeholderTextColor={theme.colors.muted}
            value={otp}
            onChangeText={setOTP}
          />

          <TouchableOpacity
            style={[
              styles.verifyButton,
              isVerifying && { backgroundColor: theme.colors.muted },
            ]}
            onPress={handleVerifyOTP}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.timerText}>
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive the code?'}
          </Text>

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
    width: 240,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 5,
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
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
    color: theme.colors.white,
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
