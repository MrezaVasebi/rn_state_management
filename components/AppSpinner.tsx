import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { appColors } from "../utils";

const AppSpinner = (rootStyle: { rootStyle?: object }) => {
  return (
    <View style={{ ...styles.rootStyle, ...rootStyle }}>
      <ActivityIndicator
        size={"large"}
        animating={true}
        color={appColors.black}
      />
    </View>
  );
};

export default AppSpinner;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
