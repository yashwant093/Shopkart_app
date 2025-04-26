// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import theme from '../../../../shared/theme';

// const SelectImagesScreen = () => {
//   const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
//   const [logo, setLogo] = useState<string | null>(null);

//   const handleSelectCoverPhoto = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         setCoverPhoto(response.assets[0].uri || null);
//       }
//     });
//   };

//   const handleSelectLogo = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         setLogo(response.assets[0].uri || null);
//       }
//     });
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//     >
//       {/* Cover Photo */}
//       <TouchableOpacity style={styles.coverPhotoContainer} onPress={handleSelectCoverPhoto}>
//         {coverPhoto ? (
//           <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
//         ) : (
//           <Text style={styles.coverPhotoText}>Add Cover Photo</Text>
//         )}
//       </TouchableOpacity>

//       {/* Logo */}
//       <TouchableOpacity style={styles.logoContainer} onPress={handleSelectLogo}>
//         {logo ? (
//           <Image source={{ uri: logo }} style={styles.logo} />
//         ) : (
//           <Text style={styles.logoText}>Add Logo</Text>
//         )}
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     padding: theme.spacing.lg,
//     justifyContent: 'center',
//   },
//   coverPhotoContainer: {
//     height: 150,
//     backgroundColor: theme.colors.surface,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: theme.spacing.lg,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   coverPhoto: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   coverPhotoText: {
//     color: theme.colors.text,
//     fontSize: theme.fonts.size.md,
//   },
//   logoContainer: {
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//     backgroundColor: theme.colors.surface,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     overflow: 'hidden',
//   },
//   logo: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   logoText: {
//     color: theme.colors.text,
//     fontSize: theme.fonts.size.sm,
//     textAlign: 'center',
//   },
// });

// export default SelectImagesScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import theme from '../../../../shared/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateShop = () => {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [shopName, setShopName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aboutShop, setAboutShop] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const handleSelectCoverPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setCoverPhoto(response.assets[0].uri || null);
      }
    });
  };

  const handleSelectLogo = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setLogo(response.assets[0].uri || null);
      }
    });
  };

  const handleInputChange = () => {
    // Check if all required fields are filled
    const isFilled: any =
      shopName &&
      mobileNumber &&
      email &&
      aboutShop &&
      panNumber &&
      pincode &&
      locality &&
      landmark &&
      city &&
      state &&
      country;

    setIsSaveButtonEnabled(isFilled);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Heading */}
        <Text style={styles.heading}>Add Shop Details</Text>

        <View style={styles.PhotoContainer}>
          {/* Cover Photo */}
          <View style={styles.NestedPhotoContainer}>
            <TouchableOpacity style={styles.coverPhotoContainer} onPress={handleSelectCoverPhoto}>
              {coverPhoto ? (
                <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
              ) : (
                <View style={styles.iconTextContainer}>
                  <MaterialIcons name="camera" size={24} color={theme.colors.primary} />
                  <Text style={styles.coverPhotoText}> Add Cover Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.NestedLogoContainer}>
            <TouchableOpacity style={styles.logoContainer} onPress={handleSelectLogo}>
              {logo ? (
                <Image source={{ uri: logo }} style={styles.logo} />
              ) : (
                <View style={styles.iconTextContainer}>
                  <MaterialIcons name="camera" size={20} color={theme.colors.primary} />
                  <Text style={styles.logoText}>Add Logo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>


        {/* Form Fields */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Shop Name <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={50} placeholder="Enter shop name" placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Mobile Number <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={10} placeholder="Enter mobile number" placeholderTextColor={theme.colors.muted} keyboardType="phone-pad" onChangeText={(text) => { setMobileNumber(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={50} placeholder="Enter email" placeholderTextColor={theme.colors.muted} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => { setEmail(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>About Shop <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={[styles.input, { height: 100 }]} maxLength={100} placeholder="Describe your shop" placeholderTextColor={theme.colors.muted} multiline onChangeText={(text) => { setAboutShop(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>PAN Number <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={10} placeholder="Enter PAN number" placeholderTextColor={theme.colors.muted} />
        </View>

        {/* Address Section */}
        <Text style={styles.OtherOptionlabel}>Other Options</Text>
        <Text style={styles.addressHeading}>Our logistics partner will pick up packages from this address</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Shop Number</Text>
          <TextInput style={styles.input} maxLength={50} placeholder="Enter shop number" placeholderTextColor={theme.colors.muted} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Pincode <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={6} placeholder="Enter pincode" placeholderTextColor={theme.colors.muted} keyboardType="numeric" onChangeText={(text) => { setPincode(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Locality <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={100} placeholder="Enter locality" placeholderTextColor={theme.colors.muted} onChangeText={(text) => { setLocality(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Landmark <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={100} placeholder="Enter landmark" placeholderTextColor={theme.colors.muted} onChangeText={(text) => { setLandmark(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>City <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={100} placeholder="Enter city" placeholderTextColor={theme.colors.muted} onChangeText={(text) => { setCity(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>State <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={100} placeholder="Enter state" placeholderTextColor={theme.colors.muted} onChangeText={(text) => { setState(text); handleInputChange(); }} />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Country <Text style={styles.asterisk}>*</Text></Text>
          <TextInput style={styles.input} maxLength={100} placeholder="Enter country" placeholderTextColor={theme.colors.muted} onChangeText={(text) => { setCountry(text); handleInputChange(); }} />
        </View>

      </ScrollView>
      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: isSaveButtonEnabled ? theme.colors.primary : theme.colors.disabled }]}
        disabled={!isSaveButtonEnabled}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CreateShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: theme.spacing.lg,
  },
  heading: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  PhotoContainer: {
    marginBottom: theme.spacing.xl
  },
  coverPhotoContainer: {
    height: 170,
    // backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    // borderRadius: 8,
    overflow: 'hidden',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverPhotoText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.md,
  },
  logoContainer: {
    position: 'absolute', // Position the logo on top of the cover photo
    left: '30%', // Horizontally center the logo
    transform: [{ translateY: -70 }], // Center the logo properly
    height: 60,
    width: 80,
    // borderRadius: 30,
    backgroundColor: theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
    borderWidth: 1
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.sm,
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
  OtherOptionlabel: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 6,
    padding: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  addressHeading: {
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    paddingTop: theme.spacing.xs,
    // marginVertical: theme.spacing.md,
    paddingBottom: theme.spacing.md
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  NestedPhotoContainer: {
    backgroundColor: theme.colors.text,
    height: 170,
    width: '100%'
  },
  NestedLogoContainer: {
    backgroundColor: theme.colors.text,
    height: 0,
    width: '10%'
  },
  asterisk: {
    color: theme.colors.danger,
  },
  saveButton: {
    paddingVertical: theme.spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.md,
  },
});
