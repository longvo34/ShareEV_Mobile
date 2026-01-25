import { StyleSheet } from "react-native";
import COLORS from "../../../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  tabRow: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#EEE",
    borderRadius: 20,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "500",
  },

  activeTabText: {
    color: COLORS.black,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  carName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.gray,
  },

  note: {
    marginTop: 8,
    fontSize: 12,
    color: "#3A7AFE",
  },

  status: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  pending: {
    backgroundColor: "#FFE58F",
    color: "#AD6800",
  },

  review: {
    backgroundColor: "#E6F0FF",
    color: "#1D4ED8",
  },

  approved: {
    backgroundColor: "#E6FFFA",
    color: "#047857",
  },

  rejected: {
    backgroundColor: "#FFE4E6",
    color: "#BE123C",
  },

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
