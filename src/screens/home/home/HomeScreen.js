import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMyProfile } from "../../../services/auth/auth.service";
import styles from "./HomeScreen.styles";

const CARS = [
  {
    id: "1",
    name: "Vinfast VF7",
    image: "https://i.imgur.com/Zl0ZK2M.png",
  },
  {
    id: "2",
    name: "Vinfast VF8",
    image: "https://i.imgur.com/Zl0ZK2M.png",
  },
  {
    id: "3",
    name: "Vinfast VF9",
    image: "https://i.imgur.com/Zl0ZK2M.png",
  },
  {
    id: "4",
    name: "Vinfast VF6",
    image: "https://i.imgur.com/Zl0ZK2M.png",
  },
];

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("👉👉👉 HOME SCREEN MOUNTED");

    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();

        console.log("PROFILE RESPONSE:", res.data);

        if (!res.data?.isSuccess) {
          throw new Error(res.data?.message || "Get profile failed");
        }

        setUser(res.data.data);
      } catch (err) {
        console.log("PROFILE ERROR:", err);
        Alert.alert("Lỗi", "Không tải được thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <Image
            source={{
              uri: user?.avatarUrl || "https://i.pravatar.cc/100",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.hello}>Xin chào</Text>
            <Text style={styles.username}>
              {user?.fullName || user?.email || "Người dùng"}
            </Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <Text>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Text>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Chào mừng!</Text>
        <Text style={styles.subtitle}>Chọn mẫu xe bạn muốn</Text>

        {/* Car slider */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CARS.map((car) => (
            <View key={car.id} style={styles.carCard}>
              <Image source={{ uri: car.image }} style={styles.carImage} />
              <View style={styles.carFooter}>
                <Text style={styles.carName}>{car.name}</Text>
                <View style={styles.arrowCircle}>
                  <Text style={styles.arrow}>↗</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
