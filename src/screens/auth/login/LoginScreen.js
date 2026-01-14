import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./LoginScreen.styles";

export default function LoginScreen({ setIsLoggedIn }) {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVCoDrive</Text>

      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => setIsLoggedIn(true)}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Đăng ký</Text>
        </TouchableOpacity>

        <Text style={styles.linkText}>Quên mật khẩu?</Text>
      </View>
    </View>
  );
}
