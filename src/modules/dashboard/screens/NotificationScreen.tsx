import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../shared/theme'
import CustomHeader from '../../../shared/components/CustomHeader'

// Mock data for notifications
const mockNotifications = [
  { 
    id: '1', 
    title: 'Order Confirmed', 
    message: 'Your order #12345 has been confirmed and is being processed.',
    time: '2 hours ago',
    read: false,
    icon: 'check-circle'
  },
  { 
    id: '2', 
    title: 'Special Offer', 
    message: 'Get 20% off on all electronics this weekend!',
    time: '5 hours ago',
    read: false,
    icon: 'tag'
  },
  { 
    id: '3', 
    title: 'Delivery Update', 
    message: 'Your order #12345 will be delivered tomorrow.',
    time: '1 day ago',
    read: true,
    icon: 'truck-delivery'
  },
  { 
    id: '4', 
    title: 'Payment Successful', 
    message: 'Your payment of $159.99 was successful.',
    time: '2 days ago',
    read: true,
    icon: 'credit-card'
  },
  { 
    id: '5', 
    title: 'New Collection', 
    message: 'Check out our new summer collection!',
    time: '3 days ago',
    read: true,
    icon: 'tshirt-crew'
  },
]

const NotificationScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        !item.read && styles.unreadNotification
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.read ? 'rgba(211, 47, 47, 0.1)' : theme.colors.primary }]}>
        <MaterialIcons 
          name={item.icon} 
          size={24} 
          color={item.read ? theme.colors.primary : theme.colors.white} 
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>      
      <FlatList
        data={mockNotifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity>
              <Text style={styles.markAllRead}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="bell-off" size={50} color={theme.colors.muted} />
            <Text style={styles.emptyText}>No notifications yet</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.fonts.size.lg,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  markAllRead: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.primary,
    fontFamily: theme.fonts.medium,
  },
  notificationsList: {
    padding: theme.spacing.md,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: 'rgba(211, 47, 47, 0.05)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.muted,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: theme.fonts.size.xs,
    color: theme.colors.muted,
  },
  unreadDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
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

export default NotificationScreen
