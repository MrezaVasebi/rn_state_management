import React from "react";
import { StyleSheet, View } from "react-native";
import { type_user } from "../types/api";
import AppSpinner from "./AppSpinner";
import NoData from "./NoData";
import { ApiUsersList } from "./list";

interface IApiData {
  loading: boolean;
  usersList: type_user[];
}

const ApiData = (props: IApiData) => {
  return (
    <View style={styles.rootStyle}>
      {props.loading ? (
        <AppSpinner />
      ) : props.usersList.length === 0 ? (
        <NoData />
      ) : (
        <ApiUsersList usersList={props.usersList} />
      )}
    </View>
  );
};

export default ApiData;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
  btnStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
});
