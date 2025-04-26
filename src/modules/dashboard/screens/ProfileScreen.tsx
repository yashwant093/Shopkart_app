import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper'; // <-- Add this
import theme from '../../../shared/theme';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('John');
  const [lastname, setLastname] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, City');
  const [gender, setGender] = useState('Male');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    if (isEditing) {
      Alert.alert('Profile Saved', 'Your profile has been updated!');
    }
    setIsEditing(!isEditing);
  };

  const handleAvatarClick = () => {
    Alert.alert('Upload avatar functionality coming soon!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleAvatarClick}>
          <View style={styles.avatarIcon}>
            <MaterialIcons name="account" size={60} color="#fff" />
          </View>
          <Text style={styles.uploadText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter First Name"
          editable={isEditing}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          placeholder="Enter Last Name"
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
            />
            <Text>Male</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="Female"
              status={gender === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => isEditing && setGender('Female')}
            />
            <Text>Female</Text>
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
  uploadText: {
    marginTop: 10,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
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
