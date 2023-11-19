import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText, SimpleButton } from "../../components";
import InputWithLabel from "../../components/InputWithLabel";
import { userType } from "../../types";
import { appColors } from "../../utils";
import { RootModal } from "./components";
import { useFormModal } from "./logic";

interface IFromModal {
  editedUser: userType;
  onCloseModal: () => void;
  onSaveUser: (value: userType) => void;
}

const FormModal = (props: IFromModal) => {
  const hooks = useFormModal(props);

  return (
    <RootModal>
      <AppText label="Add User Info" lblStyle={styles.titleStyle} />

      <View style={styles.wrapContainer}>
        {hooks.formItem.map((el, index) => {
          return (
            <InputWithLabel
              key={index}
              value={el.value}
              // label={el.lbl}
              placeholder={el.placeholder}
              rootStyle={styles.itemStyle}
              onChangeText={(value: string) =>
                hooks.setValues(el.identifier, value)
              }
            />
          );
        })}
      </View>

      <View style={styles.btnStyle}>
        <SimpleButton
          label={hooks.btnLbl}
          btnStyle={{ width: "25%" }}
          onPress={hooks.passUserInfo}
        />

        <SimpleButton
          label="Cancel"
          onPress={props.onCloseModal}
          btnStyle={styles.cancelStyle}
        />
      </View>
    </RootModal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "500",
    fontStyle: "normal",
  },
  wrapContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemStyle: {
    width: "49%",
    marginBottom: 15,
  },
  btnStyle: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelStyle: {
    width: "25%",
    marginLeft: 10,
    backgroundColor: appColors.red,
  },
});
