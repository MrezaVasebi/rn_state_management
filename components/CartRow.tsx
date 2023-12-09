import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "./txts";

interface ICartRow {
  lbl: string;
  itemStyle?: object;
  ans: string | number;
  icon?: keyof typeof Entypo.glyphMap;
}

const CartRow = (props: ICartRow) => {
  return (
    <View style={{ ...styles.itemStyle, ...props.itemStyle }}>
      <View style={{ opacity: 0.5 }}>
        <AppText label={`${props.lbl}: `} lblStyle={{ fontSize: 13 }} />
        {/* <Entypo name={icon} size={20} color={appColors.grey} /> */}
      </View>

      <AppText label={props.ans.toString()} lblStyle={styles.ansStyle} />
    </View>
  );
};

export default CartRow;

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  ansStyle: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
});
