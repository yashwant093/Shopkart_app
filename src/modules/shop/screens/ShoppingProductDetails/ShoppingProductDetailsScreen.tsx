import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../../shared/theme';

const ShoppingProductDetailsScreen: React.FC = ({ route }: any) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [pincode, setPincode] = useState<string>('');
  const [city, setCity] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [showBankOffer, setShowBankOffer] = useState(false);

  const getDiscountedPrice = (price: number, discount: number = 0) => {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  const totalPrice = getDiscountedPrice(product.price, product.offerPercentage || 0) * quantity;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Product details not available.</Text>
      </View>
    );
  }

  const handleBuyNow = () => {
    Alert.alert('Purchased', `${product.name} purchased!`);
  };

  const handleChat = () => {
    Alert.alert('Add To Cart', `${product.name}`);
    // Replace with navigation or chat SDK integration
  };

  const handlePincodeChange = (text: string) => {
    setPincode(text);
    // Simulating fetching related city and address based on the pincode
    if (text === '110001') {
      setCity('Delhi');
      setAddress('Connaught Place, New Delhi');
      setShowBankOffer(true); // Simulate showing a bank offer for this pincode
    } else {
      setCity(null);
      setAddress(null);
      setShowBankOffer(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: product.imageUrl }} style={styles.mainImage} />
          </View>

          <View style={styles.thumbnailContainer}>
            {product.thumbnails?.map((thumb: string, index: number) => (
              <Image key={index} source={{ uri: thumb }} style={styles.thumbnail} />
            ))}
          </View>

          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" color="#f4c150" size={18} />
            <Text style={styles.ratingText}>4.9 Ratings</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.ratingText}>2.3k+ Reviews</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.ratingText}>2.9k+ Sold</Text>
          </View>

          {/* MRP and Discount */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>MRP:</Text>
            <Text style={styles.infoValue}>${product.price}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Offer:</Text>
            <Text style={styles.infoValue}>Save {product.offerPercentage}%</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Discount:</Text>
            <Text style={styles.infoValue}>
              -${(product.price * (product.offerPercentage || 0)) / 100}
            </Text>
          </View>

          {/* Size Selection */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Size:</Text>
            <View style={styles.sizeSelect}>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSize,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Delivery and Pincode */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Enter Pincode:</Text>
            <TextInput
              style={styles.pincodeInput}
              placeholder="Enter Pincode"
              keyboardType="number-pad"
              value={pincode}
              onChangeText={handlePincodeChange}
            />
          </View>

          {/* Display City and Address if Pincode is valid */}
          {city && address && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>City:</Text>
              <Text style={styles.infoValue}>{city}</Text>
            </View>
          )}
          {city && address && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{address}</Text>
            </View>
          )}

          {/* Bank Offer */}
          {showBankOffer && (
            <View style={styles.bankOfferContainer}>
              <Text style={styles.bankOfferText}>Special Bank Offers Available!</Text>
            </View>
          )}

          {/* Delivery Date */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Delivery Date:</Text>
            <Text style={styles.infoValue}>2-3 business days</Text>
          </View>

          {/* COD Payment */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cash on Delivery:</Text>
            <Text style={styles.infoValue}>Available</Text>
          </View>

          {/* Material & Care Details */}
          <View style={styles.detailsTab}>
            <Text style={styles.detailsText}>Material: 100% Cotton</Text>
            <Text style={styles.detailsText}>Pattern: Solid</Text>
            <Text style={styles.detailsText}>Care: Machine wash</Text>
          </View>
        </ScrollView>

        {/* Bottom Total + Buttons */}
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>
              ${totalPrice.toFixed(2)}{' '}
              {product.offerPercentage ? (
                <Text style={styles.originalPrice}>
                  ${ (product.price * quantity).toFixed(2) }
                </Text>
              ) : null}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
              <Text style={styles.footerButtonText}>Add Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
              <Text style={styles.footerButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 140,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  mainImage: {
    width: 250,
    height: 250,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
    marginVertical: theme.spacing.sm,
    color: theme.colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  ratingText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.secondary,
    marginHorizontal: 4,
  },
  separator: {
    color: theme.colors.secondary,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: theme.spacing.xs,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  infoValue: {
    marginLeft: 4,
    color: theme.colors.text,
  },
  sizeSelect: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginHorizontal: 5,
  },
  selectedSize: {
    backgroundColor: theme.colors.primary,
  },
  sizeButtonText: {
    color: theme.colors.primary,
  },
  selectedSizeText: {
    color: theme.colors.white,
  },
  pincodeInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  bankOfferContainer: {
    backgroundColor: theme.colors.success,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  bankOfferText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  totalContainer: {
    flex: 1.5,
    justifyContent: 'center',
    paddingRight: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 12,
    marginLeft: 6,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
   // Tabs Container
   tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  tabButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.size.md,
  },
  selectedTab: {
    backgroundColor: theme.colors.primary,
  },
  // Selected tab text color
  tabButtonTextSelected: {
    color: theme.colors.white,
  },

  // Details Tab
  detailsTab: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  detailsText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
});

export default ShoppingProductDetailsScreen;
