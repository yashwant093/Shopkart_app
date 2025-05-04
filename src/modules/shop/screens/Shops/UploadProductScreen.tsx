import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import theme from '../../../../shared/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { label: 'Men Clothes', value: 'men_clothes' },
  { label: 'Women Clothes', value: 'women_clothes' },
  { label: 'Kids Clothes', value: 'kids_clothes' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Grocery', value: 'grocery' },
  { label: 'Mobile and Computers', value: 'mobile_computers' },
  { label: 'Home Furnishing', value: 'home_furnishing' },
  { label: 'Gifts and Toys', value: 'gifts_toys' },
  { label: 'Jewellers', value: 'jewellers' },
  { label: 'Furniture', value: 'furniture' },
];

export default function UploadProductScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<{ front?: any; back?: any; side?: any }>({});

  const pickImage = async (side: 'front' | 'back' | 'side') => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    const asset = result?.assets?.[0];
    if (asset) {
      setImages(prev => ({ ...prev, [side]: asset }));
    }
  };


  const handleSubmit = () => {
    if (!productName || !price || !category || !images.front) {
      Alert.alert('Validation', 'Please fill all required fields and upload at least one image.');
      return;
    }

    const productPayload = {
      name: productName,
      description,
      price,
      stock,
      category,
      images, // base64 or uri format
    };

    console.log('Uploading product:', productPayload);
    Alert.alert('Success', 'Product uploaded successfully!');
    // Call your API or Firebase function here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="store" size={24} color={theme.colors.primary} />
        <Text style={styles.title}>Upload Product</Text>
      </View>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Stock Quantity</Text>
      <TextInput
        placeholder="Stock Quantity"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={theme.colors.muted}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.dropdown}>
        {categories.map(item => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.categoryItem,
              category === item.value && styles.categorySelected,
            ]}
            onPress={() => setCategory(item.value)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item.value && { color: theme.colors.white },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>

        ))}
      </View>

      <Text style={styles.label}>Upload Images</Text>
      <View style={styles.imageRow}>
        <TouchableOpacity onPress={() => pickImage('front')} style={styles.imageBox}>
          {images.front ? (
            <Image source={{ uri: images.front.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imageLabel}>Front</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage('back')} style={styles.imageBox}>
          {images.back ? (
            <Image source={{ uri: images.back.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imageLabel}>Back</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage('side')} style={styles.imageBox}>
          {images.side ? (
            <Image source={{ uri: images.side.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imageLabel}>Side</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
        <Text style={styles.uploadButtonText}>Upload Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 8,
  },
  input: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    color: theme.colors.text,
  },
  label: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
  },
  dropdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  categoryItem: {
    padding: 8,
    margin: 4,
    borderRadius: 6,
    backgroundColor: theme.colors.surface, // default background
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categorySelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.regular, // replace with your actual font
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  imageBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageLabel: {
    color: theme.colors.muted,
  },
  uploadButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageColumn: {
    alignItems: 'center',
    flex: 1,
  },
  imageLabelTop: {
    marginBottom: 4,
    color: theme.colors.text,
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
