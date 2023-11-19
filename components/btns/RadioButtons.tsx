import React, { memo } from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { appColors } from "../../utils";
import AppButton from "../AppButton";
import AppText from "../AppText";

interface IRadioButtonProps {
  lblStyle?: {};
  btnStyle?: {};
  label: string;
  isSelected: boolean;
  circleStyle?: object;
  circleWidth?: number;
  circleHeight?: number;
}

const RadioButton = (props: IRadioButtonProps & TouchableOpacityProps) => {
  return (
    <AppButton
      onPress={props.onPress}
      btnStyle={{ ...styles.btnStyle, ...props.btnStyle }}
    >
      <View
        style={{
          ...styles.circleStyle,
          ...props.circleStyle,
          width: props.circleWidth,
          height: props.circleHeight,
        }}
      >
        <View
          style={{
            ...styles.innerStyle,
            width: props.circleWidth ? props.circleWidth / 2 + 2 : 0,
            height: props.circleHeight ? props.circleHeight / 2 + 2 : 0,
            backgroundColor: props.isSelected ? appColors.red : appColors.white,
          }}
        />
      </View>

      <AppText
        label={props.label}
        lblStyle={{ ...styles.lblStyle, ...props.lblStyle }}
      />
    </AppButton>
  );
};

export default memo(RadioButton);

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: "center",
    flexDirection: "row",
  },
  lblStyle: {
    fontSize: 20,
  },
  circleStyle: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: appColors.black,
  },
  innerStyle: {
    width: 13,
    height: 13,
    borderRadius: 10,
  },
});
