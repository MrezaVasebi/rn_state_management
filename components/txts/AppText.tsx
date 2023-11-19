import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface IAppText {
  label: string;
  lblStyle?: object;
}

const AppText = (props: TextProps & IAppText) => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={{ ...styles.lblStyle, ...props.lblStyle }}
    >
      {props.label}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  lblStyle: {
    fontSize: 15,
    fontFamily: "medium",
  },
});
