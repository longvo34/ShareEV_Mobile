import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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


  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");

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


  useEffect(() => {
    if (!vehicle?.images?.length) return;

    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === vehicle.images.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, vehicle?.images]);

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
                const index = Math.round(
                  e.nativeEvent.contentOffset.x / width
                );
                setCurrentIndex(index);
              }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.secureUrl }}
                  style={{
                    width,
                    height: 220,
                  }}
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
                    backgroundColor:
                      index === currentIndex
                        ? COLORS.primary
                        : "#ccc",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={{ color: COLORS.gray, fontSize: 16 }}>
              Chưa có ảnh xe
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>
            {vehicle.vehicleModel.brandName}{" "}
            {vehicle.vehicleModel.name}
          </Text>

          <Text style={styles.status}>
            Trạng thái: {vehicle.vehicleStatus}
          </Text>
        </View>


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
            value={new Date(
              vehicle.lastMaintenanceDate
            ).toLocaleDateString("vi-VN")}
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
