import { FlatList, Image, Text, View } from "react-native";
import styles from "./MyVehicleScreen.styles";

const randomImageUrl = () =>
  `https://source.unsplash.com/600x400/?car&sig=${Math.floor(
    Math.random() * 1000,
  )}`;

const DATA = [
  {
    id: "1",
    name: "Vinfast VF7",
    plate: "30A-123.45",
    status: "Sẵn sàng đăng bán",
    statusType: "ready",
    image: randomImageUrl(),
  },
  {
    id: "2",
    name: "Vinfast VF7",
    plate: "30A-123.45",
    status: "Đang sử dụng",
    statusType: "using",
    image: randomImageUrl(),
  },
];

export default function MyVehicleScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* 👇 Image dùng uri */}
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.plate}>Biển số: {item.plate}</Text>

        <View
          style={[
            styles.badge,
            item.statusType === "ready"
              ? styles.badgeGreen
              : styles.badgeOrange,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              item.statusType === "ready"
                ? styles.textGreen
                : styles.textOrange,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xe của tôi</Text>
      <Text style={styles.subTitle}>Quản lý danh sách xe của bạn</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
