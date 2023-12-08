import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { FilterModal, FormModal } from "../screens/modal";
import { todoType, userType } from "../types";
import AddUser from "./AddUser";
import ApiData from "./ApiData";
import FilteredItems from "./FilteredItems";
import NoData from "./NoData";
import RootScreen from "./RootScreen";
import UndoView from "./UndoView";
import UsersList from "./UsersList";
import { SwitchTab } from "./btns";

interface IInit {
  showModal: boolean;
  deletedIndex: number;
  deletedUser: userType;
  showUndoScreen: boolean;
  showFilterModal: boolean;
}

interface IMainScreen {
  loading: boolean;
  todoList: todoType[];

  state: IInit;
  users: userType[];
  undoDeletedUser: () => void;
  onDeleteUser: (is: string) => void;
  onSaveUser: (value: userType) => void;
  handleShowModal: (value: boolean) => void;
  handleEditItem: (value: userType) => void;
  handleApplyFilter: (type: string) => void;
  handleFilterModal: (value: boolean) => void;
}

const MainScreen = (props: IMainScreen) => {
  const [tabName, setTabName] = useState<string>("Local Data");

  return (
    <RootScreen rootStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}>
      <SwitchTab
        tabName={tabName}
        lblRight="Api Data"
        lblLeft="Local Data"
        rootStyle={{ marginBottom: 10 }}
        onPressRight={() => setTabName("Api Data")}
        onPressLeft={() => setTabName("Local Data")}
      />

      {tabName === "Local Data" ? (
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
                onSelectFilter={(value: string) =>
                  props?.handleApplyFilter(value)
                }
              />
            )}
          </ScrollView>
        </View>
      ) : (
        <ApiData loading={props.loading} todoList={props.todoList} />
      )}
    </RootScreen>
  );
};

export default MainScreen;
