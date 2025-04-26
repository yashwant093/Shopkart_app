import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import theme from '../../../shared/theme';

const DashboardScreen = () => {
  const items = [
    { id: '1', image: require('../../../assets/splashImg.jpg'), label: 'Item 1' },
    { id: '2', image: require('../../../assets/splashImg.jpg'), label: 'Item 2' },
    { id: '3', image: require('../../../assets/splashImg.jpg'), label: 'Item 3' },
    { id: '4', image: require('../../../assets/splashImg.jpg'), label: 'Item 4' },
    { id: '5', image: require('../../../assets/splashImg.jpg'), label: 'Item 5' },
  ];

  const [selectedItem, setSelectedItem] = useState<any>(items[0]); // default to first item

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors.background,
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
    borderRadius: 8,
  },
  selectedItemBorder: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 8,
  },
  itemLabel: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
  },
  selectedItemContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  selectedItemText: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  detailsText: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text,
  },
});

export default DashboardScreen;
