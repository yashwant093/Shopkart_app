import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const FurnitureItemFrom = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Chair');
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('Medium');
  const [color, setColor] = useState('');
  const [occasion, setOccasion] = useState('Living Room');

  const categoryOptions = ['Chair', 'Sofa', 'Table', 'Bed', 'Cabinet', 'Bookshelf', 'Desk', 'Wardrobe'];
  const materialOptions = ['Wood', 'Metal', 'Plastic', 'Fabric', 'Leather'];
  const sizeOptions = ['Small', 'Medium', 'Large'];
  const occasionOptions = ['Living Room', 'Office', 'Dining Room', 'Bedroom', 'Outdoor'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Furniture Details</Text>

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

      <Text style={styles.label}>Category</Text>
      <View style={styles.dropdown}>
        {categoryOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, category === option && styles.optionSelected]}
            onPress={() => setCategory(option)}
          >
            <Text style={[styles.optionText, category === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Material</Text>
      <View style={styles.dropdown}>
        {materialOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, material === option && styles.optionSelected]}
            onPress={() => setMaterial(option)}
          >
            <Text style={[styles.optionText, material === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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

      <Text style={styles.label}>Color</Text>
      <TextInput
        placeholder="Enter Color"
        value={color}
        onChangeText={setColor}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Occasion</Text>
      <View style={styles.dropdown}>
        {occasionOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, occasion === option && styles.optionSelected]}
            onPress={() => setOccasion(option)}
          >
            <Text style={[styles.optionText, occasion === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default FurnitureItemFrom;

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
  optionItem: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primary,
  },
  optionText: {
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
