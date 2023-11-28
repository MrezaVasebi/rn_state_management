import React from "react";
import { ScrollView } from "react-native";
import { FilterModal, FormModal } from "../screens/modal";
import { userType } from "../types";
import AddUser from "./AddUser";
import FilteredItems from "./FilteredItems";
import NoData from "./NoData";
import RootScreen from "./RootScreen";
import UndoView from "./UndoView";
import UsersList from "./UsersList";

interface IInit {
  showModal: boolean;
  deletedIndex: number;
  deletedUser: userType;
  showUndoScreen: boolean;
  showFilterModal: boolean;
}

interface IMainScreen {
  state: IInit;
  data: userType[];
  undoDeletedUser: () => void;
  onDeleteUser: (is: string) => void;
  onSaveUser: (value: userType) => void;
  handleShowModal: (value: boolean) => void;
  handleEditItem: (value: userType) => void;
  handleApplyFilter: (type: string) => void;
  handleFilterModal: (value: boolean) => void;
}

const MainScreen = (props: IMainScreen) => {
  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}>
      <AddUser onPress={() => props?.handleShowModal(true)} />

      {props?.data?.length !== 0 && (
        <FilteredItems
          count={props?.data?.length}
          onPressFilter={() => props.handleFilterModal(true)}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {props?.data?.length === 0 ? (
          <NoData />
        ) : (
          <UsersList
            data={props?.data}
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
    </RootScreen>
  );
};

export default MainScreen;
