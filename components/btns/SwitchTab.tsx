import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "../../utils";
import SimpleButton from "./SimpleButton";

interface ISwitchTab {
  tabName: string;
  lblLeft: string;
  lblRight: string;
  rootStyle?: object;
  onPressLeft: () => void;
  onPressRight: () => void;
}

const SwitchTab = (props: ISwitchTab) => {
  return (
    <View style={{ ...styles.rootStyle, ...props.rootStyle }}>
      <View style={styles.innerStyle}>
        <SimpleButton
          label={props.lblLeft}
          btnStyle={{
            ...styles.btnStyle,
            backgroundColor:
              props.tabName === props.lblLeft
                ? appColors.green
                : appColors.grey,
          }}
          onPress={props.onPressLeft}
        />

        <SimpleButton
          label={props.lblRight}
          btnStyle={{
            ...styles.btnStyle,
            backgroundColor:
              props.tabName === props.lblRight
                ? appColors.green
                : appColors.grey,
          }}
          onPress={props.onPressRight}
        />
      </View>
    </View>
  );
};

export default SwitchTab;

const styles = StyleSheet.create({
  rootStyle: {
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  innerStyle: {
    padding: 3,
    width: "80%",
    height: "100%",
    borderWidth: 0.5,
    borderRadius: 100,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    borderColor: appColors.borderColors.grey,
  },
  btnStyle: {
    width: "49%",
    height: "100%",
    borderRadius: 100,
  },
});
