import api from "../api";

export const uploadCCCD = (frontImage, backImage) => {
  const formData = new FormData();

  formData.append("frontImageFile", {
    uri: frontImage.uri,
    name: "front.jpg",
    type: "image/jpeg",
  });

  formData.append("backImageFile", {
    uri: backImage.uri,
    name: "back.jpg",
    type: "image/jpeg",
  });

  return api.post("/ekyc/cccd", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
