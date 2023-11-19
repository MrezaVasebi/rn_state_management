import React from "react";
import { StyleSheet, TouchableOpacityProps } from "react-native";
import { appColors } from "../utils";
import AppButton from "./AppButton";
import AppText from "./AppText";

interface IAppButton {
  label: string;
  lblStyle?: object;
  btnStyle?: object;
}

const SimpleButton = (props: TouchableOpacityProps & IAppButton) => {
  return (
    <AppButton
      onPress={props.onPress}
      btnStyle={{ ...styles.btnStyle, ...props.btnStyle }}
    >
      <AppText
        label={props.label}
        lblStyle={{ ...styles.llbStyle, ...props.lblStyle }}
      />
    </AppButton>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.green,
  },
  llbStyle: {
    color: appColors.white,
  },
});
