import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "./AppButton";
import AppText from "./AppText";

const AddUser = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.headerStyle}>
      <AppText label="Users List" lblStyle={{ fontSize: 25 }} />

      <AppButton onPress={onPress}>
        <Entypo name="plus" size={25} />
      </AppButton>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
