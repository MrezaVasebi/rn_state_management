import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { todoType } from "../types";
import AppSpinner from "./AppSpinner";
import NoData from "./NoData";
import { AppText } from "./txts";

interface IApiData {
  loading: boolean;
  todoList: todoType[];
}

const ApiData = (props: IApiData) => {
  return (
    <View style={styles.rootStyle}>
      {props.loading ? (
        <AppSpinner />
      ) : props.todoList.length === 0 ? (
        <NoData />
      ) : (
        <FlatList
          data={props.todoList}
          renderItem={({ item }) => {
            return (
              <View>
                <AppText label={item.userId.toString()} />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default ApiData;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
});
