// import React from 'react';
// import { View, Dimensions, StyleSheet, Text } from 'react-native';
// import { LineChart } from 'react-native-gifted-charts'; // <-- updated import
// import { useTheme } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from '../../../shared/theme';

// const GraphScreen: React.FC = () => {
//   const { colors } = useTheme();
//   const screenWidth: number = Dimensions.get('window').width;

//   const lineData = [
//     { value: 10, label: 'Jan' },
//     { value: 20, label: 'Feb' },
//     { value: 15, label: 'Mar' },
//     { value: 30, label: 'Apr' },
//     { value: 50, label: 'May' },
//   ];

//   return (
//     <View style={styles.container}>

//       {/* Icon and Title */}
//       <View style={styles.header}>
//         <MaterialIcons name="chart-line" size={28} color={theme.colors.primary} />
//         <Text style={styles.headerText}>Sales Overview</Text>
//       </View>

//       {/* Line Chart */}
//       <LineChart
//         data={lineData}
//         width={screenWidth - 32}
//         height={220}
//         spacing={60}
//         initialSpacing={20}
//         color={theme.colors.primary}
//         thickness={3}
//         hideRules
//         yAxisColor="transparent"
//         xAxisColor="transparent"
//         yAxisTextStyle={{ color: theme.colors.text }}
//         xAxisLabelTextStyle={{ color: theme.colors.text }}
//         noOfSections={5}
//         areaChart
//         hideDataPoints={false}
//         dataPointsColor={theme.colors.surface}
//         startFillColor={theme.colors.primary}
//         endFillColor={theme.colors.primary}
//         startOpacity={0.3}
//         endOpacity={0.1}
//         isAnimated
//         animateOnDataChange
//         animationDuration={800}
//         backgroundColor="transparent"
//         curved
//         maxValue={60}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'transparent',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: theme.fonts.size.lg,
//     color: theme.colors.text,
//     fontFamily: theme.fonts.bold,
//     marginLeft: 8,
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
// });

// export default GraphScreen;
