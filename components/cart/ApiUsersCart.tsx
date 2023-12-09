import React from "react";
import { StyleSheet, View } from "react-native";
import { type_user } from "../../types/api";
import { appColors } from "../../utils";
import CartRow from "../CartRow";

const ApiUserCart = ({ user }: { user: type_user }) => {
  return (
    <View style={styles.rootStyle}>
      <CartRow ans={user?.id} lbl={"UserId"} />
      <CartRow
        ans={user?.name}
        lbl={"FullName"}
        itemStyle={{ marginVertical: 5 }}
      />
      <CartRow ans={user?.email} lbl="Email" />
      <CartRow
        ans={user?.phone}
        lbl={"Phone"}
        itemStyle={{ marginVertical: 5 }}
      />
      <CartRow ans={user?.website} lbl="Website" />
    </View>
  );
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
  itemContainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
});
