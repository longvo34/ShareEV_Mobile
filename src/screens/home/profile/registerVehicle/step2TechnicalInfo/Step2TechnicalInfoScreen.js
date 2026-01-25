import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../../../constants/colors";
import styles from "./Step2TechnicalInfoScreen.styles";

export default function Step2TechnicalInfoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng ký xe</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* STEP */}
      <View style={styles.stepRow}>
        <View style={styles.stepDot} />
        <View style={[styles.stepDot, styles.active]} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
      </View>

      <Text style={styles.stepText}>Bước 2/4</Text>
      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>⚡ Hiệu suất & Pin</Text>

        <View style={styles.row2}>
          <Input placeholder="Công suất (kW)" />
          <Input placeholder="Mô-men xoắn (Nm)" />
        </View>

        <View style={styles.row2}>
          <Input placeholder="Pin (kWh)" />
          <Input placeholder="Quãng đường (km)" />
        </View>

        <Text style={styles.subTitle}>🕘 Lịch sử vận hành</Text>
        <Input placeholder="ODO - số km đã đi" />
        <Input placeholder="Số km trung bình / năm" />

        <Text style={styles.subTitle}>📦 Vật lý & Tình trạng</Text>

        <View style={styles.row2}>
          <Input placeholder="Kích thước (DxRxC)" />
          <Input placeholder="Trọng lượng (kg)" />
        </View>

        <Input placeholder="Tình trạng ngoại thất" />
        <Input placeholder="Tình trạng nội thất" />
        <Input placeholder="Hệ thống động cơ" />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate("VehicleStep3")}
        >
          <Text style={styles.nextText}>Tiếp tục →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Input(props) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={COLORS.gray}
    />
  );
}
