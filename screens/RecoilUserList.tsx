import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  AddUser,
  AppButton,
  AppText,
  NoData,
  RootScreen,
  UndoView,
  UsersList,
} from "../components";
import { filteredUsers } from "../st-management/recoil";
import { userType } from "../types";
import { useRecoilUserList } from "./logic";
import { FilterModal, FormModal } from "./modal";

const RecoilUserList = () => {
  const hooks = useRecoilUserList();

  // if you want to read and write state in atom use useRecoilState hooks
  // if you want to only read state in atom use useRecoilState

  // const users = useRecoilValue(usersState); // users -> []
  // const usersSize = useRecoilValue(usersCount); // usersSize -> 0

  // const [users, setUsers] = useRecoilState(usersList);

  let users = useRecoilValue(filteredUsers);

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0 }}>
      <AddUser onPress={() => hooks.handleShowModal(true)} />

      {users.length !== 0 && (
        <View style={styles.countStyle}>
          <AppText
            lblStyle={{ opacity: 0.7 }}
            label={`User count: ${users.length.toString()}`}
            // label={`User count: ${usersSize.toString()}`}
          />

          <AppButton onPress={() => hooks.handleFilterModal(true)}>
            <FontAwesome name="filter" size={20} />
          </AppButton>
        </View>
      )}

      {users.length === 0 ? (
        <NoData />
      ) : (
        <UsersList
          data={users}
          onEditUser={(value: userType) => hooks.handleEditItem(value)}
          onDeleteUser={(id: string) => hooks.handleDeletingUser(id)}
        />
      )}

      {hooks.state.showModal && (
        <FormModal
          editedUser={hooks.state.deletedUser}
          onCloseModal={() => hooks.handleShowModal(false)}
          onSaveUser={(value: userType) => hooks.handleSavingUser(value)}
        />
      )}

      {hooks.state.showUndoScreen && (
        <UndoView onPress={hooks.handleUndoDeletingUser} />
      )}

      {hooks.state.showFilterModal && (
        <FilterModal
          onPressClose={() => hooks.handleFilterModal(false)}
          onSelectFilter={(value: string) => hooks.handleApplyFilter(value)}
        />
      )}
    </RootScreen>
  );
};

export default RecoilUserList;
const styles = StyleSheet.create({
  countStyle: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
