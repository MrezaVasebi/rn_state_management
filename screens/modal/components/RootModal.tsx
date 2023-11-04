import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { appColors } from "../../../utils";

const RootModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal transparent statusBarTranslucent animationType="fade">
      <View style={styles.root}>
        <View style={styles.innerStyle}>{children}</View>
      </View>
    </Modal>
  );
};

export default RootModal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  innerStyle: {
    padding: 20,
    height: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: appColors.white,
  },
});
