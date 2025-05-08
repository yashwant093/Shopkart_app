
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
import MensCloths from './CategoryWiseDetails/MensCloths';
import WomenCloths from './CategoryWiseDetails/WomenCloths ';
import KidsCloths from './CategoryWiseDetails/KidsCloths';
import ElectronicsForm from './CategoryWiseDetails/ElectronicsForm ';
import CosmeticsForm from './CategoryWiseDetails/CosmeticsForm';
import GroceryForm from './CategoryWiseDetails/GroceryForm ';
import HomeFurnishingItemForm from './CategoryWiseDetails/HomeFurnishingItemForm ';
import FurnitureItemForm from './CategoryWiseDetails/FurnitureItemForm';
import TechItemForm from './CategoryWiseDetails/TechItemForm ';
import GiftToyItemForm from './CategoryWiseDetails/GiftToyItemForm ';
import JewelryItemForm from './CategoryWiseDetails/JewelryItemForm ';

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

// MenClothingItem Interface
interface MenClothingItem {
  id: string;
  manName: string;
  manBrand: string;
  manCategory: 'Shirt' | 'T-Shirt' | 'Jeans' | 'Trouser' | 'Jacket' | 'Suit' | 'Shorts' | 'Other';
  manSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';
  manColor: string;
  manMaterial: string;
  manMrice: number;
  manQuantity: number;
  manSku: string;
  manInStock: boolean;
  manAddedDate: string;
  manImageUrl?: string;
  manDescription?: string;
}

interface WomenClothingItem {
  id: string;
  name: string;
  brand: string;
  category:
  | 'Top'
  | 'Tunic'
  | 'Dress'
  | 'Kurti'
  | 'Saree'
  | 'Lehenga'
  | 'Jeans'
  | 'Skirt'
  | 'Leggings'
  | 'Suit Set'
  | 'Jacket'
  | 'Other';
  size:
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'Plus Size'
  | 'Free Size'
  | 'Custom';
  color: string;
  material: string;
  price: number;
  quantity: number;
  sku: string;
  inStock: boolean;
  addedDate: string;
  imageUrl?: string;
  description?: string;
  occasion?: 'Casual' | 'Formal' | 'Party' | 'Festive' | 'Wedding';
}


export default function UploadProductScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<{ front?: any; back?: any; side?: any }>({});

  // Men Clothing Specific Fields
  const [manBrand, setManBrand] = useState('');
  const [manClothingCategory, setManClothingCategory] = useState<'Shirt' | 'T-Shirt' | 'Jeans' | 'Trouser' | 'Jacket' | 'Suit' | 'Shorts' | 'Other'>('Shirt');
  const [manSize, setManSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom'>('M');
  const [manColor, setManColor] = useState('');
  const [manMaterial, setManMaterial] = useState('');

  // Women Clothing Specific Fields
  const [womanBrand, setWomanBrand] = useState('');
  const [womanClothingCategory, setWomanClothingCategory] = useState('Top');
  const [womanSize, setWomanSize] = useState('M');
  const [womanColor, setWomanColor] = useState('');
  const [womanMaterial, setWomanMaterial] = useState('');
  const [womanOccasion, setWomanOccasion] = useState('Casual');

  // Kids Clothing Specific Fields
  const [kidsBrand, setKidsBrand] = useState('');
  const [kidsClothingCategory, setKidsClothingCategory] = useState<'Shirt' | 'T-Shirt' | 'Jeans' | 'Shorts' | 'Frock' | 'Sweater' | 'Other'>('T-Shirt');
  const [kidsSize, setKidsSize] = useState<'0-1Y' | '1-2Y' | '2-3Y' | '3-4Y' | '4-5Y' | '5-6Y' | '6-8Y' | '8-10Y' | '10-12Y' | 'Custom'>('2-3Y');
  const [kidsColor, setKidsColor] = useState('');
  const [kidsMaterial, setKidsMaterial] = useState('');

  // Electronics Specific Fields
  const [electronicsBrand, setElectronicsBrand] = useState('');
  const [electronicsModel, setElectronicsModel] = useState('');
  const [electronicsType, setElectronicsType] = useState<'Mobile' | 'Laptop' | 'Tablet' | 'Headphone' | 'Camera' | 'Other'>('Mobile');
  const [electronicsWarranty, setElectronicsWarranty] = useState<'1 Year' | '2 Years' | '3 Years' | 'Other'>('1 Year');
  const [electronicsColor, setElectronicsColor] = useState('');
  const [electronicsSpecifications, setElectronicsSpecifications] = useState('');

  // Cosmetics Specific Fields
  const [cosmeticsBrand, setCosmeticsBrand] = useState('');
  const [cosmeticsType, setCosmeticsType] = useState<'Lipstick' | 'Foundation' | 'Mascara' | 'Eyeshadow' | 'Blush' | 'Other'>('Lipstick');
  const [cosmeticsShade, setCosmeticsShade] = useState('');
  const [cosmeticsSkinType, setCosmeticsSkinType] = useState<'Oily' | 'Dry' | 'Combination' | 'Sensitive'>('Oily');
  const [cosmeticsVolume, setCosmeticsVolume] = useState('');
  const [cosmeticsIngredients, setCosmeticsIngredients] = useState('');

  // Grocery Specific Fields
  const [groceryBrand, setGroceryBrand] = useState('');
  const [groceryType, setGroceryType] = useState<'Vegetable' | 'Fruit' | 'Dairy' | 'Cereal' | 'Snacks' | 'Beverage' | 'Other'>('Vegetable');
  const [groceryWeight, setGroceryWeight] = useState('');
  const [groceryExpirationDate, setGroceryExpirationDate] = useState('');
  const [groceryStorageInstructions, setGroceryStorageInstructions] = useState('');

  // Mobile and Computers Specific Fields
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [deviceOS, setDeviceOS] = useState('');
  const [deviceRAM, setDeviceRAM] = useState('');
  const [deviceStorage, setDeviceStorage] = useState('');
  const [deviceProcessor, setDeviceProcessor] = useState('');
  const [deviceColor, setDeviceColor] = useState('');
  const [deviceWarranty, setDeviceWarranty] = useState('');

  // Home Furnishing Specific Fields
  const [furnishingBrand, setFurnishingBrand] = useState('');
  const [furnishingMaterial, setFurnishingMaterial] = useState('');
  const [furnishingColor, setFurnishingColor] = useState('');
  const [furnishingDimensions, setFurnishingDimensions] = useState('');
  const [furnishingUsage, setFurnishingUsage] = useState<'Indoor' | 'Outdoor'>('Indoor');
  const [furnishingAssemblyRequired, setFurnishingAssemblyRequired] = useState<boolean>(false);

  // Gifts and Toys Specific Fields
  const [giftBrand, setGiftBrand] = useState('');
  const [giftType, setGiftType] = useState<'Toy' | 'Gift Set' | 'Puzzle' | 'Doll' | 'Action Figure' | 'Other'>('Toy');
  const [giftMaterial, setGiftMaterial] = useState('');
  const [giftColor, setGiftColor] = useState('');
  const [giftAgeRange, setGiftAgeRange] = useState<'0-3' | '4-6' | '7-10' | '11-14' | '15+'>('0-3');
  const [giftBatteryRequired, setGiftBatteryRequired] = useState<boolean>(false);
  const [giftDimensions, setGiftDimensions] = useState('');

  // Jewellers Specific Fields
  const [jewelryType, setJewelryType] = useState<'Necklace' | 'Ring' | 'Bracelet' | 'Earring' | 'Brooch' | 'Other'>('Necklace');
  const [jewelryMaterial, setJewelryMaterial] = useState('');
  const [jewelryColor, setJewelryColor] = useState('');
  const [jewelrySize, setJewelrySize] = useState('');
  const [jewelryWeight, setJewelryWeight] = useState('');
  const [jewelryStoneType, setJewelryStoneType] = useState('');
  const [jewelryStoneColor, setJewelryStoneColor] = useState('');
  const [jewelryOccasion, setJewelryOccasion] = useState<'Casual' | 'Party' | 'Wedding' | 'Formal'>('Casual');

  // Furniture Specific Fields
  const [furnitureBrand, setFurnitureBrand] = useState('');
  const [furnitureMaterial, setFurnitureMaterial] = useState('');
  const [furnitureDimensions, setFurnitureDimensions] = useState('');
  const [furnitureColor, setFurnitureColor] = useState('');
  const [furnitureStyle, setFurnitureStyle] = useState('Modern');

  const pickImage = async (side: 'front' | 'back' | 'side') => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    const asset = result?.assets?.[0];
    if (asset) {
      setImages(prev => ({ ...prev, [side]: asset }));
    }
  };

  const handleSubmitForm = () => {
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
      images,
      ...(category === 'men_clothes' && {
        manBrand,
        manClothingCategory,
        manSize,
        manColor,
        manMaterial,
      }),
      ...(category === 'women_clothes' && {
        womanBrand,
        womanClothingCategory,
        womanSize,
        womanColor,
        womanMaterial,
        womanOccasion,
      }),
      ...(category === 'kids_clothes' && {
        kidsBrand,
        kidsClothingCategory,
        kidsSize,
        kidsColor,
        kidsMaterial,
      }),
      ...(category === 'electronics' && {
        electronicsBrand,
        electronicsModel,
        electronicsType,
        electronicsWarranty,
        electronicsColor,
        electronicsSpecifications,
      }),
      ...(category === 'cosmetics' && {
        cosmeticsBrand,
        cosmeticsType,
        cosmeticsShade,
        cosmeticsSkinType,
        cosmeticsVolume,
        cosmeticsIngredients,
      }),
      ...(category === 'grocery' && {
        groceryBrand,
        groceryType,
        groceryWeight,
        groceryExpirationDate,
        groceryStorageInstructions,
      }),
      ...(category === 'tech_item' && {
        deviceBrand,
        deviceModel,
        deviceOS,
        deviceRAM,
        deviceStorage,
        deviceProcessor,
        deviceColor,
        deviceWarranty,
      }),
      ...(category === 'home_furnishing' && {
        furnishingBrand,
        furnishingMaterial,
        furnishingColor,
        furnishingDimensions,
        furnishingUsage,
        furnishingAssemblyRequired,
      }),
      ...(category === 'gift_toys' && {
        giftBrand,
        giftType,
        giftMaterial,
        giftColor,
        giftAgeRange,
        giftBatteryRequired,
        giftDimensions,
      }),
      ...(category === 'jewelry' && {
        jewelryType,
        jewelryMaterial,
        jewelryColor,
        jewelrySize,
        jewelryWeight,
        jewelryStoneType,
        jewelryStoneColor,
        jewelryOccasion,
      }),
      ...(category === 'furniture' && {
        furnitureBrand,
        furnitureMaterial,
        furnitureDimensions,
        furnitureColor,
        furnitureStyle,
      }),
    };

    console.log('Uploading product:', productPayload);
    Alert.alert('Success', 'Product uploaded successfully!');
    // Call your API or Firebase function here
  };

  const handleUploadProductButton = () => {
    handleSubmitForm()
  }

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
            style={[styles.categoryItem, category === item.value && styles.categorySelected]}
            onPress={() => setCategory(item.value)}
          >
            <Text style={[styles.categoryText, category === item.value && { color: theme.colors.white }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {category === 'men_clothes' && (
        <>
          {/* Rendering Men's Clothes Form */}
          <MensCloths />
        </>
      )}

      {category === 'women_clothes' && (
        <>
          {/* Rendering Women's Clothes Form */}
          <WomenCloths />
        </>
      )}

      {category === 'kids_clothes' && (
        <>
          {/* Rendering Kids' Clothes Form */}
          <KidsCloths />
        </>
      )}

      {category === 'electronics' && (
        <>
          {/* Rendering Electronics Form */}
          <ElectronicsForm />
        </>
      )}

      {category === 'cosmetics' && (
        <>
          {/* Rendering Cosmetics Form */}
          <CosmeticsForm />
        </>
      )}

      {category === 'grocery' && (
        <>
          {/* Rendering Grocery Form */}
          <GroceryForm />
        </>
      )}

      {category === 'tech_item' && (
        <>
          {/* Rendering Mobile and Computer Tech Item Form */}
          <TechItemForm />
        </>
      )}

      {category === 'home_furnishing' && (
        <>
          {/* Rendering Home Furnishing Item Form */}
          <HomeFurnishingItemForm />
        </>
      )}

      {category === 'gift_toys' && (
        <>
          {/* Rendering Gift and Toys Item Form */}
          <GiftToyItemForm />
        </>
      )}

      {category === 'jewelry' && (
        <>
          {/* Rendering Jewelry Item Form */}
          <JewelryItemForm />
        </>
      )}

      {category === 'furniture' && (
        <>
          {/* Rendering Furniture Item Form */}
          <FurnitureItemForm />
        </>
      )}


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

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadProductButton}>
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
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categorySelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.regular,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute tabs evenly
    marginVertical: 10, // Optional: Add margin around tabs
  },
  tabItem: {
    flex: 1, // Ensures all tabs have the same width
    paddingVertical: 5, // Optional: Add padding for height
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    backgroundColor: theme.colors.surface, // Add background color for unselected tabs
    borderRadius: 8, // Optional: Rounded corners for each tab
    borderWidth: 1, // Add border for unselected tabs
    borderColor: theme.colors.border, // Border color for unselected tabs
  },
  tabSelected: {
    backgroundColor: theme.colors.primary, // Add color for selected tab
    borderColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.text, // Default text color
    fontSize: 16, // Optional: Adjust font size
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  imageLabel: {
    color: theme.colors.muted,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.lg,
  },
  titleContainer: {
    flexDirection: 'row', // Arrange icon and title horizontally
    alignItems: 'center', // Vertically align the icon and title
    marginVertical: 16, // Add vertical spacing around the title container
  },
});
