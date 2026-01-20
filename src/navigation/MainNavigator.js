import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/home/HomeScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { View } from 'react-native';

// // Screens
// import HomeScreen from '../screens/home/home/HomeScreen';
// import CarScreen from '../screens/car/CarScreen';
// import HistoryScreen from '../screens/history/HistoryScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';

// const Tab = createBottomTabNavigator();

// export default function MainNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           height: 70,
//           borderTopLeftRadius: 25,
//           borderTopRightRadius: 25,
//         },
//         tabBarIcon: ({ focused }) => {
//           let iconName;

//           switch (route.name) {
//             case 'Home':
//               iconName = 'home-outline';
//               break;
//             case 'Car':
//               iconName = 'car-outline';
//               break;
//             case 'History':
//               iconName = 'receipt-outline';
//               break;
//             case 'Profile':
//               iconName = 'person-outline';
//               break;
//           }

//           // icon có vòng tròn vàng khi active
//           return (
//             <View
//               style={{
//                 backgroundColor: focused ? '#FFE600' : 'transparent',
//                 padding: 12,
//                 borderRadius: 50,
//               }}
//             >
//               <Ionicons
//                 name={iconName}
//                 size={24}
//                 color={focused ? '#000' : '#888'}
//               />
//             </View>
//           );
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Car" component={CarScreen} />
//       <Tab.Screen name="History" component={HistoryScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }
