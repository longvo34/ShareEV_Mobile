import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./forgotPasswordScreen.styles";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Quay lại đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.subtitle}>
        Nhập số điện thoại để khôi phục mật khẩu
      </Text>

      <TextInput
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}
