import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { userType } from "../types";
import UserCart from "./UserCart";

const UsersList = ({
  data,
  onDeleteUser,
}: {
  data: userType[];
  onDeleteUser: (id: string) => void;
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}
    >
      {data.map((el: userType, index) => {
        return <UserCart item={el} key={index} onDeleteUser={onDeleteUser} />;
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
