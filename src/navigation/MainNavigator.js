import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import COLORS from "../constants/colors";
import HistoryScreen from "../screens/home/history/HistoryScreen";
import HomeScreen from "../screens/home/home/HomeScreen";
import ProfileScreen from "../screens/home/profile/ProfileScreen";
import MyVehicleScreen from "../screens/home/vehicle/MyVehicleScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Vehicle") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "History") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#ffffff" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vehicle" component={MyVehicleScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />

      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
