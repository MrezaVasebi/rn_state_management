import React from "react";
import { StyleSheet } from "react-native";
import { RootModal } from "./components";

interface ITodoFilterModal {
  onPressClose: () => void;
}

const TodoFilterModal = (props: ITodoFilterModal) => {
  return (
    <RootModal
      title="Filter Todo"
      onPressClose={props.onPressClose}
    ></RootModal>
  );
};

export default TodoFilterModal;

const styles = StyleSheet.create({});
