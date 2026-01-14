import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ marginBottom: 20, color: '#000' }}>← Quay lại đăng nhập</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 30 }}>
        Đăng ký
      </Text>

      <TextInput placeholder="Số điện thoại" style={inputStyle} />
      <TextInput placeholder="Mật khẩu" secureTextEntry style={inputStyle} />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        style={inputStyle}
      />

      <TouchableOpacity style={buttonStyle}>
        <Text style={{ fontWeight: 'bold' }}>Tạo tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 14,
  marginBottom: 16,
};

const buttonStyle = {
  backgroundColor: '#FFD600',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
};
