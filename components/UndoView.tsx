import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "../utils";
import AppButton from "./AppButton";
import AppText from "./AppText";

const UndoView = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.undoStyle}>
      <AppText
        label="User Deleting User"
        lblStyle={{ color: appColors.white }}
      />

      <AppButton onPress={onPress}>
        <AppText label="Undo" lblStyle={{ color: appColors.white }} />
      </AppButton>
    </View>
  );
};

export default UndoView;

const styles = StyleSheet.create({
  undoStyle: {
    bottom: 0,
    height: 50,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between",
    backgroundColor: appColors.grey,
  },
});