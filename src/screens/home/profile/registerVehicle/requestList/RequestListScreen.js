import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EVLoading from "../../../../../components/animation/EVLoading";
import COLORS from "../../../../../constants/colors";
import styles from "./RequestListScreen.styles";

const MOCK_DATA = [
  {
    id: "1",
    name: "VinFast VF 9 Plus",
    date: "24/02/2025",
    status: "PENDING",
  },
  {
    id: "2",
    name: "VinFast VF 8 Eco",
    date: "20/02/2025",
    status: "REVIEW",
    note: "Vui lòng mang xe đến trạm kiểm định để hoàn tất thủ tục.",
  },
  {
    id: "3",
    name: "VinFast VF 7",
    date: "15/12/2024",
    status: "APPROVED",
  },
  {
    id: "4",
    name: "VinFast VF e34",
    date: "10/11/2024",
    status: "REJECTED",
    note: "Hồ sơ không hợp lệ",
  },
];

export default function RequestListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fake call API
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 1200);
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <Text style={[styles.status, styles.pending]}>Chờ duyệt</Text>;
      case "REVIEW":
        return (
          <Text style={[styles.status, styles.review]}>Chờ kiểm định</Text>
        );
      case "APPROVED":
        return <Text style={[styles.status, styles.approved]}>Đã duyệt</Text>;
      case "REJECTED":
        return <Text style={[styles.status, styles.rejected]}>Từ chối</Text>;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.carName}>{item.name}</Text>
        {renderStatus(item.status)}
      </View>

      <Text style={styles.date}>📅 {item.date}</Text>

      {item.note && <Text style={styles.note}>ℹ️ {item.note}</Text>}
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
          <Text style={[styles.tabText, styles.activeTabText]}>Đăng ký xe</Text>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
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
