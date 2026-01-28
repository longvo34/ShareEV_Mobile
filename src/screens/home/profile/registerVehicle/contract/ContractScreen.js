import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
    createContract,
    getContractPdf,
    sendContractVerification,
    verifyContractSignature,
} from "../../../../../services/contract/contract.service";
import { createVehicleWithImages } from "../../../../../services/vehicle/vehicle.service";
import styles from "./ContractScreen.styles";

export default function ContractScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // 👇 data từ Step 4 truyền sang
  const { step1Data, images } = route.params || {};

  const [contractId, setContractId] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================== 1️⃣ TẠO HỢP ĐỒNG ================== */
  const createRegisterContract = async () => {
    try {
      setLoading(true);

      const res = await createContract({
        contractType: 1,
        title: "Hợp đồng đăng ký xe",
        description: "Hợp đồng đăng ký xe cho phương tiện",
      });

      setContractId(res.data.data.contractId);
      Alert.alert("Thành công", "Đã tạo hợp đồng");
    } catch (e) {
      console.log("❌ CREATE CONTRACT ERROR:", e.response?.data || e);
      Alert.alert("Lỗi", "Không tạo được hợp đồng");
    } finally {
      setLoading(false);
    }
  };

  const openContractPdf = async () => {
  if (!contractId) {
    Alert.alert("Thông báo", "Vui lòng tạo hợp đồng trước");
    return;
  }

  try {
    setLoading(true);

    const res = await getContractPdf(contractId);

    const fileUri =
      FileSystem.documentDirectory + `contract_${contractId}.pdf`;

    // blob → base64
    const reader = new FileReader();
    reader.readAsDataURL(res.data);

    reader.onloadend = async () => {
      const base64Data = reader.result.split(",")[1];

      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    };
  } catch (e) {
    console.log("❌ OPEN CONTRACT PDF ERROR:", e.response?.data || e);
    Alert.alert("Lỗi", "Không thể mở hợp đồng");
  } finally {
    setLoading(false);
  }
};


  /* ================== 2️⃣ GỬI OTP ================== */
  const sendOtp = async () => {
    try {
      await sendContractVerification(contractId);
      Alert.alert("OTP", "Mã OTP đã được gửi về email");
    } catch (e) {
      console.log("❌ SEND OTP ERROR:", e.response?.data || e);
      Alert.alert("Lỗi", "Không gửi được OTP");
    }
  };

  /* ================== 3️⃣ XÁC NHẬN OTP + ĐĂNG KÝ XE ================== */
  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert("Thiếu OTP", "Vui lòng nhập mã OTP");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1. Ký hợp đồng
      await verifyContractSignature(contractId, otp);

      // ✅ 2. SAU KHI ký xong → mới tạo vehicle
      await createVehicleWithImages(step1Data, images);

      Alert.alert(
        "Thành công",
        "Hợp đồng đã được ký và xe đã được đăng ký"
      );

      // 👉 về màn chính
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (e) {
      console.log("❌ VERIFY / CREATE VEHICLE ERROR:", e.response?.data || e);
      Alert.alert("Lỗi", "Ký hợp đồng hoặc đăng ký xe thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ===== HEADER + BACK ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Hợp đồng đăng ký xe</Text>
      </View>

      {/* ===== CHƯA CÓ CONTRACT ===== */}
      {!contractId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tạo hợp đồng</Text>
          <Text style={styles.description}>
            Vui lòng tạo hợp đồng để tiếp tục đăng ký xe
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={createRegisterContract}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Đang tạo..." : "📄 Tạo hợp đồng"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== ĐÃ CÓ CONTRACT ===== */}
      {contractId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ký hợp đồng</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={sendOtp}
          >
            <Text style={styles.secondaryButtonText}>
              📨 Gửi OTP ký hợp đồng
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nhập mã OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={verifyOtp}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Đang xử lý..." : "✅ Xác nhận ký hợp đồng và đăng ký xe"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
