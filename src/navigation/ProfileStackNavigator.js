import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/home/profile/ProfileScreen";
import ChangePasswordScreen from "../screens/home/profile/changePassword/ChangePassword";

const Stack = createNativeStackNavigator();

export default function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="ChangePassword">
        {(props) => (
          <ChangePasswordScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
