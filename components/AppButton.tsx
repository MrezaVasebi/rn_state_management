import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface IAppButton {
  btnStyle?: object;
}

const AppButton = (props: TouchableOpacityProps & IAppButton) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
      style={{ ...styles.btnStyle, ...props.btnStyle }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnStyle: {},
});
