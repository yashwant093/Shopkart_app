import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import theme from '../../../../shared/theme';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fonts from '../../../../shared/theme/fonts';
import spacing from '../../../../shared/theme/spacing';
import colors from '../../../../shared/theme/colors';

const products = [
  { id: '1', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
  { id: '2', name: 'Jeans', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 2000, discount: 15 },
  { id: '3', name: 'Jacket', category: 'Mens Clothes', image: require('../../../../assets/add2.jpg'), price: 3000, discount: 25 },
  { id: '4', name: 'Sweater', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 1500, discount: 10 },
  { id: '5', name: 'Shorts', category: 'Mens Clothes', image: require('../../../../assets/add3.jpg'), price: 1200, discount: 5 },
  { id: '6', name: 'Shirt', category: 'Mens Clothes', image: require('../../../../assets/add4.jpg'), price: 800, discount: 30 },
  { id: '7', name: 'Suit', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 5000, discount: 18 },
];

const ShopDetailScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { shop } = route.params;
  const [showShopDetails, setShowShopDetails] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleProductClick = (product: any) => {
    navigation.navigate('ShoppingProductDetails', { product });
  };
  
  const handleUploadProductClick = () => {
    navigation.navigate('UploadProductScreen');
  };

  const renderProduct = ({ item }: any) => {
    const discountPrice = (item.price - (item.price * item.discount) / 100).toFixed(0);

    return (
      <TouchableOpacity style={styles.productCard} onPress={() => handleProductClick(item)}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.productImage} resizeMode="stretch" />
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>₹{discountPrice}</Text>
          <Text style={styles.originalPrice}>₹{item.price}</Text>
        </View>
        <Text style={styles.discountText}>{item.discount}% OFF</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.gradientHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setShowShopDetails(!showShopDetails)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.gradientTitle}>{shop.name}</Text>
              <Icon
                name={showShopDetails ? 'expand-less' : 'expand-more'}
                size={24}
                color={theme.colors.white}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setTooltipVisible(true)} style={styles.tooltipIcon}>
            <Icon name="more-vert" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

      </LinearGradient>

      <Modal transparent visible={tooltipVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setTooltipVisible(false)}
        >
          <View style={styles.tooltipContainer}>
            <TouchableOpacity style={styles.tooltipItem}>
              <Text style={styles.tooltipText}>Edit Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tooltipItem}  onPress={handleUploadProductClick}>
              <Text style={styles.tooltipText}>Upload Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tooltipItem}>
              <Text style={styles.tooltipText}>Report</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.bannerContainer}>
        <Image source={require('../../../../assets/add1.jpg')} style={styles.coverPhoto} />
        <Image source={require('../../../../assets/add1.jpg')} style={styles.logo} />
      </View>

      {showShopDetails && (
        <View style={styles.shopDetailsContainer}>
          <Text style={styles.title}>Shop Details</Text>

          {[
            ['Shop ID', shop.id],
            ['Shop Name', shop.name],
            ['Category', shop.category],
            ['Address', shop.address],
            ['Mobile', shop.mobileNumber],
            ['Email', shop.email],
            ['About', shop.aboutShop],
            ['PAN', shop.panNumber],
            ['Pincode', shop.pincode],
            ['Locality', shop.locality],
            ['Landmark', shop.landmark],
            ['City', shop.city],
            ['State', shop.state],
            ['Country', shop.country],
          ].map(([label, value]) => (
            <View style={styles.shopDetailRow} key={label}>
              <Text style={styles.label}>{label}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.flatListProductContainer}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
  },
  gradient: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  gradientHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tooltipIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
    marginTop: '20%',
  },
  tooltipContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    paddingVertical: 10,
    width: 150,
    elevation: 5,
    shadowColor: theme.colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tooltipItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tooltipText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  logo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.white,
    resizeMode: 'cover',
  },
  productCard: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '45%',
  },
  imageContainer: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: theme.colors.white,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: theme.colors.danger,
  },
  discountText: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  flatListProductContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.bold,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  label: {
    fontSize: fonts.size.md,
    fontFamily: fonts.medium,
    marginTop: spacing.sm,
    color: colors.text,
  },
  value: {
    fontSize: fonts.size.md,
    fontFamily: fonts.regular,
    color: colors.textMuted,
  },
  shopDetailsContainer: {
    marginTop: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.white,
    padding: theme.spacing.lg,
  },
  shopDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
