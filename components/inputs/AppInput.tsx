import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { appColors } from "../../utils";

interface IAppInput {
  inputStyle?: object;
}

const AppInput = (props: TextInputProps & IAppInput) => {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      placeholderTextColor={appColors.txtPlaceColor}
      style={{
        ...styles.style,
        ...props.inputStyle,
      }}
    />
  );
};

export default AppInput;

const styles = StyleSheet.create({
  style: {
    height: 45,
    fontSize: 15,
    color: "black",
    borderRadius: 10,
    fontFamily: "medium",
    paddingHorizontal: 10,
    backgroundColor: "#EFEFEF",
    borderColor: appColors.borderColors.grey,
  },
});
