import api from "../api";

export const getMyVehicles = () => {
  return api.get("/vehicles");
};

export const getVehicleById = (vehicleId) => {
  return api.get(`/vehicles/${vehicleId}`);
};