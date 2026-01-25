import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../../../constants/colors";
import styles from "./Step4UploadDocsScreen.styles";

export default function Step4UploadDocsScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
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
        <View style={[styles.stepDot, styles.active]} />
      </View>
      <Text style={styles.stepText}>Bước 4/4</Text>

      <Text style={styles.sectionTitle}>Tải ảnh xe & giấy tờ</Text>

      <Text style={styles.subTitle}>Ảnh ngoại thất</Text>
      <View style={styles.imageBox}>
        <Text>📷 Thêm ảnh</Text>
      </View>

      <Text style={styles.subTitle}>Ảnh nội thất</Text>
      <View style={styles.imageBox}>
        <Text>📷 Thêm ảnh</Text>
      </View>

      <Text style={styles.subTitle}>Giấy tờ xe</Text>

      <View style={styles.fileItem}>
        <Text>📄 Cavet xe (mặt trước)</Text>
        <Text style={styles.uploadText}>Tải lên</Text>
      </View>

      <View style={styles.fileItem}>
        <Text>📄 Cavet xe (mặt sau)</Text>
        <Text style={styles.uploadText}>Tải lên</Text>
      </View>

      <View style={styles.fileItem}>
        <Text>📄 Sổ đăng kiểm</Text>
        <Text style={styles.uploadText}>Tải lên</Text>
      </View>

      <View style={styles.footerCenter}>
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextText}>Gửi thông tin xe →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
