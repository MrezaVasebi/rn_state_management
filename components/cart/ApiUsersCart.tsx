import React from "react";
import { StyleSheet, View } from "react-native";
import { type_user } from "../../types/api";
import { appColors } from "../../utils";

const ApiUserCart = ({ user }: { user: type_user }) => {
  return <View style={styles.rootStyle}></View>;
};

export default ApiUserCart;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 10,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: appColors.white,
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowStyle: {
    width: "48%",
    marginBottom: 5,
    alignItems: "center",
    flexDirection: "row",
  },
});
