import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./RegisterScreen.styles";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Quay lại đăng nhập</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Đăng ký</Text>

          <TextInput placeholder="Họ và tên" style={styles.input} />
          <TextInput placeholder="Ngày sinh" style={styles.input} />
          <TextInput placeholder="Giới tính" style={styles.input} />
          <TextInput placeholder="Số CCCD" style={styles.input} />
          <TextInput placeholder="Số điện thoại" style={styles.input} />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
