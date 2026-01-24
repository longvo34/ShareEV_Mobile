import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../../constants/colors";
import { getMyProfile } from "../../../../services/auth/auth.service";
import styles from "./ProfileDetailScreen.styles";

export default function ProfileDetailScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    identityCode: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      const data = res.data.data;

      setForm({
        fullName: data.fullName || "",
        dateOfBirth: data.dateOfBirth || "",
        gender: data.gender || "",
        phone: data.phone || "",
        identityCode: data.identityCode || "",
        address: data.address || "",
        email: data.email || "",
      });
    } catch (err) {
      console.log("GET PROFILE ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Xác minh danh tính</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* BODY */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>

        <Label text="Họ và tên" />
        <Input
          placeholder="Nhập họ và tên đầy đủ"
          value={form.fullName}
          onChangeText={(v) => setForm({ ...form, fullName: v })}
        />

        <View style={styles.row2}>
          <View style={{ flex: 1 }}>
            <Label text="Ngày sinh" />
            <Input
              placeholder="DD/MM/YYYY"
              value={form.dateOfBirth}
              onChangeText={(v) => setForm({ ...form, dateOfBirth: v })}
            />
          </View>

          <View style={{ width: 12 }} />

          <View style={{ flex: 1 }}>
            <Label text="Giới tính" />
            <Input
              placeholder="Nam"
              value={form.gender}
              onChangeText={(v) => setForm({ ...form, gender: v })}
            />
          </View>
        </View>

        <Label text="Số điện thoại" />
        <Input
          placeholder="09xx xxx xxx"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => setForm({ ...form, phone: v })}
        />

        <Label text="Email" />
        <Input value={form.email} editable={false} />

        <Label text="Số CCCD / CMND" />
        <Input
          placeholder="Nhập số giấy tờ tùy thân"
          value={form.identityCode}
          onChangeText={(v) => setForm({ ...form, identityCode: v })}
        />

        <Label text="Địa chỉ thường trú" />
        <Input
          placeholder="Nhập địa chỉ theo giấy tờ"
          value={form.address}
          onChangeText={(v) => setForm({ ...form, address: v })}
        />
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <TouchableOpacity style={styles.bottomBtn}>
        <Text style={styles.bottomText}>Cập nhật thông tin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ===== COMPONENT PHỤ ===== */

function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Input(props) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.editable === false && styles.inputDisabled]}
      placeholderTextColor={COLORS.gray}
    />
  );
}
