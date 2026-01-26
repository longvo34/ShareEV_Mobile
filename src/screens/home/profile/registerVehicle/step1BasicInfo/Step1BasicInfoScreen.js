import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../../../../../constants/colors";
import { getVehicleBrands } from "../../../../../services/vehicleBrand/vehicleBrand.service";
import { getVehicleModels } from "../../../../../services/vehicleModel/vehicleModel.service";
import styles from "./Step1BasicInfoScreen.styles";

export default function Step1BasicInfoScreen({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showRegisterYearPicker, setShowRegisterYearPicker] = useState(false);

  const [form, setForm] = useState({
    vehicleBrand: null,
    vehicleModel: null,
    yearManufacture: "",
    yearRegister: "",
    seats: "",
    licensePlate: "",
    exteriorColor: "",
    interiorColor: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    fetchInitData();
  }, []);

  const fetchInitData = async () => {
    try {
      const [brandRes, modelRes] = await Promise.all([
        getVehicleBrands(),
        getVehicleModels(),
      ]);
      setBrands(brandRes.data.data || []);
      setModels(modelRes.data.data || []);
    } catch (e) {
      console.log("FETCH ERROR:", e);
    }
  };

  const filteredModels = form.vehicleBrand
  
    ? models.filter(
      (m) =>
        m.vehicleBrand.vehicleBrandId ===
        form.vehicleBrand.vehicleBrandId
    )
    : [];

    const hasModels = filteredModels.length > 0;

    const registerYears = form.yearManufacture
  ? years.filter((y) => y >= Number(form.yearManufacture))
  : [];

  const onNext = () => {
  if (!form.vehicleBrand) {
    Alert.alert("Thiếu thông tin", "Vui lòng chọn hãng xe");
    return;
  }

  if (!form.vehicleModel) {
    Alert.alert("Thiếu thông tin", "Vui lòng chọn dòng xe");
    return;
  }

  if (!form.yearManufacture) {
    Alert.alert("Thiếu thông tin", "Vui lòng chọn năm sản xuất");
    return;
  }

  if (!form.yearRegister) {
    Alert.alert("Thiếu thông tin", "Vui lòng chọn năm đăng ký");
    return;
  }

  if (!form.seats) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập số ghế");
    return;
  }

  if (!form.licensePlate) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập biển số xe");
    return;
  }

  if (!form.exteriorColor) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập màu ngoại thất");
    return;
  }

  if (!form.interiorColor) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập màu nội thất");
    return;
  }


  navigation.navigate("RegisterVehicle", {
    screen: "VehicleStep2",
    params: {
      step1Data: {
        vehicleBrandId: form.vehicleBrand.vehicleBrandId,
        vehicleModelId: form.vehicleModel.vehicleModelId,
        yearManufacture: Number(form.yearManufacture),
        yearRegister: Number(form.yearRegister),
        seats: Number(form.seats),
        licensePlate: form.licensePlate,
        exteriorColor: form.exteriorColor,
        interiorColor: form.interiorColor,
      },
    },
  });
};



  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng ký xe</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* STEP */}
<View style={styles.stepRow}>
  <View style={[styles.stepDot, styles.active]} />
  <View style={styles.stepDot} />
  <View style={styles.stepDot} />
  <View style={styles.stepDot} />
</View>

<Text style={styles.stepText}>Bước 1/4</Text>

      <Text style={styles.sectionTitle}>Thông tin cơ bản của xe</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== BRAND ===== */}
        <Label text="Hãng xe" />
        <DropdownInput
          value={form.vehicleBrand?.name || "Chọn hãng xe"}
          onPress={() => setShowBrandModal(true)}
        />

        {/* ===== MODEL ===== */}
        {/* ===== MODEL ===== */}
<Label text="Dòng xe" />
<DropdownInput
  disabled={!form.vehicleBrand || !hasModels}
  value={
    !form.vehicleBrand
      ? "Chọn hãng xe trước"
      : !hasModels
      ? "Hãng này chưa có dòng xe"
      : form.vehicleModel?.name || "Chọn dòng xe"
  }
  onPress={() => {
    if (!hasModels) return;
    setShowModelModal(true);
  }}
/>


        {/* ===== OTHER FIELDS (GIỮ NGUYÊN) ===== */}
        <View style={styles.row2}>
          <View style={{ flex: 1 }}>
            <Label text="Năm sản xuất" />


            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowYearPicker(true)}
            >
              <Text
                style={{
                  color: form.yearManufacture ? COLORS.black : COLORS.gray,
                }}
              >
                {form.yearManufacture || "Chọn năm"}
              </Text>
            </TouchableOpacity>

          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Label text="Năm đăng ký" />
           <TouchableOpacity
  style={styles.input}
  onPress={() => setShowRegisterYearPicker(true)}
  disabled={!form.yearManufacture}
>
  <Text
    style={{
      color: form.yearRegister
        ? COLORS.black
        : COLORS.gray,
    }}
  >
    {form.yearRegister || "Chọn năm"}
  </Text>
</TouchableOpacity>

          </View>
        </View>

        <Label text="Số ghế" />
        <Input
          placeholder="Ví dụ: 5"
          keyboardType="number-pad"
          value={form.seats}
          onChangeText={(v) => setForm({ ...form, seats: v })}
        />

        <Label text="Biển số xe" />
        <Input
          placeholder="30A-123.45"
          value={form.licensePlate}
          onChangeText={(v) =>
            setForm({ ...form, licensePlate: v })
          }
        />

        <Label text="Màu ngoại thất" />
        <Input
          placeholder="Nhập màu sơn xe"
          value={form.exteriorColor}
          onChangeText={(v) =>
            setForm({ ...form, exteriorColor: v })
          }
        />

        <Label text="Màu nội thất" />
        <Input
          placeholder="Nhập màu nội thất"
          value={form.interiorColor}
          onChangeText={(v) =>
            setForm({ ...form, interiorColor: v })
          }
        />
      </ScrollView>

      <TouchableOpacity
  style={styles.nextBtn}
  onPress={onNext}
>
        <Text style={styles.nextText}>Tiếp tục →</Text>
      </TouchableOpacity>

      {/* ================= BRAND MODAL ================= */}
      <SelectModal
        visible={showBrandModal}
        data={brands}
        labelKey="name"
        onClose={() => setShowBrandModal(false)}
        onSelect={(item) => {
          setForm({
            ...form,
            vehicleBrand: item,
            vehicleModel: null,
          });
          setShowBrandModal(false);
        }}
      />

      {/* ================= MODEL MODAL ================= */}
      <SelectModal
        visible={showModelModal}
        data={filteredModels}
        labelKey="name"
        onClose={() => setShowModelModal(false)}
        onSelect={(item) => {
          setForm({ ...form, vehicleModel: item });
          setShowModelModal(false);
        }}
      />
      {showYearPicker && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowYearPicker(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            paddingHorizontal: 32,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              maxHeight: 300,
            }}
          >
            <ScrollView>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => {
                    setForm({ ...form, yearManufacture: String(year) });
                    setShowYearPicker(false);
                  }}
                  style={{
                    padding: 14,
                    borderBottomWidth: 0.5,
                    borderColor: COLORS.gray,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>{year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}

      {showRegisterYearPicker && (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => setShowRegisterYearPicker(false)}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      paddingHorizontal: 32,
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        maxHeight: 300,
      }}
    >
      <ScrollView>
        {registerYears.map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => {
              setForm({ ...form, yearRegister: String(year) });
              setShowRegisterYearPicker(false);
            }}
            style={{
              padding: 14,
              borderBottomWidth: 0.5,
              borderColor: COLORS.gray,
            }}
          >
            <Text style={{ textAlign: "center" }}>{year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </TouchableOpacity>
)}


    </SafeAreaView>
  );
}

/* ================= COMPONENT PHỤ ================= */

function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}

function Input(props) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={COLORS.gray}
    />
  );
}

function DropdownInput({ value, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.input,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: disabled ? "#F2F2F2" : COLORS.white,
        },
      ]}
    >
      <Text style={{ color: disabled ? COLORS.gray : COLORS.text }}>
        {value}
      </Text>
      <Ionicons name="chevron-down" size={18} />
    </TouchableOpacity>
  );
}

function SelectModal({ visible, data, labelKey, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          padding: 24,
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            maxHeight: "70%",
          }}
          onPress={() => { }}
        >
          <ScrollView>
            {data.map((item) => (
              <TouchableOpacity
                key={item[labelKey] + Math.random()}
                onPress={() => onSelect(item)}
                style={{
                  padding: 14,
                  borderBottomWidth: 0.5,
                  borderColor: "#eee",
                }}
              >
                <Text>{item[labelKey]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
