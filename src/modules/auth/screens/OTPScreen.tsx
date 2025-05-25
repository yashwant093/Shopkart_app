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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import theme from '../../../shared/theme';
// import {
//   useVerifyOTPMutation,
//   useUserCreateMutation,
//   useGenerateOTPMutation,
// } from '../../../services/apiServices';

// const OTPScreen = ({ navigation, route }: any) => {
//   const [otp, setOTP] = useState('');
//   const [timer, setTimer] = useState(60);
//   const [isResending, setIsResending] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState(route.params?.mobileNumber || '');
//   const [password, setPassword] = useState(route.params?.password || '');

//   const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
//   const [userCreate, { isLoading: isCreatingUser }] = useUserCreateMutation();
//   const [generateOTP, { isLoading: isGeneratingOTP }] = useGenerateOTPMutation();

//   useEffect(() => {
//     const loadFromStorage = async () => {
//       try {
//         if (!mobileNumber) {
//           const storedMobile = await AsyncStorage.getItem('mobileNumber');
//           if (storedMobile) setMobileNumber(storedMobile);
//         }
//         if (!password) {
//           const storedPassword = await AsyncStorage.getItem('password');
//           if (storedPassword) setPassword(storedPassword);
//         }
//       } catch (error) {
//         console.error('Failed to load user data from storage', error);
//       }
//     };
//     loadFromStorage();
//   }, []);

//   useEffect(() => {
//     if (timer === 0) return;
//     const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
//     return () => clearInterval(countdown);
//   }, [timer]);

//   const handleVerifyOTP = async () => {
//     if (otp.trim().length !== 4) {
//       Alert.alert('Error', 'Please enter a valid 4-digit OTP');
//       return;
//     }

//     try {
//       const verifyResponse = await verifyOTP({
//         verificationCode: otp,
//         mobileNo: mobileNumber,
//         password: password,
//       }).unwrap();

//       if (verifyResponse.result === 1 && verifyResponse.resultFlag) {
//         const token = verifyResponse.resultData?.token;
//         if (token) {
//           await AsyncStorage.setItem('accessToken', token);
//         }

//         const createResponse = await userCreate({
//           userName: mobileNumber,
//           userMobileNo: mobileNumber,
//           Password: password,
//         }).unwrap();

//         if (createResponse.result === 1) {
//           const token = createResponse.resultData?.token;
//           if (token) {
//             await AsyncStorage.setItem('accessToken', token);
//           }
//           Alert.alert('Success', 'User created successfully');
//           navigation.navigate('Login');
//         } else {
//           console.error('User creation failed:', createResponse);
//           Alert.alert('User Creation Failed', createResponse?.resultMessage || 'Failed to create user');
//         }
//       } else {
//         console.error('OTP verification failed:', verifyResponse);
//         Alert.alert('Verification Failed', verifyResponse?.resultMessage || 'Invalid OTP. Please try again.');
//       }
//     } catch (error: any) {
//       console.error('OTP Verification or User Creation Error:', error);
//       const message = error?.data?.message || error?.error || 'Something went wrong. Please try again.';
//       Alert.alert('Error', message);
//     }
//   };

//   const handleResend = async () => {
//     if (timer === 0) {
//       try {
//         setIsResending(true);
//         setOTP('');

//         const response = await generateOTP({ mobileNo: mobileNumber, password }).unwrap();

//         if (response.result === 1) {
//           Alert.alert('OTP Sent', 'A new OTP has been sent to your phone/email');
//           setTimer(60);
//         } else {
//           Alert.alert('Failed to send OTP', response.resultMessage || 'Please try again.');
//         }
//       } catch (error: any) {
//         console.error('Generate OTP Error:', error);
//         const message = error?.data?.message || error?.error || 'Failed to resend OTP.';
//         Alert.alert('Error', message);
//       } finally {
//         setIsResending(false);
//       }
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
//           <Text style={styles.subtitle}>
//             We sent a code to your phone {mobileNumber ? `(${mobileNumber})` : ''}
//           </Text>

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
//             style={[
//               styles.verifyButton,
//               (isVerifying || isCreatingUser) && { backgroundColor: theme.colors.muted },
//             ]}
//             onPress={handleVerifyOTP}
//             disabled={isVerifying || isCreatingUser}
//           >
//             {(isVerifying || isCreatingUser) ? (
//               <ActivityIndicator color={theme.colors.white} />
//             ) : (
//               <Text style={styles.buttonText}>Verify & Create User</Text>
//             )}
//           </TouchableOpacity>

//           <Text style={styles.timerText}>
//             {timer > 0 ? `Resend OTP in ${timer}s` : 'Didn’t receive the code?'}
//           </Text>

//           {timer === 0 && (
//             <TouchableOpacity onPress={handleResend} disabled={isResending || isGeneratingOTP}>
//               {(isResending || isGeneratingOTP) ? (
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

// export default OTPScreen;

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
import {
  useVerifyOTPMutation,
  useUserCreateMutation,
  useGenerateOTPMutation,
} from '../../../services/apiServices';

const OTPScreen = ({ navigation, route }: any) => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(3600);
  const [isResending, setIsResending] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(route.params?.mobileNumber || '');
  const [password, setPassword] = useState(route.params?.password || '');

  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [userCreate, { isLoading: isCreatingUser }] = useUserCreateMutation();
  const [generateOTP, { isLoading: isGeneratingOTP }] = useGenerateOTPMutation();

  // Load from AsyncStorage if params missing
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        if (!mobileNumber) {
          const storedMobile = await AsyncStorage.getItem('mobileNumber');
          if (storedMobile) setMobileNumber(storedMobile);
        }
        if (!password) {
          const storedPassword = await AsyncStorage.getItem('password');
          if (storedPassword) setPassword(storedPassword);
        }
      } catch (error) {
        console.error('Error loading storage:', error);
      }
    };
    loadUserInfo();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const sanitizePassword = (pwd: string) => {
    try {
      return pwd.normalize('NFKC').trim();
    } catch {
      return pwd.trim();
    }
  };

  const handleVerifyAndCreate = async () => {
    if (otp.trim().length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }

    Keyboard.dismiss();

    try {
      const cleanPass = sanitizePassword(password);

      // 1. Verify OTP
      const verifyResponse = await verifyOTP({
        verificationCode: otp,
        mobileNo: mobileNumber,
        passWord: cleanPass,
      }).unwrap();

      if (verifyResponse.result === 1) {
        const token = verifyResponse.resultData;
        if (token) await AsyncStorage.setItem('accessToken', token);

        // 2. Create User
        const createResponse = await userCreate({
          userName: route.params?.userName || 'NewUser',
          userMobileNo: mobileNumber,
          Password: cleanPass,
        }).unwrap();

        if (createResponse.result === 1) {
          const token = createResponse.resultData;
          if (token) await AsyncStorage.setItem('accessToken', token);

          Alert.alert('Success', createResponse.resultMessage || 'User created successfully');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', createResponse.resultMessage || 'User creation failed');
        }
      } else {
        Alert.alert('Verification Failed', verifyResponse.resultMessage || 'Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      console.error('Error during OTP verification and user creation:', err);
      const message = err?.data?.resultMessage || err?.error || 'Something went wrong. Please try again.';
      Alert.alert('Error', message);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setIsResending(true);
    setOTP('');
    const cleanPass = sanitizePassword(password);

    try {
      const response = await generateOTP({ mobileNo: mobileNumber, password: cleanPass }).unwrap();

      if (response.result === 1) {
        const token = response.resultData;
        if (token) await AsyncStorage.setItem('accessToken', token);

        Alert.alert('OTP Sent', 'A new OTP has been sent.');
        setTimer(3600); // Reset timer
      } else {
        Alert.alert('Error', response.resultMessage || 'Could not resend OTP');
      }
    } catch (err: any) {
      console.error('Resend OTP Error:', err);
      const msg = err?.data?.resultMessage || err?.error || 'Resend failed';
      Alert.alert('Error', msg);
    } finally {
      setIsResending(false);
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
            We sent a code to your phone
            <Text style={styles.timerText}>
              {mobileNumber ? ` (${mobileNumber})` : ''}
            </Text>
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
              (isVerifying || isCreatingUser) && { backgroundColor: theme.colors.muted },
            ]}
            onPress={handleVerifyAndCreate}
            disabled={isVerifying || isCreatingUser}
          >
            {(isVerifying || isCreatingUser) ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.buttonText}>Verify & Create User</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.timerText}>
            {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : 'Didn’t receive the code?'}
          </Text>

          {timer === 0 && (
            <TouchableOpacity onPress={handleResend} disabled={isResending || isGeneratingOTP}>
              {(isResending || isGeneratingOTP) ? (
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

export default OTPScreen;

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
