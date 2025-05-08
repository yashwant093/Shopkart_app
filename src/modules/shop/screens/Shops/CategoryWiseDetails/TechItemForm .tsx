import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const TechItemForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [storage, setStorage] = useState('');
  const [battery, setBattery] = useState('');
  const [features, setFeatures] = useState('');

  const sizeOptions = ['Small', 'Medium', 'Large', 'Extra Large'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const batteryOptions = ['3000mAh', '4000mAh', '5000mAh'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tech Item Details</Text>

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

      <Text style={styles.label}>Model</Text>
      <TextInput
        placeholder="Enter Model"
        value={model}
        onChangeText={setModel}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

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

      <Text style={styles.label}>Storage</Text>
      <View style={styles.tabContainer}>
        {storageOptions.map((storageOption, index, arr) => (
          <TouchableOpacity
            key={storageOption}
            style={[
              styles.tabItem,
              storage === storageOption && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setStorage(storageOption)}
          >
            <Text style={[styles.tabText, storage === storageOption && { color: theme.colors.white }]}>
              {storageOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Battery</Text>
      <View style={styles.tabContainer}>
        {batteryOptions.map((batteryOption, index, arr) => (
          <TouchableOpacity
            key={batteryOption}
            style={[
              styles.tabItem,
              battery === batteryOption && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setBattery(batteryOption)}
          >
            <Text style={[styles.tabText, battery === batteryOption && { color: theme.colors.white }]}>
              {batteryOption}
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

export default TechItemForm;

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
