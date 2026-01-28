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

import Constants from "expo-constants";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {
  createContract,
  sendContractVerification,
  verifyContractSignature
} from "../../../../../services/contract/contract.service";
import { createVehicleWithImages } from "../../../../../services/vehicle/vehicle.service";
import { getAccessToken } from "../../../../../utils/authStorage";
import styles from "./ContractScreen.styles";

export default function ContractScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { step1Data, images } = route.params || {};

  const [contractId, setContractId] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const createRegisterContract = async () => {
    try {
      setLoading(true);
      console.log("[CREATE CONTRACT] Bắt đầu tạo hợp đồng...");

      const payload = {
        contractType: 1,
        title: "Hợp đồng đăng ký xe",
        description: "Hợp đồng đăng ký xe cho phương tiện",
      };
      console.log("[CREATE CONTRACT] Payload gửi lên:", payload);

      const res = await createContract(payload);

      console.log("[CREATE CONTRACT] Response từ server:", res);
      console.log("[CREATE CONTRACT] Response data chi tiết:", JSON.stringify(res.data, null, 2));

      const newContractId = res.data?.data?.contractId;

      if (!newContractId) {
        throw new Error("Không tìm thấy contractId trong response");
      }

      setContractId(newContractId);
      console.log("[CREATE CONTRACT] Thành công! Contract ID được set:", newContractId);

      Alert.alert("Thành công", "Đã tạo hợp đồng");
    } catch (e) {
      console.error("[CREATE CONTRACT] LỖI:", e);
      console.error("[CREATE CONTRACT] Response lỗi (nếu có):", e.response?.data || e.message);

      Alert.alert("Lỗi", "Không tạo được hợp đồng. Vui lòng kiểm tra console để xem chi tiết.");
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

      const token = await getAccessToken();

      const fileName = `Hop-dong-dang-ky-xe_${contractId}.pdf`;
      const fileUri = FileSystem.documentDirectory + fileName;

      const API_URL = Constants.expoConfig.extra.API_URL;
      const downloadUrl = `${API_URL}/contracts/${contractId}/pdf`;

      const { uri } = await FileSystem.downloadAsync(
        downloadUrl,
        fileUri,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Không hỗ trợ", "Thiết bị không hỗ trợ mở file PDF");
        return;
      }

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Xem / Tải hợp đồng PDF",
        UTI: "com.adobe.pdf",
      });
    } catch (e) {
      console.error("[OPEN PDF] LỖI:", e);
      Alert.alert("Lỗi", "Không thể tải hợp đồng. Kiểm tra console.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      await sendContractVerification(contractId);
      Alert.alert("OTP", "Mã OTP đã được gửi về email");
    } catch (e) {
      console.error("[SEND OTP] LỖI:", e);
      Alert.alert("Lỗi", "Không gửi được OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert("Thiếu OTP", "Vui lòng nhập mã OTP");
      return;
    }

    try {
      setLoading(true);

      console.log("🔐 VERIFY CONTRACT OTP:", {
        contractId,
        otp,
      });

      await verifyContractSignature(contractId, otp);
      console.log("✅ VERIFY CONTRACT SUCCESS");

      console.log("🚗 CREATE VEHICLE PAYLOAD:", {
        step1Data,
        images,
      });

      await createVehicleWithImages(step1Data, images);
      console.log("✅ CREATE VEHICLE SUCCESS");

      Alert.alert(
        "Thành công",
        "Hợp đồng đã được ký và xe đã được đăng ký"
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "RegisterVehicle",
            state: {
              index: 0,
              routes: [{ name: "VehicleRequestList" }],
            },
          },
        ],
      });
    } catch (e) {
      console.error("❌ ERROR STATUS:", e.response?.status);
      console.error("❌ ERROR DATA:", e.response?.data);
      console.error("❌ ERROR MESSAGE:", e.message);

      Alert.alert(
        "Lỗi",
        e.response?.data?.message || "Ký hợp đồng hoặc đăng ký xe thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Hợp đồng đăng ký xe</Text>
      </View>

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

      {contractId && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hợp đồng đã tạo</Text>

          <TouchableOpacity
            style={[styles.secondaryButton, { marginBottom: 16 }]}
            onPress={openContractPdf}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>
              {loading ? "Đang tải..." : "📥 Tải / Xem hợp đồng PDF"}
            </Text>
          </TouchableOpacity>

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