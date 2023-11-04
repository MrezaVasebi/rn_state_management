import { Entypo } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppButton, AppText, RootScreen, UserCart } from "../components";
import { UserContext } from "../st-management/context-api";
import { UserContextType, userType } from "../types";
import { appColors } from "../utils";
import { useUserList } from "./logic";
import { FormModal } from "./modal";

const UserList = () => {
  const hooks = useUserList();
  const userCtx = useContext(UserContext) as UserContextType;

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <View style={styles.headerStyle}>
        <AppText label="Users List" lblStyle={{ fontSize: 25 }} />

        <AppButton onPress={() => hooks.handleShowModal(true)}>
          <Entypo name="plus" size={25} />
        </AppButton>
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

      {hooks.state.showUndoScreen && (
        <View style={styles.undoStyle}>
          <AppText
            label="User Deleting User"
            lblStyle={{ color: appColors.white }}
          />

          <AppButton onPress={hooks.undoDeletedUser}>
            <AppText label="Undo" lblStyle={{ color: appColors.white }} />
          </AppButton>
        </View>
      )}
    </RootScreen>
  );
};

export default UserList;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  scrollStyle: {
    flexGrow: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  noData: {
    flex: 1,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  undoStyle: {
    bottom: 0,
    height: 50,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between",
    backgroundColor: appColors.grey,
  },
});
