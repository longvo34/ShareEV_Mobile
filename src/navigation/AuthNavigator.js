import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterSceen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>

       <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Đăng ký' }}
      />

    </Stack.Navigator>
    );
}
