import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { userType } from "../../types";
import UserCart from "../cart/UserCart";

interface IUserList {
  data: userType[];
  onDeleteUser: (id: string) => void;
  onEditUser: (value: userType) => void;
}

const UsersList = (props: IUserList) => {
  let { onDeleteUser, onEditUser, data = [] } = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}
    >
      {data?.length !== 0 &&
        data?.map((el: userType, index) => {
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
