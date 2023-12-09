import React from "react";
import { ScrollView, View } from "react-native";
import { IInit } from "../screens/logic";
import { FilterModal, FormModal } from "../screens/modal";
import { userType } from "../types";
import AddUser from "./AddUser";
import FilteredItems from "./FilteredItems";
import NoData from "./NoData";
import UndoView from "./UndoView";
import { UsersList } from "./list";

interface ILocalData {
  state: IInit;
  users: userType[]; // local
  undoDeletedUser: () => void;
  onDeleteUser: (id: string) => void;
  onSaveUser: (value: userType) => void;
  handleShowModal: (value: boolean) => void;
  handleEditItem: (value: userType) => void;
  handleApplyFilter: (type: string) => void;
  handleFilterModal: (value: boolean) => void;
}

const LocalData = (props: ILocalData) => {
  return (
    <View style={{ flex: 1 }}>
      <AddUser onPress={() => props?.handleShowModal(true)} />

      {props?.users?.length !== 0 && (
        <FilteredItems
          count={props?.users?.length}
          onPressFilter={() => props.handleFilterModal(true)}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {props?.users?.length === 0 ? (
          <NoData />
        ) : (
          <UsersList
            data={props?.users}
            onDeleteUser={props?.onDeleteUser}
            onEditUser={(value: userType) => props?.handleEditItem(value)}
          />
        )}

        {props?.state?.showModal && (
          <FormModal
            editedUser={props?.state?.deletedUser}
            onCloseModal={() => props?.handleShowModal(false)}
            onSaveUser={(value: userType) => props?.onSaveUser(value)}
          />
        )}

        {props?.state?.showUndoScreen && (
          <UndoView onPress={props?.undoDeletedUser} />
        )}

        {props?.state?.showFilterModal && (
          <FilterModal
            onPressClose={() => props?.handleFilterModal(false)}
            onSelectFilter={(value: string) => props?.handleApplyFilter(value)}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default LocalData;
