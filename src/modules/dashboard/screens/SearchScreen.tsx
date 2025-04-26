import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../shared/theme'
import CustomHeader from '../../../shared/components/CustomHeader'

// Mock data for search results
const mockItems = [
  { id: '1', name: 'T-Shirt', category: 'Clothing', price: '$19.99' },
  { id: '2', name: 'Jeans', category: 'Clothing', price: '$39.99' },
  { id: '3', name: 'Sneakers', category: 'Footwear', price: '$59.99' },
  { id: '4', name: 'Watch', category: 'Accessories', price: '$99.99' },
  { id: '5', name: 'Backpack', category: 'Bags', price: '$49.99' },
  { id: '6', name: 'Headphones', category: 'Electronics', price: '$79.99' },
  { id: '7', name: 'Sunglasses', category: 'Accessories', price: '$29.99' },
]

const SearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState(mockItems)

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    
    if (text.trim() === '') {
      setResults(mockItems)
      return
    }
    
    const filtered = mockItems.filter(item => 
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.category.toLowerCase().includes(text.toLowerCase())
    )
    
    setResults(filtered)
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.itemIconContainer}>
        <MaterialIcons name="shopping" size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="magnify" size={24} color={theme.colors.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.muted}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <MaterialIcons name="close" size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="magnify" size={50} color={theme.colors.muted} />
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
    fontSize: theme.fonts.size.md,
  },
  resultsList: {
    padding: theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.muted,
  },
  itemPrice: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fonts.size.md,
    color: theme.colors.muted,
    textAlign: 'center',
  },
})

export default SearchScreen
