// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Share } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from '../../../../shared/theme';
// import { Portal, Snackbar } from 'react-native-paper'; // Importing Snackbar component from react-native-paper
// import { useNavigation } from '@react-navigation/native';

// const ShoppingDashboardCategory = () => {
//   const navigation = useNavigation<any>();
//     const items = [
//     { id: '1', image: require('../../../../assets/splashImg.jpg'), label: 'All Categories' },
//     { id: '2', image: require('../../../../assets/splashImg.jpg'), label: 'Mens Clothes' },
//     { id: '3', image: require('../../../../assets/splashImg.jpg'), label: 'Women Clothes' },
//     { id: '4', image: require('../../../../assets/splashImg.jpg'), label: 'Kids Clothes' },
//     { id: '5', image: require('../../../../assets/splashImg.jpg'), label: 'Electronics' },
//     { id: '6', image: require('../../../../assets/splashImg.jpg'), label: 'Cosmetics' },
//     { id: '7', image: require('../../../../assets/splashImg.jpg'), label: 'Grocery' },
//     { id: '8', image: require('../../../../assets/splashImg.jpg'), label: 'Mobile and Computers' },
//     { id: '9', image: require('../../../../assets/splashImg.jpg'), label: 'Home Furnishing' },
//     { id: '10', image: require('../../../../assets/splashImg.jpg'), label: 'Jewllers' },
//     { id: '11', image: require('../../../../assets/splashImg.jpg'), label: 'Gifts and Toys' },
//     { id: '12', image: require('../../../../assets/splashImg.jpg'), label: 'Furniture' },
//   ];

//   const products = [
//     { id: '1', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
//     { id: '2', name: 'Dress', category: 'Women Clothes', image: require('../../../../assets/splashImg.jpg'), price: 2000, discount: 25 },
//     { id: '3', name: 'Kids Jacket', category: 'Kids Clothes', image: require('../../../../assets/add2.jpg'), price: 1500, discount: 15 },
//     { id: '4', name: 'Smartphone', category: 'Electronics', image: require('../../../../assets/splashImg.jpg'), price: 25000, discount: 10 },
//     { id: '5', name: 'Lipstick', category: 'Cosmetics', image: require('../../../../assets/add3.jpg'), price: 500, discount: 5 },
//     { id: '6', name: 'Rice', category: 'Grocery', image: require('../../../../assets/splashImg.jpg'), price: 1200, discount: 8 },
//     { id: '7', name: 'Laptop', category: 'Mobile and Computers', image: require('../../../../assets/add4.jpg'), price: 50000, discount: 12 },
//     { id: '8', name: 'Sofa', category: 'Furniture', image: require('../../../../assets/splashImg.jpg'), price: 15000, discount: 18 },
//     { id: '9', name: 'Ring', category: 'Jewllers', image: require('../../../../assets/add1.jpg'), price: 8000, discount: 30 },
//     { id: '10', name: 'Toy Car', category: 'Gifts and Toys', image: require('../../../../assets/splashImg.jpg'), price: 700, discount: 10 },
//     { id: '11', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
//     { id: '12', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
//     { id: '13', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
//   ];

//   const [selectedItem, setSelectedItem] = useState<any>(items[0]);
//   const [filteredProducts, setFilteredProducts] = useState<any[]>(products);
//   // const [wishlist, setWishlist] = useState<string[]>([]);
//   const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>('');

// const handleItemClick = (item: any) => {
//   setSelectedItem(item);
//   if (item.label === 'All Categories') {
//     setFilteredProducts(products);
//   } else {
//     const filtered = products.filter((product) => product.category === item.label);
//     setFilteredProducts(filtered);
//   }
// };

//   const handleWishlistToggle = (productId: string) => {
//     let message = '';
//     // if (wishlist.includes(productId)) {
//     //   setWishlist(wishlist.filter(id => id !== productId));
//     //   message = 'Removed from wishlist ❌';
//     // } else {
//     //   setWishlist([...wishlist, productId]);
//     //   message = 'Added to wishlist ✅';
//     // }

//     // Show the Snackbar with the message
//     setSnackbarMessage(message);
//     setSnackbarVisible(true);

//     // Hide the Snackbar after a duration (e.g., 2 seconds)
//     setTimeout(() => {
//       setSnackbarVisible(false);
//     }, 2000);
//   };

//   const handleShare = async (productName: string) => {
//     try {
//       await Share.share({
//         message: `Check out this product: ${productName}`,
//       });
//     } catch (error) {
//       console.error('Error sharing:', error);
//     }
//   };

// const handleProductClick = (product: any) => {
//   navigation.navigate('ShoppingProductDetails', {
//     product: {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       imageUrl: product.imageUrl,
//       category: product.category,
//     },
//   });
// };

//   return (
//     <View style={styles.fullContainer}>
//       <FlatList
//         ListHeaderComponent={
//           <>
//             <FlatList
//               horizontal
//               data={items}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => {
//                 const isSelected = selectedItem?.id === item.id;
//                 return (
//                   <TouchableOpacity
//                     onPress={() => handleItemClick(item)}
//                     style={[styles.itemContainer, isSelected && styles.selectedItemBorder]}
//                   >
//                     <Image source={item.image} style={styles.itemImage} resizeMode="stretch" />
//                     <Text style={styles.itemLabel}>{item.label}</Text>
//                   </TouchableOpacity>
//                 );
//               }}
//               contentContainerStyle={styles.flatListContainer}
//               showsHorizontalScrollIndicator={false}
//             />
//           </>
//         }
//         data={filteredProducts}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         renderItem={({ item }) => {
//           const discountPrice = (item.price - (item.price * item.discount) / 100).toFixed(0);
//           return (
//             <TouchableOpacity
//               onPress={() => handleProductClick(item)}
//               style={styles.productCard} // Make the whole card clickable
//             >
//               <View style={styles.imageContainer}>
//                 <Image source={item.image} style={styles.productImage} resizeMode="stretch" />
//               </View>
//               <Text style={styles.productName}>{item.name}</Text>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.discountPrice}>₹{discountPrice}</Text>
//                 <Text style={styles.originalPrice}>₹{item.price}</Text>
//               </View>
//               <Text style={styles.discountText}>{item.discount}% OFF</Text>
//             </TouchableOpacity>
//           );
//         }}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Snackbar for wishlist feedback */}
//       <Portal>
//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={Snackbar.DURATION_SHORT}
//           style={{
//             backgroundColor: theme.colors.secondary,
//             borderRadius: 10,
//             paddingHorizontal: 20,
//             marginBottom: 50,
//           }}
//           action={{
//             label: 'Dismiss',
//             onPress: () => setSnackbarVisible(false),
//             color: theme.colors.danger,
//           }}
//         >
//           <Text style={{ color: theme.colors.danger, fontWeight: 'bold' }}>
//             {snackbarMessage}
//           </Text>
//         </Snackbar>
//       </Portal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   fullContainer: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     paddingHorizontal: theme.spacing.sm,
//   },
//   flatListContainer: {
//     paddingVertical: theme.spacing.sm,
//   },
//   itemContainer: {
//     alignItems: 'center',
//     marginRight: theme.spacing.sm,
//     borderWidth: 0.5,
//     borderColor: theme.colors.text,
//     width: 100,
//   },
//   itemImage: {
//     width: '100%',
//     height: 50,
//   },
//   selectedItemBorder: {
//     borderWidth: 1,
//     borderColor: theme.colors.primary,
//   },
//   itemLabel: {
//     marginTop: theme.spacing.xs,
//     fontSize: theme.fonts.size.small,
//     color: theme.colors.text,
//     fontFamily: theme.fonts.medium,
//     textAlign: 'center',
//     width: 100,
//     height: 15,
//     overflow: 'hidden',
//   },
//   imageContainer: {
//     position: 'relative',
//     width: '100%',
//     height: 100,
//   },
//   productCard: {
//     backgroundColor: theme.colors.background,
//     borderWidth: 0.5,
//     borderColor: theme.colors.text,
//     marginBottom: theme.spacing.sm,
//     width: (Dimensions.get('window').width / 2) - theme.spacing.md * 2,
//     padding: theme.spacing.xs,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//   },
//   shareIcon: {
//     position: 'absolute',
//     top: 40,
//     left: 140,
//     backgroundColor: theme.colors.background,
//     padding: 3,
//     borderRadius: 20,
//   },
//   wishlistIcon: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: theme.colors.background,
//     padding: 3,
//     borderRadius: 20,
//   },
//   productName: {
//     marginTop: theme.spacing.xs,
//     fontSize: theme.fonts.size.small,
//     fontFamily: theme.fonts.medium,
//     color: theme.colors.text,
//     textAlign: 'center',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: theme.spacing.xs,
//   },
//   discountPrice: {
//     fontSize: theme.fonts.size.md,
//     fontFamily: theme.fonts.medium,
//     color: theme.colors.primary,
//   },
//   originalPrice: {
//     textDecorationLine: 'line-through',
//     marginLeft: theme.spacing.sm,
//     fontSize: theme.fonts.size.small,
//     fontFamily: theme.fonts.regular,
//     color: theme.colors.text,
//   },
//   discountText: {
//     color: theme.colors.primary,
//     fontSize: theme.fonts.size.xs,
//     fontFamily: theme.fonts.medium,
//     marginTop: theme.spacing.xs,
//   },
// });

// export default ShoppingDashboardCategory;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../shared/theme';

const ShoppingDashboardCategory = () => {
  const navigation = useNavigation<any>();

  const items = [
    { id: '1', image: require('../../../../assets/splashImg.jpg'), label: 'All Categories' },
    { id: '2', image: require('../../../../assets/splashImg.jpg'), label: 'Mens Clothes' },
    { id: '3', image: require('../../../../assets/splashImg.jpg'), label: 'Women Clothes' },
    { id: '4', image: require('../../../../assets/splashImg.jpg'), label: 'Kids Clothes' },
    { id: '5', image: require('../../../../assets/splashImg.jpg'), label: 'Electronics' },
    { id: '6', image: require('../../../../assets/splashImg.jpg'), label: 'Cosmetics' },
    { id: '7', image: require('../../../../assets/splashImg.jpg'), label: 'Grocery' },
    { id: '8', image: require('../../../../assets/splashImg.jpg'), label: 'Mobile and Computers' },
    { id: '9', image: require('../../../../assets/splashImg.jpg'), label: 'Home Furnishing' },
    { id: '10', image: require('../../../../assets/splashImg.jpg'), label: 'Jewllers' },
    { id: '11', image: require('../../../../assets/splashImg.jpg'), label: 'Gifts and Toys' },
    { id: '12', image: require('../../../../assets/splashImg.jpg'), label: 'Furniture' },
  ];

  const products = [
    { id: '1', name: 'T-Shirt', category: 'Mens Clothes', image: require('../../../../assets/add1.jpg'), price: 1000, discount: 20 },
    { id: '2', name: 'Jeans', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 2000, discount: 15 },
    { id: '3', name: 'Jacket', category: 'Mens Clothes', image: require('../../../../assets/add2.jpg'), price: 3000, discount: 25 },
    { id: '4', name: 'Sweater', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 1500, discount: 10 },
    { id: '5', name: 'Shorts', category: 'Mens Clothes', image: require('../../../../assets/add3.jpg'), price: 1200, discount: 5 },
    { id: '6', name: 'Shirt', category: 'Mens Clothes', image: require('../../../../assets/add4.jpg'), price: 800, discount: 30 },
    { id: '7', name: 'Suit', category: 'Mens Clothes', image: require('../../../../assets/splashImg.jpg'), price: 5000, discount: 18 },
    // Add other categories and products as needed
  ];

  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [seeMoreVisible, setSeeMoreVisible] = useState<boolean>(false);

  useEffect(() => {
    const filterProductsByCategory = (category: string) => {
      const categoryProducts = products.filter((product) => product.category === category);
      const categoryProductCount = categoryProducts.length;

      if (categoryProductCount > 4) {
        setSeeMoreVisible(true);
        setFilteredProducts(categoryProducts.slice(0, 4));
      } else {
        setSeeMoreVisible(categoryProductCount > 0); // Only true if there are products
        setFilteredProducts(categoryProducts);
      }
    };

    if (selectedItem) {
      if (selectedItem.label === 'All Categories') {
        const allCategoryProductCount = products.length;

        if (allCategoryProductCount > 4) {
          setSeeMoreVisible(true); // Show 'See More' if there are more than 4 total products
          setFilteredProducts(products.slice(0, 4)); // Display only the first 4
        } else {
          setSeeMoreVisible(allCategoryProductCount > 0); // Only true if there are products
          setFilteredProducts(products); // Display all products if there are <= 4
        }
      } else {
        filterProductsByCategory(selectedItem.label);
      }
    }
  }, [selectedItem]);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    if (item.label === 'All Categories') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === item.label);
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (product: any) => {
    navigation.navigate('ShoppingProductDetails', {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        category: product.category,
      },
    });
  };

  const handleSeeMore = () => {
    console.log('see more button pressed')
  };

  return (
    <View style={styles.fullContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <FlatList
              horizontal
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <TouchableOpacity
                    onPress={() => handleItemClick(item)}
                    style={[styles.itemContainer, isSelected && styles.selectedItemBorder]}
                  >
                    <Image source={item.image} style={styles.itemImage} resizeMode="stretch" />
                    <Text style={styles.itemLabel}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
            />
            {/* Display the selected category name above the products */}
            <Text style={styles.selectedCategoryText}>
              {selectedItem.label}
            </Text>
          </>
        }
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => {
          const discountPrice = (item.price - (item.price * item.discount) / 100).toFixed(0);
          return (
            <>
              <TouchableOpacity style={styles.productCard}
                onPress={() => handleProductClick(item)} >
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
            </>
          );
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.flatListProductContainer}
        showsVerticalScrollIndicator={false}
      />

      {filteredProducts.length === 0 && (
        <Text style={{ textAlign: 'center', color: theme.colors.text, marginVertical: 10 }}>
          No products found in this category.
        </Text>
      )}

      {seeMoreVisible && (
        <TouchableOpacity onPress={handleSeeMore} style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingLeft: 10,
  },
  itemContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  itemLabel: {
    fontSize: 12,
    color: theme.colors.primary,
    marginTop: 5,
  },
  selectedItemBorder: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: theme.colors.primary,
    textAlign: 'center',
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
    color: theme.colors.white
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
  seeMoreButton: {
    marginBottom: 20,
    paddingVertical: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: -20
  },
  seeMoreText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListProductContainer: {
    paddingBottom: 20, // Adjust as needed for spacing between the last product and the see more button
  },
});

export default ShoppingDashboardCategory;
