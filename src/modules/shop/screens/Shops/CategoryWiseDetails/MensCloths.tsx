import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const MensCloths = () => {
  const [manBrand, setManBrand] = useState('');
  const [manClothingCategory, setManClothingCategory] = useState('');
  const [selectedSizeTab, setSelectedSizeTab] = useState('');
  const [manColor, setManColor] = useState('');
  const [manMaterial, setManMaterial] = useState('');
  const [manOccasion, setManOccasion] = useState('');

  // Dropdown data for Clothing Category
  const clothingCategories = [
    { label: 'Shirt', value: 'Shirt' },
    { label: 'T-Shirt', value: 'T-Shirt' },
    { label: 'Jeans', value: 'Jeans' },
    { label: 'Trouser', value: 'Trouser' },
    { label: 'Jacket', value: 'Jacket' },
    { label: 'Suit', value: 'Suit' },
    { label: 'Shorts', value: 'Shorts' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Men's Clothing Form</Text>

      <Text style={styles.label}>Brand</Text>
      <TextInput
        placeholder="Brand"
        value={manBrand}
        onChangeText={setManBrand}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Clothing Category</Text>
      <View style={styles.dropdown}>
        {['Shirt', 'T-Shirt', 'Jeans', 'Trouser', 'Jacket', 'Suit', 'Shorts', 'Other'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.categoryItem, manClothingCategory === item && styles.categorySelected]}
            onPress={() => setManClothingCategory(item)}
          >
            <Text style={[styles.categoryText, manClothingCategory === item && { color: theme.colors.white }]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Size</Text>
      <View style={styles.tabContainer}>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size, index, arr) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.tabItem,
              selectedSizeTab === size && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setSelectedSizeTab(size)}
          >
            <Text
              style={[styles.tabText, selectedSizeTab === size && { color: theme.colors.white }]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Color</Text>
      <TextInput
        placeholder="Color"
        value={manColor}
        onChangeText={setManColor}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Material</Text>
      <TextInput
        placeholder="Material"
        value={manMaterial}
        onChangeText={setManMaterial}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Occasion</Text>
      <View style={styles.dropdown}>
        {['Casual', 'Formal', 'Party', 'Festive', 'Wedding'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryItem,
              manOccasion === item && styles.categorySelected,
            ]}
            onPress={() => setManOccasion(item)}
          >
            <Text
              style={[
                styles.categoryText,
                manOccasion === item && { color: theme.colors.white },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default MensCloths;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fonts.size.md,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    color: colors.text,
    fontSize: fonts.size.md,
    backgroundColor: colors.surface,
  },
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginVertical: 8,
  },
  categoryItem: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categorySelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: fonts.size.md,
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  tabItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
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
