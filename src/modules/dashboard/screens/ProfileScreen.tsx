import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import theme from '../../../shared/theme'; // adjust if needed

const ProfileScreen: React.FC = () => {
  const [fullName, setFullName] = useState('John Doe');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, City');
  const [gender, setGender] = useState('Male');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        const profile = JSON.parse(data);
        setFullName(profile.fullName || '');
        setMobileNumber(profile.mobileNumber || '');
        setEmail(profile.email || '');
        setAddress(profile.address || '');
        setGender(profile.gender || 'Male');
        setAvatarUri(profile.avatarUri || null);
      }
    };
    loadProfile();
  }, []);

  const handleEditProfile = async () => {
    if (isEditing) {
      try {
        await AsyncStorage.setItem(
          'userProfile',
          JSON.stringify({
            fullName,
            mobileNumber,
            email,
            address,
            gender,
            avatarUri,
          })
        );
        Alert.alert('Profile Saved', 'Your profile has been updated!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save profile.');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleAvatarClick = () => {
    if (!isEditing) return;
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) setAvatarUri(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={isEditing ? handleAvatarClick : undefined}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarIcon}>
              <MaterialIcons name="account" size={60} color="#fff" />
            </View>
          )}
          <Text style={styles.uploadText}>
            {isEditing ? 'Change Photo' : 'Profile Photo'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter Full Name"
          editable={isEditing}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          editable={isEditing}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
          editable={isEditing}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
          editable={isEditing}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioOption}>
            <RadioButton
              value="Male"
              status={gender === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => isEditing && setGender('Male')}
              color={theme.colors.primary}
            />
            <Text style={styles.label}>Male</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="Female"
              status={gender === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => isEditing && setGender('Female')}
              color={theme.colors.primary}
            />
            <Text style={styles.label}>Female</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title={isEditing ? 'Save Changes' : 'Edit Profile'}
            onPress={handleEditProfile}
            color={theme.colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  avatarIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadText: {
    marginTop: 10,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign:'center'
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: theme.colors.muted,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.sm,
    borderRadius: 8,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    justifyContent: 'space-around',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: theme.spacing.lg,
  },
});

export default ProfileScreen;
