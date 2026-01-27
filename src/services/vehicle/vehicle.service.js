import api from "../api";

export const getMyVehicles = (params = {}) => {
  return api.get("/vehicles/pagination", {
    params: {
      pageNumber: 1,
      pageSize: 20,
      sortBy: "CreatedDate",
      sortOrder: "desc",
      ...params,
    },
  });
};


export const getVehicleById = (vehicleId) => {
  return api.get(`/vehicles/${vehicleId}`);
};

export const createVehicleWithImages = (data, images = []) => {
  const formData = new FormData();

  // ====== TEXT FIELDS ======
  formData.append("VehicleModelId", data.vehicleModelId);
  formData.append("LicensePlate", data.licensePlate);
  formData.append("Color", data.color);
  formData.append("Year", String(data.year));

  if (data.odometer !== null)
    formData.append("Odometer", String(data.odometer));

  if (data.batteryHealth !== null)
    formData.append("BatteryHealth", String(data.batteryHealth));

  if (data.lastMaintenanceDate)
    formData.append("LastMaintenanceDate", data.lastMaintenanceDate);

  // ====== IMAGES ======
  images.forEach((img, index) => {
    formData.append("images", {
      uri: img.uri,
      name: `vehicle_${index}.jpg`,
      type: "image/jpeg",
    });
  });

  return api.post("/vehicles/with-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};