import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const GiftAndToysForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [features, setFeatures] = useState('');

  const sizeOptions = ['Small', 'Medium', 'Large'];
  const ageGroupOptions = ['0-3', '4-7', '8-12', '13+'];
  const materialOptions = ['Plastic', 'Wood', 'Fabric', 'Metal'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gift and Toy Details</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Brand</Text>
      <TextInput
        placeholder="Enter Brand"
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Type</Text>
      <TextInput
        placeholder="Enter Type"
        value={type}
        onChangeText={setType}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Material</Text>
      <View style={styles.tabContainer}>
        {materialOptions.map((materialOption, index, arr) => (
          <TouchableOpacity
            key={materialOption}
            style={[
              styles.tabItem,
              material === materialOption && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setMaterial(materialOption)}
          >
            <Text style={[styles.tabText, material === materialOption && { color: theme.colors.white }]}>
              {materialOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Color</Text>
      <TextInput
        placeholder="Enter Color"
        value={color}
        onChangeText={setColor}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Size</Text>
      <View style={styles.tabContainer}>
        {sizeOptions.map((sizeOption, index, arr) => (
          <TouchableOpacity
            key={sizeOption}
            style={[
              styles.tabItem,
              size === sizeOption && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setSize(sizeOption)}
          >
            <Text style={[styles.tabText, size === sizeOption && { color: theme.colors.white }]}>
              {sizeOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Age Group</Text>
      <View style={styles.tabContainer}>
        {ageGroupOptions.map((ageGroupOption, index, arr) => (
          <TouchableOpacity
            key={ageGroupOption}
            style={[
              styles.tabItem,
              ageGroup === ageGroupOption && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setAgeGroup(ageGroupOption)}
          >
            <Text style={[styles.tabText, ageGroup === ageGroupOption && { color: theme.colors.white }]}>
              {ageGroupOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Features</Text>
      <TextInput
        placeholder="Enter Features"
        value={features}
        onChangeText={setFeatures}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />
    </ScrollView>
  );
};

export default GiftAndToysForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    padding: spacing.sm,
    marginBottom: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  tabItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  tabSelected: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fonts.size.md,
    color: colors.text,
    textAlign: 'center',
  },
});
