import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { type_user } from "../../types/api";
import ApiUserCart from "../cart/ApiUsersCart";

const ApiUsersList = (props: { usersList: type_user[] }) => {
  let { usersList = [] } = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}
    >
      {usersList?.length !== 0 &&
        usersList?.map((el: type_user, index) => {
          return <ApiUserCart key={index} user={el} />;
        })}
    </ScrollView>
  );
};

export default ApiUsersList;

const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1,
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
