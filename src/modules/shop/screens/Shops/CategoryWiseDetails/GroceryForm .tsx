import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const Grocery = () => {
  const [itemName, setItemName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const categoryOptions = ['Fruits', 'Vegetables', 'Dairy', 'Beverages', 'Bakery', 'Snacks', 'Other'];
  const unitOptions = ['kg', 'g', 'liters', 'ml', 'pack', 'piece'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Grocery Item Details</Text>

      <Text style={styles.label}>Item Name</Text>
      <TextInput
        placeholder="Enter Item Name"
        value={itemName}
        onChangeText={setItemName}
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

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        placeholder="Enter Quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unit</Text>
      <View style={styles.dropdown}>
        {unitOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, unit === option && styles.optionSelected]}
            onPress={() => setUnit(option)}
          >
            <Text style={[styles.optionText, unit === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Grocery;

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
    fontFamily: fonts.regular,
  },
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  optionItem: {
    padding: spacing.sm,
    margin: spacing.xs,
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
    fontFamily: fonts.regular,
  },
});
