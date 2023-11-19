import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "./txts";

const NoData = () => {
  return (
    <View style={styles.noData}>
      <AppText label="No Data..." />
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
