import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Modal, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../shared/theme';
// import GraphScreen from './GraphScreen';

const DashboardScreen = ({ navigation }: any) => {
  const items = [
    { id: '1', image: require('../../../assets/splashImg.jpg'), label: 'All Categories' },
    { id: '2', image: require('../../../assets/splashImg.jpg'), label: 'Mens Clothes' },
    { id: '3', image: require('../../../assets/splashImg.jpg'), label: 'Women Clothes' },
    { id: '4', image: require('../../../assets/splashImg.jpg'), label: 'Kids Clothes' },
    { id: '5', image: require('../../../assets/splashImg.jpg'), label: 'Electronics' },
    { id: '6', image: require('../../../assets/splashImg.jpg'), label: 'Cosmetics' },
    { id: '7', image: require('../../../assets/splashImg.jpg'), label: 'Grocery' },
    { id: '8', image: require('../../../assets/splashImg.jpg'), label: 'Mobile and Computers' },
    { id: '9', image: require('../../../assets/splashImg.jpg'), label: 'Home Furnishing' },
    { id: '10', image: require('../../../assets/splashImg.jpg'), label: 'Jewllers' },
    { id: '11', image: require('../../../assets/splashImg.jpg'), label: 'Gifts and Toys' },
    { id: '12', image: require('../../../assets/splashImg.jpg'), label: 'Furniture' },
  ];

  const adImages = [
    require('../../../assets/add1.jpg'),
    require('../../../assets/add2.jpg'),
    require('../../../assets/add3.jpg'),
    require('../../../assets/add1.jpg'),
    require('../../../assets/add2.jpg'),
    require('../../../assets/add3.jpg'),
    // Add more images here
  ];

  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const openCreateShopModal = () => {
    setModalVisible(true);
  };

  const closeCreateShopModal = () => {
    setModalVisible(false);
  };

  const handleCreateShopModal = () => {
    setModalVisible(false);
    navigation.navigate('CreateShop');
  };

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Horizontal FlatList */}
          <FlatList
            horizontal
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.itemContainer}>
                  <Image source={item.image} style={[styles.itemImage, isSelected && styles.selectedItemBorder]} resizeMode='stretch' />
                  <Text style={styles.itemLabel}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
          />


          {/* Selected Item Details */}
          {selectedItem && (
            <View style={styles.selectedItemContainer}>
              <Text style={styles.selectedItemText}>You selected: {selectedItem.label}</Text>
              <Text style={styles.detailsText}>This is the details for {selectedItem.label}.</Text>
            </View>
          )}
        </View>

        {/* Scrollable Advertisement Image */}
        <View style={styles.advertisementContainr}>
          <FlatList
          style={styles.flatlistContainr}
            data={adImages}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            ref={flatListRef}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={styles.advertisementImag}
                resizeMode="stretch"
              />
            )}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />

          {/* Dots Indicator */}
          <View style={styles.pagination}>
            {adImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: currentIndex === index ? theme.colors.primary : theme.colors.muted },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Scrollable Advertisement Image */}
        <View style={styles.advertisementContainr}>
          <FlatList
           style={styles.flatlistContainr}
            data={adImages}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            ref={flatListRef}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={styles.advertisementImag}
                resizeMode="stretch"
              />
            )}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />

          {/* Dots Indicator */}
          <View style={styles.pagination}>
            {adImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: currentIndex === index ? theme.colors.primary : theme.colors.muted },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Advertisement Image */}
        <View style={styles.advertisementContainer}>
          <Image
            source={require('../../../assets/add2.jpg')} // Your advertisement image
            style={styles.advertisementImage}
            resizeMode='stretch'
          />
        </View>

      </ScrollView>

      {/* Floating Create Shop Button */}
      <TouchableOpacity style={styles.createShopButton} onPress={openCreateShopModal}>
        <MaterialIcons name="store" size={30} color={theme.colors.background} />
        <Text style={styles.createShopButtonText}>Create{'\n'}Shop</Text>
      </TouchableOpacity>

      {/* 👇 Add Graph Component here */}
      {/* <GraphScreen /> */}

      {/* Modal for Create Shop */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeCreateShopModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>

            {/* Close Button */}
            <TouchableOpacity onPress={closeCreateShopModal} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color={theme.colors.primary} />
            </TouchableOpacity>

            {/* Store Icon */}
            <View style={styles.imageContainer}>
              <MaterialIcons name="store" size={60} color={theme.colors.text} />
            </View>

            {/* Title */}
            <Text style={styles.modalMainTitle}>
              Sell in <Text style={{ color: theme.colors.primary }}>30 Seconds</Text>
            </Text>

            {/* Description */}
            <Text style={styles.modalDescription}>Get your branded shop yourshop.kraftly.com</Text>
            <Text style={styles.modalDescription}>Sell on Facebook, WhatsApp, Instagram</Text>
            <Text style={styles.modalDescription}>Accept COD & prepaid payments</Text>
            <Text style={styles.modalDescription}>Ship your products anywhere in Our Area</Text>

            {/* Create Shop Button */}
            <TouchableOpacity style={styles.modalCreateButton} onPress={handleCreateShopModal}>
              <Text style={styles.modalCreateButtonText}>Create Shop</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    paddingBottom: 100,
  },
  container: {
    paddingHorizontal: theme.spacing.sm,
  },
  flatListContainer: {
    paddingBottom: theme.spacing.xs,
    flexGrow: 0,
    justifyContent: 'flex-start',
  },

  itemContainer: {
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.spacing.xs,
    width: 100, // Fixed width for consistency
  },
  itemImage: {
    width: '100%', // Fixed width for image
    height: 50, // Fixed height for image
    borderRadius: theme.spacing.xs,
  },
  selectedItemBorder: {
    // borderWidth: 2,
    // borderColor: theme.colors.primary,
    // borderRadius: theme.spacing.xs,
  },
  itemLabel: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fonts.size.small,
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    textAlign: 'center', // Center the label text
    width: 100, // Align label width to image width
    height: 15, // Fixed height for consistency
    overflow: 'hidden', // Ensure text stays within the fixed height
  },
  selectedItemContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedItemText: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  detailsText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  createShopButton: {
    position: 'absolute',
    bottom: theme.spacing.lg * 3,
    right: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    paddingVertical: theme.spacing.xs,
  },
  createShopButtonText: {
    color: theme.colors.background,
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    width: '85%',
    borderRadius: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: theme.colors.background,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalMainTitle: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  modalDescription: {
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  modalCreateButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.spacing.sm,
  },
  modalCreateButtonText: {
    color: theme.colors.background,
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.xs,
    zIndex: 1,
  },
  advertisementContainer: {
    marginBottom: theme.spacing.md, // Add space below the ad
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: theme.spacing.sm,
  },
  advertisementImage: {
    width: '95%', // Adjust width to match the screen width
    height: 200,  // Set a height for the advertisement image
  },
  advertisementContainr: {
    height: 200, // Adjust height as you want
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  advertisementImag: {
    width: Dimensions.get('window').width, // Full screen width
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: theme.spacing.sm,          // 👈 spacing.sm = 8
    alignSelf: 'center',
  },
  dot: {
    width: theme.spacing.sm,           // 👈 spacing.sm = 8
    height: theme.spacing.sm,          // 👈 spacing.sm = 8
    marginHorizontal: theme.spacing.xs, // 👈 spacing.xs = 4
  },
  flatlistContainr : {
    marginHorizontal: theme.spacing.sm, // 👈 spacing.xs = 4
  }
});

export default DashboardScreen;
