import {
    Feather,
    Ionicons,
    MaterialIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../constants/colors";
import styles from "./ProfileScreen.styles";

export default function ProfileScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất không?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />

          <Text style={styles.name}>David Nguyễn</Text>

          <TouchableOpacity>
            <Feather name="more-horizontal" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          <MenuItem
            icon={<Ionicons name="car-outline" size={22} color={COLORS.text} />}
            label="Xe của tôi"
            onPress={() => navigation.navigate("Vehicle")}
          />

          <MenuItem
            icon={
              <MaterialIcons name="local-offer" size={22} color={COLORS.text} />
            }
            label="Xe đã niêm yết"
          />

          <MenuItem
            icon={
              <Ionicons name="receipt-outline" size={22} color={COLORS.text} />
            }
            label="Lịch sử giao dịch"
            onPress={() => navigation.navigate("History")}
          />

          <MenuItem
            icon={
              <Ionicons
                name="add-circle-outline"
                size={22}
                color={COLORS.text}
              />
            }
            label="Đăng ký xe"
          />

          <MenuItem
            icon={
              <Ionicons name="settings-outline" size={22} color={COLORS.text} />
            }
            label="Cài đặt"
          />

          <MenuItem
            icon={
              <Ionicons
                name="log-out-outline"
                size={22}
                color={COLORS.primary}
              />
            }
            label="Đăng xuất"
            textStyle={{ color: COLORS.primary }}
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label, onPress, textStyle }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        {icon}
        <Text style={[styles.itemText, textStyle]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
    </TouchableOpacity>
  );
}
