import React, { useState } from "react";
import { IInit } from "../screens/logic";
import { userType } from "../types";
import { type_user } from "../types/api";
import ApiData from "./ApiData";
import LocalData from "./LocalData";
import RootScreen from "./RootScreen";
import { SwitchTab } from "./btns";

interface IMainScreen {
  loading: boolean;
  usersList: type_user[]; // api

  state: IInit;
  users: userType[]; // local
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
        <LocalData
          state={props.state}
          users={props.users}
          onSaveUser={props.onSaveUser}
          onDeleteUser={props.onDeleteUser}
          handleEditItem={props.handleEditItem}
          undoDeletedUser={props.undoDeletedUser}
          handleShowModal={props.handleShowModal}
          handleFilterModal={props.handleFilterModal}
          handleApplyFilter={props.handleApplyFilter}
        />
      ) : (
        <ApiData usersList={props.usersList} loading={props.loading} />
      )}
    </RootScreen>
  );
};

export default MainScreen;
