import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ marginBottom: 20, color: "#000" }}>
              ← Quay lại đăng nhập
            </Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 30 }}>
            Đăng ký
          </Text>

          <TextInput placeholder="Họ và tên" style={inputStyle} />
          <TextInput placeholder="Ngày sinh (DD/MM/YYYY)" style={inputStyle} />
          <TextInput
            placeholder="Giới tính (Nam / Nữ / Khác)"
            style={inputStyle}
          />
          <TextInput
            placeholder="Số CCCD"
            keyboardType="numeric"
            style={inputStyle}
          />
          <TextInput
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            style={inputStyle}
          />
          <TextInput
            placeholder="Mật khẩu"
            secureTextEntry
            style={inputStyle}
          />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry
            style={inputStyle}
          />

          <TouchableOpacity style={buttonStyle}>
            <Text style={{ fontWeight: "bold" }}>Tạo tài khoản</Text>
          </TouchableOpacity>
          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 8,
  padding: 14,
  marginBottom: 16,
};

const buttonStyle = {
  backgroundColor: "#FFD600",
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: "center",
};
