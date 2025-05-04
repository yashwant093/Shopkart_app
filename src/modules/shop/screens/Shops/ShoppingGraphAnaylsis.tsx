
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../../../shared/theme/colors';
import spacing from '../../../../shared/theme/spacing';
import theme from '../../../../shared/theme';

const categoryData = [
  { label: 'Mens Clothes', count: 2, color: colors.primary },
  { label: 'Electronics', count: 2, color: colors.success },
  { label: 'Cosmetics', count: 1, color: '#FFD700' },
  { label: 'Furniture', count: 1, color: '#00BFFF' },
  { label: 'Grocery', count: 1, color: '#FF69B4' },
  { label: 'Mobile & Computers', count: 1, color: '#FFA07A' },
  { label: 'Gifts & Toys', count: 1, color: '#20B2AA' },
  { label: 'Women Clothes', count: 1, color: '#BA55D3' },
];

const MAX_HEIGHT = 120;

const ShoppingGraphAnaylsis = () => {
  const maxCount = Math.max(...categoryData.map(item => item.count));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Category (Product Analysis)</Text>

      <View style={styles.chartBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartWrapper}>
            {categoryData.map((item, index) => {
              const barHeight = (item.count / maxCount) * MAX_HEIGHT;
              const isMax = item.count === maxCount;

              return (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: item.color,
                        width: isMax ? 30 : 20,
                        borderWidth: isMax ? 2 : 0,
                        borderColor: isMax ? colors.white : 'transparent',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.barLabel,
                      {
                        fontWeight: isMax ? '900' : 'bold',
                        color: isMax ? colors.white : colors.text,
                      },
                    ]}
                  >
                    {item.count}
                  </Text>
                  <Text style={styles.categoryLabel}>
                    {item.label.length > 10 ? item.label.slice(0, 10) + '…' : item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <Text style={styles.legendTitle}>Category Legend</Text>
        <View style={styles.legendRowWrapper}>
          {categoryData.map((item, index) => {
            const isMax = item.count === maxCount;
            return (
              <View key={index} style={styles.legendRow}>
                <View
                  style={[
                    styles.legendColor,
                    {
                      backgroundColor: item.color,
                      borderWidth: isMax ? 2 : 0,
                      borderColor: isMax ? colors.white : 'transparent',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.legendLabel,
                    { fontWeight: isMax ? 'bold' : 'normal' },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  chartBox: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 8,
    padding: spacing.md,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  bar: {
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  categoryLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
    width: 60,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: spacing.lg,
    textAlign: 'center',
  },
  legendRowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.sm,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: spacing.xs,
  },
  legendLabel: {
    color: colors.textMuted,
    fontSize: 14,
  },
});

export default ShoppingGraphAnaylsis;
