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
import { getProfileMember } from "../../../../../services/profile/profile.service";
import { getVehiclesByMemberId } from "../../../../../services/vehicle/vehicle.service";
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

    // 1. lấy memberId từ token
    const memberRes = await getProfileMember();
    const memberId = memberRes.data.memberId;

    // 2. lấy xe theo memberId
    const vehicleRes = await getVehiclesByMemberId(memberId);

    setVehicles(vehicleRes.data.data || vehicleRes.data || []);
  } catch (error) {
    console.log("❌ GET VEHICLES ERROR:", error);
    setVehicles([]);
  } finally {
    setLoading(false);
  }
};



  const renderStatus = (status) => {
  switch (status) {
    case "PendingApproval":
      return <Text style={[styles.status, styles.pending]}>Chờ duyệt</Text>;
    case "Approved":
      return <Text style={[styles.status, styles.approved]}>Đã duyệt</Text>;
    case "Rejected":
      return <Text style={[styles.status, styles.rejected]}>Từ chối</Text>;
    default:
      return null;
  }
};

 const renderItem = ({ item }) => (
  <TouchableOpacity
  style={styles.card}
  onPress={() =>
  navigation.navigate("RegisterVehicle", {
    screen: "VehicleDetail",
    params: {
      vehicleId: item.vehicleId,
    },
  })
}
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
