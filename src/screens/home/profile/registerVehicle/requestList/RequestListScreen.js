import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EVLoading from "../../../../../components/animation/EVLoading";
import COLORS from "../../../../../constants/colors";
import { getProfileMember } from "../../../../../services/profile/profile.service";
import { getVehiclesByMemberId } from "../../../../../services/vehicle/vehicle.service";
import styles from "./RequestListScreen.styles";

export default function RequestListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const memberRes = await getProfileMember();
      const memberId = memberRes.data.memberId;
      const vehicleRes = await getVehiclesByMemberId(memberId);

      setVehicles(vehicleRes.data.data || vehicleRes.data || []);
    } catch (error) {
      console.log("❌ GET VEHICLES ERROR:", error);
      setVehicles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchVehicles();
  };

  const renderStatus = (status) => {
    switch (status) {
      case "ReadyForInspection":
        return (
          <Text style={[styles.status, { color: "#f59e0b", fontWeight: "600" }]}>
            Chờ duyệt
          </Text>
        );
      case "Signing":
        return (
          <Text style={[styles.status, { color: COLORS.signingGreen, fontWeight: "bold" }]}>
            Sẵn sàng ký hợp đồng
          </Text>
        );
      case "Approved":
      case "SaleEligible":
      case "Active":
        return <Text style={[styles.status, styles.approved]}>Đã duyệt / Có thể bán</Text>;
      case "Rejected":
        return <Text style={[styles.status, styles.rejected]}>Từ chối</Text>;
      case "Maintenance":
        return <Text style={[styles.status, { color: "#d97706" }]}>Bảo dưỡng</Text>;
      case "Decommissioned":
        return <Text style={[styles.status, { color: "#6b7280" }]}>Ngừng hoạt động</Text>;
      default:
        return <Text style={styles.status}>Không xác định ({status})</Text>;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // Luôn đi xem chi tiết xe (nơi có nút ký nếu Signing)
        navigation.navigate("RegisterVehicle", {
          screen: "VehicleDetail",
          params: {
            vehicleId: item.vehicleId,
          },
        });
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.carName}>
          {item.brandName} {item.modelName}
        </Text>
        {renderStatus(item.vehicleStatus)}
      </View>

      <Text style={styles.date}>
        📅 {new Date(item.createdDate).toLocaleDateString("vi-VN")}
      </Text>

      {item.licensePlate && (
        <Text style={styles.note}>🚘 {item.licensePlate}</Text>
      )}
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="car-outline" size={64} color={COLORS.gray} />
      <Text style={styles.emptyTitle}>Chưa đăng ký xe nào</Text>
      <Text style={styles.emptyDesc}>
        Nhấn dấu + để bắt đầu đăng ký xe của bạn
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <EVLoading />}

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quản lý yêu cầu</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* TAB */}
      <View style={styles.tabRow}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Yêu cầu mua</Text>
        </View>
        <View style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>
            Đăng ký xe
          </Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vehicleId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
        ListEmptyComponent={!loading && renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* FLOAT BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("VehicleStep1")}
      >
        <Ionicons name="add" size={26} color={COLORS.black} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}