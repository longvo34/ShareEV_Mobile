import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EVLoading from "../../../../../components/animation/EVLoading";
import COLORS from "../../../../../constants/colors";
import { getMyVehicles } from "../../../../../services/vehicle/vehicle.service";
import styles from "./RequestListScreen.styles";

export default function RequestListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getMyVehicles();
      setVehicles(res.data.data || []);
    } catch (error) {
      console.log("❌ GET VEHICLES ERROR:", error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <Text style={[styles.status, styles.pending]}>Chờ duyệt</Text>;
      case "REVIEW":
        return <Text style={[styles.status, styles.review]}>Chờ kiểm định</Text>;
      case "APPROVED":
        return <Text style={[styles.status, styles.approved]}>Đã duyệt</Text>;
      case "REJECTED":
        return <Text style={[styles.status, styles.rejected]}>Từ chối</Text>;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("VehicleDetail", {
          vehicleId: item.vehicleId,
        })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.carName}>
          {item.vehicleModel?.vehicleBrand?.name}{" "}
          {item.vehicleModel?.name}
        </Text>
        {renderStatus(item.status)}
      </View>

      <Text style={styles.date}>
        📅 {new Date(item.createdAt).toLocaleDateString("vi-VN")}
      </Text>

      {item.note && <Text style={styles.note}>ℹ️ {item.note}</Text>}
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
