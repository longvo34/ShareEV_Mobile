import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import COLORS from "../../../../../constants/colors";
import styles from "./Step3OwnerInfoScreen.styles";

export default function Step3OwnerInfoScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Đăng ký xe</Text>
      </View>

      {/* Step */}
      <View style={styles.stepRow}>
        <View style={[styles.stepDot, styles.active]} />
        <View style={[styles.stepDot, styles.active]} />
        <View style={[styles.stepDot, styles.active]} />
        <View style={styles.stepDot} />
      </View>
      <Text style={styles.stepText}>Bước 3/4</Text>

      <Text style={styles.sectionTitle}>Thông tin chủ xe</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} keyboardType="email-address" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CCCD</Text>
        <TextInput style={styles.input} keyboardType="numeric" />
      </View>

      <Text style={styles.sectionTitle}>Trạng thái giấy tờ xe</Text>

      <View style={styles.checkItem}>
        <Text>✔ Cavet xe</Text>
        <Text style={styles.required}>Bắt buộc</Text>
      </View>

      <View style={styles.checkItem}>
        <Text>◻ Đăng kiểm</Text>
      </View>

      <View style={styles.checkItem}>
        <Text>◻ Bảo hiểm xe</Text>
      </View>

      {/* Footer */}
      <View style={styles.footerCenter}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate("VehicleStep4")}
        >
          <Text style={styles.nextText}>Tiếp tục →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
