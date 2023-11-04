import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText, SimpleButton } from "../../components";
import InputWithLabel from "../../components/InputWithLabel";
import { userType } from "../../types";
import { appColors } from "../../utils";
import { RootModal } from "./components";
import { useFormModal } from "./logic";

interface IFromModal {
  onCloseModal: () => void;
  onSaveUser: (value: userType) => void;
}

const FormModal = (props: IFromModal) => {
  const hooks = useFormModal(props);

  let formItem = [
    { lbl: "FullName", placeholder: "FullName", identifier: "fullName" },
    { lbl: "Mobile", placeholder: "Mobile", identifier: "mobile" },
    { lbl: "Email", placeholder: "Email", identifier: "email" },
    { lbl: "Address", placeholder: "Address", identifier: "address" },
  ];

  return (
    <RootModal>
      <AppText label="Add User Info" lblStyle={styles.titleStyle} />

      <View style={styles.wrapContainer}>
        {formItem.map((el, index) => {
          return (
            <InputWithLabel
              key={index}
              label={el.lbl}
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
          label="Save"
          onPress={hooks.passUserInfo}
          btnStyle={{ width: "25%" }}
        />

        <SimpleButton
          label="Cancel"
          btnStyle={styles.cancelStyle}
          onPress={props.onCloseModal}
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
