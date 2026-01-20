import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import styles from "./LoginScreen.styles";

export default function LoginScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      <Text style={styles.title}>EVCoDrive</Text>

      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput placeholder="Mật khẩu" secureTextEntry style={styles.input} />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
