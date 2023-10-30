import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { userType } from "../types/user_type";
import { appColors } from "../utils";
import AppText from "./AppText";

interface IItemRow {
  icon: keyof typeof Entypo.glyphMap;
  ans: string;
}

const UserCart = ({
  item,
  onDeleteUser,
}: {
  item: userType;
  onDeleteUser: (id: string) => void;
}) => {
  const ItemRow = ({ icon, ans }: IItemRow) => {
    return (
      <View style={styles.itemStyle}>
        <Entypo name={icon} size={20} color={appColors.grey} />
        <AppText label={ans} lblStyle={{ marginLeft: 10 }} />
      </View>
    );
  };

  return (
    <View style={styles.rootStyle}>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onDeleteUser(item.id)}
        >
          <AntDesign name="delete" color={appColors.red} size={25} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <ItemRow ans={item.fullName} icon="user" />
        <ItemRow ans={item.mobile} icon="mobile" />
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <ItemRow ans={item.email} icon="email" />
        <ItemRow ans={item.address} icon="address" />
      </View>
    </View>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: appColors.white,
  },
  itemStyle: { flex: 1, flexDirection: "row", alignItems: "flex-start" },
});
