import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import CustomHeader from '../../../shared/components/CustomHeader'; // 👈 Import header
import theme from '../../../shared/theme';

const CartScreen = () => {
  const handleCheckout = () => {
    Alert.alert('Checkout', 'Checkout process coming soon!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🛒 Your Cart</Text>
        <Text style={styles.info}>You have 3 items in your cart.</Text>

        <View style={styles.buttonWrapper}>
          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
            color={theme.colors.success}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fonts.size.xl,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  info: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: theme.spacing.lg,
  },
});

export default CartScreen;
