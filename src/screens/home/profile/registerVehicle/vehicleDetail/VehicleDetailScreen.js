import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EVLoading from "../../../../../components/animation/EVLoading";
import COLORS from "../../../../../constants/colors";
import { getVehicleById } from "../../../../../services/vehicle/vehicle.service";
import styles from "./VehicleDetailScreen.styles";

export default function VehicleDetailScreen({ route, navigation }) {
  const { vehicleId } = route.params;

  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetchVehicleDetail();
  }, []);

  const fetchVehicleDetail = async () => {
    try {
      setLoading(true);
      const res = await getVehicleById(vehicleId);
      setVehicle(res.data.data);
    } catch (error) {
      console.log("❌ GET VEHICLE DETAIL ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <EVLoading />;

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Không tìm thấy thông tin xe</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết xe</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        {vehicle.images?.length > 0 && (
          <Image
            source={{ uri: vehicle.images[0].secureUrl }}
            style={styles.image}
          />
        )}

        {/* BASIC INFO */}
        <View style={styles.card}>
          <Text style={styles.title}>
            {vehicle.vehicleModel.brandName} {vehicle.vehicleModel.name}
          </Text>

          <Text style={styles.status}>
            Trạng thái: {vehicle.vehicleStatus}
          </Text>
        </View>

        {/* DETAIL */}
        <View style={styles.card}>
          <DetailRow label="Biển số" value={vehicle.licensePlate} />
          <DetailRow label="Màu sắc" value={vehicle.color} />
          <DetailRow label="Năm sản xuất" value={vehicle.year} />
          <DetailRow label="Số km" value={`${vehicle.odometer} km`} />
          <DetailRow
            label="Dung lượng pin"
            value={`${vehicle.vehicleModel.batteryCapacity} kWh`}
          />
          <DetailRow
            label="Tình trạng pin"
            value={`${vehicle.batteryHealth}%`}
          />
          <DetailRow
            label="Ngày bảo dưỡng"
            value={new Date(vehicle.lastMaintenanceDate).toLocaleDateString(
              "vi-VN"
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
