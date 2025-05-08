import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const Electronics = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Mobile');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [warranty, setWarranty] = useState('1 Year');
  const [condition, setCondition] = useState('New');
  const [serialNumber, setSerialNumber] = useState('');

  const categoryOptions = ['Mobile', 'Laptop', 'Headphone', 'Smartwatch', 'Tablet', 'Camera', 'Accessory', 'Other'];
  const warrantyOptions = ['1 Year', '2 Years', '3 Years', 'No Warranty'];
  const conditionOptions = ['New', 'Refurbished', 'Used'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Electronics Product Details</Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        placeholder="Enter Product Name"
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

      <Text style={styles.label}>Color</Text>
      <TextInput
        placeholder="Enter Color"
        value={color}
        onChangeText={setColor}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Material (or Model)</Text>
      <TextInput
        placeholder="Enter Material or Model"
        value={material}
        onChangeText={setMaterial}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Warranty</Text>
      <View style={styles.dropdown}>
        {warrantyOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, warranty === option && styles.optionSelected]}
            onPress={() => setWarranty(option)}
          >
            <Text style={[styles.optionText, warranty === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Condition</Text>
      <View style={styles.dropdown}>
        {conditionOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, condition === option && styles.optionSelected]}
            onPress={() => setCondition(option)}
          >
            <Text style={[styles.optionText, condition === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Serial Number</Text>
      <TextInput
        placeholder="Enter Serial Number"
        value={serialNumber}
        onChangeText={setSerialNumber}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />
    </ScrollView>
  );
};

export default Electronics;

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
});
