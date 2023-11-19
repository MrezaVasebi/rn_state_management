import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { AppButton, AppText } from "../../../components";
import { appColors } from "../../../utils";

const RootModal = ({
  title,
  children,
  onPressClose,
}: {
  title?: string;
  onPressClose?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <Modal transparent statusBarTranslucent animationType="fade">
      <View style={styles.root}>
        <View style={styles.innerStyle}>
          <View style={styles.headerStyle}>
            <AppText lblStyle={styles.titleStyle} label={title ?? ""} />

            <AppButton onPress={onPressClose}>
              <AntDesign name="close" size={25} />
            </AppButton>
          </View>

          {children}
        </View>
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
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleStyle: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "500",
    fontStyle: "normal",
  },
});
