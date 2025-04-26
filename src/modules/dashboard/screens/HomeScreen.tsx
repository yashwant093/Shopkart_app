import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../../shared/components/CustomHeader';
import theme from '../../../shared/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>🏠 Home Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: theme.fonts.size.md, color: theme.colors.text },
});

export default HomeScreen;
