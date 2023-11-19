import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { userType } from "../types";
import UserCart from "./UserCart";

const UsersList = ({
  data,
  onEditUser,
  onDeleteUser,
}: {
  data: userType[];
  onDeleteUser: (id: string) => void;
  onEditUser: (value: userType) => void;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}
    >
      {data.map((el: userType, index) => {
        return (
          <UserCart
            item={el}
            key={index}
            onDeleteUser={onDeleteUser}
            onPressEdit={() => onEditUser(el)}
          />
        );
      })}
    </ScrollView>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
