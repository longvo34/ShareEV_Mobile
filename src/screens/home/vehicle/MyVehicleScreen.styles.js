import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
  },

  subTitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  info: {
    padding: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  plate: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeGreen: {
    backgroundColor: "#E7F8EF",
  },

  badgeOrange: {
    backgroundColor: "#FFF2E5",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },

  textGreen: {
    color: "#1BAA6E",
  },

  textOrange: {
    color: "#F59E0B",
  },
});
