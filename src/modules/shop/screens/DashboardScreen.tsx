import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../shared/theme';

const DashboardScreen = ({ navigation }: any) => {
  const items = [
    { id: '1', image: require('../../../assets/splashImg.jpg'), label: 'Item 1' },
    { id: '2', image: require('../../../assets/splashImg.jpg'), label: 'Item 2' },
    { id: '3', image: require('../../../assets/splashImg.jpg'), label: 'Item 3' },
    { id: '4', image: require('../../../assets/splashImg.jpg'), label: 'Item 4' },
    { id: '5', image: require('../../../assets/splashImg.jpg'), label: 'Item 5' },
  ];

  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const [modalVisible, setModalVisible] = useState(false);

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
                  <Image source={item.image} style={[styles.itemImage, isSelected && styles.selectedItemBorder]} />
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
      </ScrollView>

      {/* Floating Create Shop Button */}
      <TouchableOpacity style={styles.createShopButton} onPress={openCreateShopModal}>
        <MaterialIcons name="store" size={30} color={theme.colors.background} />
        <Text style={styles.createShopButtonText}>Create{'\n'}Shop</Text>
      </TouchableOpacity>

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
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  itemImage: {
    width: 80,
    height: 50,
    borderRadius: theme.spacing.xs,
  },
  selectedItemBorder: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.spacing.xs,
  },
  itemLabel: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
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
});

export default DashboardScreen;
