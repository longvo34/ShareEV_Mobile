import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../../constants/colors";
import { uploadCCCD } from "../../../../services/ekyc/ekyc.service";
import styles from "./EKYCScreen.styles";

export default function EKYCScreen({ navigation }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ImagePicker.requestCameraPermissionsAsync();
  }, []);

  const pickImage = async (setImage) => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!res.canceled) {
      setImage(res.assets[0]);
    }
  };

  const submit = async () => {
    if (!front || !back) {
      Alert.alert("Thiếu ảnh", "Vui lòng chụp đủ 2 mặt CCCD");
      return;
    }

    try {
      setLoading(true);
      await uploadCCCD(front, back);
      Alert.alert("Thành công", "Xác minh CCCD thành công");
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        "Thất bại",
        err.response?.data?.detail || "Xác minh không thành công",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Xác minh CCCD</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => pickImage(setFront)}
        >
          {front ? (
            <Image source={{ uri: front.uri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text>📷</Text>
              <Text style={styles.placeholderText}>Chụp mặt trước CCCD</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => pickImage(setBack)}
        >
          {back ? (
            <Image source={{ uri: back.uri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text>📷</Text>
              <Text style={styles.placeholderText}>Chụp mặt sau CCCD</Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <TouchableOpacity
        style={[styles.submitBtn, (!front || !back) && styles.disabledBtn]}
        onPress={submit}
        disabled={!front || !back}
      >
        <Text style={styles.submitText}>Xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
