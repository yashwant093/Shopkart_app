import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import spacing from '../../../../../shared/theme/spacing';
import colors from '../../../../../shared/theme/colors';
import fonts from '../../../../../shared/theme/fonts';
import theme from '../../../../../shared/theme';

const Cosmetics = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [productType, setProductType] = useState('');
  const [shade, setShade] = useState('');
  const [fragrance, setFragrance] = useState('');
  const [volume, setVolume] = useState('');

  const productTypeOptions = ['Lipstick', 'Foundation', 'Mascara', 'Nail Polish', 'Perfume', 'Blush', 'Other'];
  const fragranceOptions = ['Floral', 'Fruity', 'Spicy', 'Woody', 'Fresh'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cosmetics Product Details</Text>

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

      <Text style={styles.label}>Product Type</Text>
      <View style={styles.dropdown}>
        {productTypeOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, productType === option && styles.optionSelected]}
            onPress={() => setProductType(option)}
          >
            <Text style={[styles.optionText, productType === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Shade</Text>
      <TextInput
        placeholder="Enter Shade"
        value={shade}
        onChangeText={setShade}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Fragrance</Text>
      <View style={styles.dropdown}>
        {fragranceOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.optionItem, fragrance === option && styles.optionSelected]}
            onPress={() => setFragrance(option)}
          >
            <Text style={[styles.optionText, fragrance === option && { color: theme.colors.white }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Volume (ml)</Text>
      <TextInput
        placeholder="Enter Volume (ml)"
        value={volume}
        onChangeText={setVolume}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
        keyboardType="numeric"
      />
    </ScrollView>
  );
};

export default Cosmetics;

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
