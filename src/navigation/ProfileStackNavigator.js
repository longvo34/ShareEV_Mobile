import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/home/profile/ProfileScreen";
import ChangePasswordScreen from "../screens/home/profile/changePassword/ChangePassword";
import ProfileDetailScreen from "../screens/home/profile/profileDetail/ProfileDetailScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />

      <Stack.Screen name="ChangePassword">
        {(props) => (
          <ChangePasswordScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
