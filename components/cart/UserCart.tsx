import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { userType } from "../../types/user_type";
import { appColors } from "../../utils";
import CartRow from "../CartRow";
import { AppButton } from "../btns";

interface IUserCart {
  item: userType;
  onDeleteUser: (id: string) => void;
  onPressEdit: (item: userType) => void;
}

const UserCart = (props: IUserCart) => {
  return (
    <View style={styles.rootStyle}>
      <View style={styles.itemContainer}>
        <AppButton onPress={() => props.onDeleteUser(props.item?.id)}>
          <AntDesign name="delete" color={appColors.red} size={20} />
        </AppButton>

        <AppButton
          btnStyle={{ marginRight: 10 }}
          onPress={() => props.onPressEdit(props.item)}
        >
          <AntDesign name="edit" color={appColors.green} size={20} />
        </AppButton>
      </View>

      <View style={styles.eachRowStyle}>
        <CartRow
          lbl="FullName"
          ans={props.item?.fullName}
          itemStyle={styles.itemWidth}
        />
        <CartRow
          lbl="Mobile"
          ans={props.item?.mobile}
          itemStyle={styles.itemWidth}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
          ...styles.eachRowStyle,
        }}
      >
        <CartRow
          lbl="Email"
          ans={props.item?.email}
          itemStyle={styles.itemWidth}
        />

        <CartRow
          lbl="Gender"
          itemStyle={styles.itemWidth}
          ans={props.item?.gender === "male" ? "Male" : "Female"}
        />
      </View>

      <CartRow
        lbl="Address"
        ans={props.item?.address}
        itemStyle={{ width: "100%" }}
      />

      {/* <View style={{ ...styles.eachRowStyle, marginBottom: 10 }}>
        <CartRow ans={item.fullName} icon="user" />
        <CartRow ans={item.mobile} icon="mobile" />
      </View> */}

      {/* <View style={styles.eachRowStyle}>
        <CartRow ans={item.email} icon="email" />
        <CartRow icon="user" ans={item.gender === "male" ? "Male" : "Female"} />
      </View> */}

      {/* <CartRow
        icon={"address"}
        ans={item.address}
        itemStyle={{ marginTop: 5 }}
      /> */}
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
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
  eachRowStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemWidth: {
    width: "48%",
  },
});
