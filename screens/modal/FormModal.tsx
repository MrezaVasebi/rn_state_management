import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { AppText, SimpleButton } from "../../components";
import InputWithLabel from "../../components/InputWithLabel";
import { userType } from "../../types";
import { appColors } from "../../utils";
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
    <Modal transparent statusBarTranslucent animationType="fade">
      <View style={styles.root}>
        <View style={styles.innerStyle}>
          <AppText label="Add User Info" lblStyle={styles.titleStyle} />

          <View style={styles.wrapCOntainer}>
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
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  titleStyle: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "500",
    fontStyle: "normal",
  },
  wrapCOntainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemStyle: {
    width: "49%",
    marginBottom: 15,
  },
  innerStyle: {
    padding: 20,
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: appColors.white,
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
