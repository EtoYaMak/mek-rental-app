import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSettings from "../../../screens/supplier/profile-settings";
import styles from "../../../../styles";
const Settings = () => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: 25 }]}>
      <Text
        style={[
          { textAlign: "center", fontSize: 32, fontWeight: "600" },
          styles.secondary,
        ]}
      >
        Settings
      </Text>
      <ProfileSettings />
    </SafeAreaView>
  );
};

export default Settings;
