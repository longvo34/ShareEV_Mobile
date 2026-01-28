import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image } from "react-native";
import COLORS from "../../../../../constants/colors";
import styles from "./Step4UploadDocsScreen.styles";

export default function Step4UploadDocsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  

  const { step1Data } = route.params || {};

 
  const [images, setImages] = useState([]);
const MAX_IMAGES = 6;

const pickImage = async (index) => {
  if (images.length >= MAX_IMAGES && !images[index]) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (!result.canceled) {
    const newImages = [...images];
    newImages[index] = result.assets[0];
    setImages(newImages.filter(Boolean));
  }
};

const onSubmit = async () => {
  try {
    navigation.navigate("ContractScreen", {
  step1Data,
  images,
});
  } catch (e) {
    Alert.alert("Lỗi", "Không thể đăng ký xe");
  }
};



  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đăng ký xe</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* STEP */}
        <View style={styles.stepRow}>
          <View style={[styles.stepDot, styles.active]} />
          <View style={[styles.stepDot, styles.active]} />
        </View>
        <Text style={styles.stepText}>Bước 2/2</Text>

        <Text style={styles.sectionTitle}>Hình ảnh xe</Text>
        <Text style={styles.subTitle}>
          Tải tối đa {MAX_IMAGES} hình (ngoại thất & nội thất)
        </Text>

        {/* IMAGE GRID */}
       <View style={styles.imageGrid}>
  {Array.from({ length: MAX_IMAGES }).map((_, index) => {
    const img = images[index];

    return (
      <TouchableOpacity
        key={index}
        style={styles.imageBox}
        onPress={() => pickImage(index)}
      >
        {img ? (
          <Image
            source={{ uri: img.uri }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
        ) : (
          <Ionicons name="camera" size={26} color={COLORS.gray} />
        )}
      </TouchableOpacity>
    );
  })}
</View>

<Text style={styles.imageCount}>
  {images.length}/{MAX_IMAGES} hình
</Text>


        {/* SUBMIT */}
        <View style={styles.footerCenter}>
         <TouchableOpacity style={styles.nextBtn} onPress={onSubmit}>
  <Text style={styles.nextText}>Gửi thông tin xe →</Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
