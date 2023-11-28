import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "../utils";
import { AppText } from "./txts";

const CartRow = ({
  ans,
  icon,
  itemStyle,
}: {
  ans: string;
  itemStyle?: object;
  icon?: keyof typeof Entypo.glyphMap;
}) => {
  return (
    <View style={{ ...styles.itemStyle, ...itemStyle }}>
      <View style={{ opacity: 0.5 }}>
        <Entypo name={icon} size={20} color={appColors.grey} />
      </View>

      <AppText label={ans.toString()} lblStyle={styles.ansStyle} />
    </View>
  );
};

export default CartRow;

const styles = StyleSheet.create({
  itemStyle: {
    width: "48%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ansStyle: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },
});
