import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { userType } from "../types/user_type";
import { appColors } from "../utils";
import AppButton from "./AppButton";
import AppText from "./AppText";

interface IItemRow {
  ans: string;
  icon: keyof typeof Entypo.glyphMap;
}

const UserCart = ({
  item,
  onPressEdit,
  onDeleteUser,
}: {
  item: userType;
  onDeleteUser: (id: string) => void;
  onPressEdit: (item: userType) => void;
}) => {
  const ItemRow = ({ icon, ans }: IItemRow) => {
    return (
      <View style={styles.itemStyle}>
        <View style={{ opacity: 0.5 }}>
          <Entypo name={icon} size={20} color={appColors.grey} />
        </View>

        <AppText label={ans} lblStyle={styles.ansStyle} />
      </View>
    );
  };

  return (
    <View style={styles.rootStyle}>
      <View style={styles.itemContainer}>
        <AppButton onPress={() => onDeleteUser(item.id)}>
          <AntDesign name="delete" color={appColors.red} size={20} />
        </AppButton>

        <AppButton
          btnStyle={{ marginRight: 10 }}
          onPress={() => onPressEdit(item)}
        >
          <AntDesign name="edit" color={appColors.green} size={20} />
        </AppButton>
      </View>

      <View style={{ ...styles.eachRowStyle, marginBottom: 5 }}>
        <ItemRow ans={item.fullName} icon="user" />
        <ItemRow ans={item.mobile} icon="mobile" />
      </View>

      <View style={styles.eachRowStyle}>
        <ItemRow ans={item.email} icon="email" />
        <ItemRow icon="user" ans={item.gender === "male" ? "Male" : "Female"} />
      </View>

      <View style={{ marginTop: 5 }}>
        <ItemRow ans={item.address} icon="address" />
      </View>
    </View>
  );
};

export default UserCart;

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
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
  },
  ansStyle: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },
  itemStyle: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  eachRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
