import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const WomenCloths = () => {
  const [womanBrand, setWomanBrand] = useState('');
  const [womanClothingCategory, setWomanClothingCategory] = useState('');
  const [womanSize, setWomanSize] = useState('');
  const [womanColor, setWomanColor] = useState('');
  const [womanMaterial, setWomanMaterial] = useState('');
  const [womanOccasion, setWomanOccasion] = useState('');

  const clothingCategories = [
    'Top', 'Tunic', 'Dress', 'Kurti', 'Saree', 'Lehenga',
    'Jeans', 'Skirt', 'Leggings', 'Suit Set', 'Jacket', 'Other'
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const occasionOptions = ['Casual', 'Formal', 'Party', 'Festive', 'Wedding'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Women's Clothing Details</Text>

      <Text style={styles.label}>Brand</Text>
      <TextInput
        placeholder="Brand"
        value={womanBrand}
        onChangeText={setWomanBrand}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Clothing Category</Text>
      <View style={styles.dropdown}>
        {clothingCategories.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.categoryItem, womanClothingCategory === item && styles.categorySelected]}
            onPress={() => setWomanClothingCategory(item)}
          >
            <Text style={[styles.categoryText, womanClothingCategory === item && { color: theme.colors.white }]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Size</Text>
      <View style={styles.tabContainer}>
        {sizeOptions.map((size, index, arr) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.tabItem,
              womanSize === size && styles.tabSelected,
              index !== arr.length - 1 && { marginRight: 10 },
            ]}
            onPress={() => setWomanSize(size)}
          >
            <Text style={[styles.tabText, womanSize === size && { color: theme.colors.white }]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Color</Text>
      <TextInput
        placeholder="Color"
        value={womanColor}
        onChangeText={setWomanColor}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Material</Text>
      <TextInput
        placeholder="Material"
        value={womanMaterial}
        onChangeText={setWomanMaterial}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Occasion</Text>
      <View style={styles.dropdown}>
        {occasionOptions.map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.categoryItem, womanOccasion === item && styles.categorySelected]}
            onPress={() => setWomanOccasion(item)}
          >
            <Text style={[styles.categoryText, womanOccasion === item && { color: theme.colors.white }]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default WomenCloths;

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
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
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
