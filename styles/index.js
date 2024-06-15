import { StyleSheet } from "react-native";
import COLORS from "./COLORS";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2d65",
    paddingHorizontal: 5,
  },
  h1: { fontSize: 32, fontWeight: "700" },
  h2: { fontSize: 22, fontWeight: "600" },
  h3: { fontSize: 17, fontWeight: "500" },
  h4: { fontSize: 16, fontWeight: "400" },
  primary: { color: "#1a2d65" },
  secondary: { color: "#fff1cc" },
  third: { color: "#e91f49" },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.inputBackground,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondaryBorder,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: COLORS.linkHoverText,
    color: COLORS.primaryButtonText,
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  btnMain: {
    width: "100%",
    alignItems: "center",
    marginVertical: 8,
    paddingVertical: 15,
    backgroundColor: COLORS.accentBackground,
  },
  btnMainText: {
    color: COLORS.primaryButtonText,
    fontSize: 15,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  btnSecondary: {
    width: "100%",
    alignItems: "center",
    marginVertical: 8,
    paddingVertical: 15,
    backgroundColor: "#fff1cc",
  },
  btnSecondaryText: {
    color: "#e91f49",
    fontSize: 15,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.third,
    marginVertical: 5,
    borderRadius: 5,
  },
});
