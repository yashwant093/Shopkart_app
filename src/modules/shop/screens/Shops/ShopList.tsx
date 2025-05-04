import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../shared/theme/colors';
import spacing from '../../../../shared/theme/spacing';
import fonts from '../../../../shared/theme/fonts';
import theme from '../../../../shared/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const shops = [
  {
    id: '1',
    name: 'Fresh Mart',
    category: 'Grocery',
    address: '123 Main St, New York',
    productCount: 120,
    logo: require('../../../../assets/add1.jpg'),
    mobileNumber: '1234567890',
    email: 'fresh@mart.com',
    aboutShop: 'We sell fresh groceries daily.',
    panNumber: 'ABCDE1234F',
    pincode: '10001',
    locality: 'Downtown',
    landmark: 'Near Central Park',
    city: 'New York',
    state: 'NY',
    country: 'USA',
  },
  {
    id: '2',
    name: 'Style Hub',
    category: 'Clothing',
    address: '45 Fashion Ave, LA',
    productCount: 300,
    logo: require('../../../../assets/add1.jpg'),
    mobileNumber: '9876543210',
    email: 'style@hub.com',
    aboutShop: 'Trendy clothing store.',
    panNumber: 'FGHIJ5678K',
    pincode: '90001',
    locality: 'Fashion District',
    landmark: 'Near 7th Street',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
  },
  // Add more shops as needed
];

const ShopList = ({ navigation }:any) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(prev => (prev === id ? null : id));
  };

  const navigateToShopDetail = (shopId: string) => {
    navigation.navigate('ShopDetailScreen', { shopId });  // Pass the shopId to the next screen
  };

  return (
    <ScrollView contentContainerStyle={styles.listContent} style={styles.container}>
      {shops.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <View key={item.id} style={styles.cardTouchable}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)} activeOpacity={0.7}>
              <View style={styles.itemContainer}>
                <Image source={item.logo} style={styles.logo} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.address}>{item.address}</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.productCount}>Products: {item.productCount}</Text>
                  {isExpanded ? (
                    <MaterialIcons name="chevron-up" size={25} color={colors.primary} />
                  ) : (
                    <MaterialIcons name="chevron-down" size={25} color={colors.primary} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {isExpanded && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Mobile : {item.mobileNumber}</Text>
                <Text style={styles.detailText}>Email : {item.email}</Text>
                <Text style={styles.detailText}>About : {item.aboutShop}</Text>
                <Text style={styles.detailText}>PAN : {item.panNumber}</Text>
                <Text style={styles.detailText}>Pincode : {item.pincode}</Text>
                <Text style={styles.detailText}>Locality : {item.locality}</Text>
                <Text style={styles.detailText}>Landmark : {item.landmark}</Text>
                <Text style={styles.detailText}>City : {item.city}</Text>
                <Text style={styles.detailText}>State : {item.state}</Text>
                <Text style={styles.detailText}>Country : {item.country}</Text>

                <TouchableOpacity
                  onPress={() => navigateToShopDetail(item.id)}
                  style={styles.editButton}>
                  <Text style={styles.editButtonText}>Go Shop</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  cardTouchable: {
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: colors.surface,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
    alignSelf: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  category: {
    fontSize: fonts.size.sm,
    color: colors.primary,
    fontFamily: fonts.medium,
    marginVertical: spacing.xs,
  },
  address: {
    fontSize: fonts.size.sm,
    color: colors.textMuted,
    fontFamily: fonts.regular,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 6,
  },
  productCount: {
    fontSize: fonts.size.sm,
    color: colors.success,
    fontFamily: fonts.medium,
    marginBottom: 4,
  },
  detailsContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  detailText: {
    fontSize: fonts.size.md,
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: theme.spacing.sm,
  },
  editButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: fonts.size.md,
    color: colors.white,
    fontFamily: fonts.medium,
  },
});

export default ShopList;
