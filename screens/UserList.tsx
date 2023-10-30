import { Entypo } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText, RootScreen, UserCart } from "../components";
import { UserContext } from "../st-management/context-api";
import { UserContextType, userType } from "../types";
import { useUserList } from "./logic";
import { FormModal } from "./modal";

const UserList = () => {
  const hooks = useUserList();
  const userCtx = useContext(UserContext) as UserContextType;

  return (
    <RootScreen>
      <View style={styles.headerStyle}>
        <AppText label="Users List" lblStyle={{ fontSize: 25 }} />

        <TouchableOpacity onPress={() => hooks.handleShowModal(true)}>
          <Entypo name="plus" size={25} />
        </TouchableOpacity>
      </View>

      {userCtx.users.length === 0 ? (
        <View style={styles.noData}>
          <AppText label="No Data..." />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollStyle}
        >
          {userCtx.users.map((el: userType, index) => {
            return (
              <UserCart
                item={el}
                key={index}
                onDeleteUser={hooks.onDeleteUser}
              />
            );
          })}
        </ScrollView>
      )}

      {hooks.state.showModal && (
        <FormModal
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.onSaveUser(value)}
        />
      )}
    </RootScreen>
  );
};

export default UserList;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollStyle: {
    flexGrow: 1,
    marginTop: 10,
  },
  noData: {
    flex: 1,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
