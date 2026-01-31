import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import EVLoading from "../../../../../components/animation/EVLoading";
import COLORS from "../../../../../constants/colors";
import { getContractsByMember } from "../../../../../services/contract/contract.service";
import { getProfileMember } from "../../../../../services/profile/profile.service";
import { deleteVehicle, getVehicleById } from "../../../../../services/vehicle/vehicle.service";
import { getAccessToken } from "../../../../../utils/authStorage";
import styles from "./VehicleDetailScreen.styles";

export default function VehicleDetailScreen({ route, navigation }) {
  const { vehicleId } = route.params;

  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);
  const [hasSignedLocally, setHasSignedLocally] = useState(false); 

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    fetchVehicleDetail();
  }, []);

  useEffect(() => {
    const checkSigned = async () => {
      const signed = await AsyncStorage.getItem(`signed_vehicle_${vehicleId}`);
      setHasSignedLocally(signed === 'true');
    };
    checkSigned();
  }, [vehicleId]);

  const fetchVehicleDetail = async () => {
    try {
      setLoading(true);
      const res = await getVehicleById(vehicleId);
      setVehicle(res.data.data);
    } catch (error) {
      console.log("❌ GET VEHICLE DETAIL ERROR:", error);
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!vehicle?.images?.length) return;

    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === vehicle.images.length - 1 ? 0 : currentIndex + 1;

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, vehicle?.images]);

  const renderStatus = (status) => {
    switch (status) {
      case "Pending":
        return <Text style={{ color: "#d97706", fontWeight: "600" }}>Xe đang chờ được duyệt</Text>;

      case "ReadyForInspection":
        return <Text style={{ color: "#f59e0b", fontWeight: "600" }}>Sẵn sàng kiểm tra tại station</Text>;

      case "Inspecting":
        return <Text style={{ color: "#8b5cf6", fontWeight: "600" }}>Đang kiểm tra tại station</Text>;

      case "SigningContract":
        return <Text style={{ color: "#2563eb", fontWeight: "bold" }}>Sẵn sàng ký hợp đồng</Text>;

      case "SaleEligible":
        return <Text style={{ color: COLORS.signingGreen, fontWeight: "bold" }}>Đã duyệt / Có thể bán</Text>;

      case "Rejected":
        return <Text style={{ color: "#ef4444", fontWeight: "bold" }}>Từ chối</Text>;

      default:
        return <Text style={{ color: COLORS.gray }}>Không xác định ({status})</Text>;
    }
  };

  const handleDeleteVehicle = () => {
    Alert.alert(
      "Xác nhận hủy",
      "Bạn có chắc chắn muốn hủy đăng ký xe này? Hành động không thể hoàn tác.",
      [
        { text: "Không", style: "cancel" },
        {
          text: "Có, hủy xe",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVehicle(vehicleId);
              Alert.alert("Thành công", "Xe đã được hủy thành công");
              navigation.goBack();
            } catch (error) {
              console.error("Hủy xe lỗi:", error);
              Alert.alert("Lỗi", "Không thể hủy xe. Vui lòng thử lại sau.");
            }
          },
        },
      ]
    );
  };

  if (loading) return <EVLoading />;

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Không tìm thấy thông tin xe</Text>
      </SafeAreaView>
    );
  }

  const downloadContractPdf = async () => {
  try {
    setLoading(true);

    // 1. Lấy memberId
    const memberRes = await getProfileMember();
    const memberId = memberRes.data.memberId;

    // 2. Lấy danh sách contract của member
    const contractRes = await getContractsByMember(memberId);
    const contracts = contractRes.data.data || [];

    // 3. Lấy contract đăng ký xe đã hoàn tất
    const vehicleContract = contracts.find(
      c =>
        c.contractType === "VehicleRegistration" &&
        c.contractStatuses === "Completed"
    );

    if (!vehicleContract) {
      Alert.alert("Không tìm thấy hợp đồng");
      return;
    }

    const contractId = vehicleContract.contractId;

    // 4. Tải PDF
    const token = await getAccessToken();
    const API_URL = Constants.expoConfig.extra.API_URL;
    const fileName = `Hop-dong-${contractId}.pdf`;
    const fileUri = FileSystem.documentDirectory + fileName;

    const downloadUrl = `${API_URL}/contracts/${contractId}/pdf`;

    const { uri } = await FileSystem.downloadAsync(downloadUrl, fileUri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Không hỗ trợ", "Thiết bị không hỗ trợ mở file PDF");
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Xem / Tải hợp đồng",
      UTI: "com.adobe.pdf",
    });
  } catch (e) {
    console.error("❌ DOWNLOAD CONTRACT ERROR:", e);
    Alert.alert("Lỗi", "Không thể tải hợp đồng");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết xe</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {vehicle.images?.length > 0 ? (
          <>
            <FlatList
              ref={flatListRef}
              data={vehicle.images}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setCurrentIndex(index);
              }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.secureUrl }}
                  style={{ width, height: 220 }}
                  resizeMode="cover"
                />
              )}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              {vehicle.images.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentIndex ? COLORS.primary : "#ccc",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={{ color: COLORS.gray, fontSize: 16 }}>Chưa có ảnh xe</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>
            {vehicle.vehicleModel?.brandName} {vehicle.vehicleModel?.name}
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: "600", color: COLORS.text }}>Trạng thái:</Text>
            {renderStatus(vehicle.vehicleStatus)}
          </View>

          {vehicle.vehicleStatus === "SigningContract" && hasSignedLocally && (
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Text style={{ color: COLORS.signingGreen, fontWeight: "bold", fontSize: 16 }}>
                Đã ký hợp đồng thành công
              </Text>
              <Text style={{ color: COLORS.gray, marginTop: 4 }}>
                Đang chờ staff duyệt cuối cùng
              </Text>
            </View>
          )}

          {vehicle.vehicleStatus === "SaleEligible" && (
  <TouchableOpacity
    style={{
      marginTop: 16,
      backgroundColor: COLORS.signingGreen,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    }}
    onPress={downloadContractPdf}
  >
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
      📄 Xem / Tải hợp đồng
    </Text>
  </TouchableOpacity>
)}


          {vehicle.vehicleStatus === "SigningContract" && !hasSignedLocally && (
            <TouchableOpacity
              style={{
                marginTop: 16,
                backgroundColor: "#2563eb",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("ContractScreen", { vehicleId });
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Ký hợp đồng ngay →
              </Text>
            </TouchableOpacity>
          )}

          {["Pending", "ReadyForInspection", "SigningContract", "Rejected"].includes(vehicle.vehicleStatus) && (
            <TouchableOpacity
              style={{
                marginTop: 12,
                backgroundColor: "#ef4444",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleDeleteVehicle}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Hủy đăng ký xe</Text>
            </TouchableOpacity>
          )}

          {vehicle.vehicleStatus === "ReadyForInspection" && (
            <Text style={{ marginTop: 12, color: "#f59e0b", fontStyle: "italic" }}>
              Vui lòng đem xe ra station gần nhất để kiểm tra và duyệt.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <DetailRow label="Biển số" value={vehicle.licensePlate} />
          <DetailRow label="Màu sắc" value={vehicle.color} />
          <DetailRow label="Năm sản xuất" value={vehicle.year} />
          <DetailRow label="Số km" value={`${vehicle.odometer} km`} />
          <DetailRow
            label="Dung lượng pin"
            value={`${vehicle.vehicleModel?.batteryCapacity || "N/A"} kWh`}
          />
          <DetailRow
            label="Tình trạng pin"
            value={`${vehicle.batteryHealth || "N/A"}%`}
          />
          <DetailRow
            label="Ngày bảo dưỡng"
            value={
              vehicle.lastMaintenanceDate
                ? new Date(vehicle.lastMaintenanceDate).toLocaleDateString("vi-VN")
                : "Chưa có"
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "N/A"}</Text>
  </View>
);