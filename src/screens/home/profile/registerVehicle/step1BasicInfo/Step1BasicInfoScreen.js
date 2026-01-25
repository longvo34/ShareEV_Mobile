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
import styles from "./Step1BasicInfoScreen.styles";

export default function Step1BasicInfoScreen({ navigation }) {
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
        <View style={[styles.stepDot, styles.active]} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
      </View>

      <Text style={styles.stepText}>Bước 1/4</Text>
      <Text style={styles.sectionTitle}>Thông tin cơ bản của xe</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Label text="Hãng xe" />
        <Input placeholder="Chọn hãng xe" />

        <Label text="Dòng xe" />
        <Input placeholder="Chọn dòng xe" />

        <View style={styles.row2}>
          <View style={{ flex: 1 }}>
            <Label text="Năm sản xuất" />
            <Input placeholder="YYYY" />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Label text="Năm đăng ký" />
            <Input placeholder="YYYY" />
          </View>
        </View>

        <Label text="Số ghế" />
        <Input placeholder="Ví dụ: 5" />

        <Label text="Biển số xe" />
        <Input placeholder="Ví dụ: 30A-123.45" />

        <Label text="Màu ngoại thất" />
        <Input placeholder="Nhập màu sơn xe" />

        <Label text="Màu nội thất" />
        <Input placeholder="Nhập màu nội thất" />
      </ScrollView>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate("VehicleStep2")}
      >
        <Text style={styles.nextText}>Tiếp tục →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* COMPONENT PHỤ */
function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
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
