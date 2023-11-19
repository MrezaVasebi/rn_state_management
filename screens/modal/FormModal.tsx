import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, SimpleButton } from "../../components/btns";
import { InputWithLabel } from "../../components/inputs";
import { AppText } from "../../components/txts";
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
    <RootModal title="Add User Info" onPressClose={props.onCloseModal}>
      <View style={styles.wrapContainer}>
        {hooks.formItem.map((el, index) => {
          if (el.identifier === "gender") {
            return (
              <View key={index} style={styles.genderContainer}>
                <AppText label={el.lbl} />

                <View style={{ marginLeft: 15 }}>
                  <RadioButton
                    label={"Male"}
                    circleWidth={15}
                    circleHeight={15}
                    lblStyle={{ fontSize: 15 }}
                    btnStyle={{ marginBottom: 8 }}
                    isSelected={el.value === "male"}
                    onPress={() => hooks.setValues(el.identifier, "male")}
                  />

                  <RadioButton
                    label={"Female"}
                    circleWidth={15}
                    circleHeight={15}
                    lblStyle={{ fontSize: 15 }}
                    isSelected={el.value === "female"}
                    onPress={() => hooks.setValues(el.identifier, "female")}
                  />
                </View>
              </View>
            );
          } else {
            return (
              <InputWithLabel
                key={index}
                value={el.value}
                // label={el.lbl}
                placeholder={el.placeholder}
                rootStyle={{
                  ...styles.itemStyle,
                  width: el.identifier !== "address" ? "49%" : "100%",
                }}
                onChangeText={(value: string) =>
                  hooks.setValues(el.identifier, value)
                }
              />
            );
          }
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
  genderContainer: {
    width: "49%",
    flexDirection: "row",
    alignItems: "center",
  },
});
