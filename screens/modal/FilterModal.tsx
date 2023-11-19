import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, SimpleButton } from "../../components/btns";
import { AppText } from "../../components/txts";
import { appColors } from "../../utils";
import { RootModal } from "./components";

interface IFilterModal {
  onPressClose: () => void;
  onSelectFilter: (value: string) => void;
}

const FilterModal = (props: IFilterModal) => {
  const [selectedGender, setSelectedGender] = useState<string>("");

  return (
    <RootModal title="Filter User" onPressClose={props.onPressClose}>
      <AppText label="Choose Gender" lblStyle={styles.titleStyle} />

      <RadioButton
        label="All"
        circleWidth={20}
        circleHeight={20}
        btnStyle={{ marginTop: 10 }}
        isSelected={selectedGender === "all"}
        onPress={() => setSelectedGender("all")}
      />

      <RadioButton
        label="Male"
        circleWidth={20}
        circleHeight={20}
        btnStyle={{ marginTop: 10 }}
        isSelected={selectedGender === "male"}
        onPress={() => setSelectedGender("male")}
      />

      <RadioButton
        label="Female"
        circleWidth={20}
        circleHeight={20}
        btnStyle={{ marginTop: 10 }}
        isSelected={selectedGender === "female"}
        onPress={() => setSelectedGender("female")}
      />

      <View style={styles.btnStyle}>
        <SimpleButton
          label={"Apply"}
          btnStyle={{ width: "25%" }}
          onPress={() => {
            props.onSelectFilter(selectedGender);
            props.onPressClose();
          }}
        />

        <SimpleButton
          label="Cancel"
          onPress={props.onPressClose}
          btnStyle={styles.cancelStyle}
        />
      </View>
    </RootModal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 15,
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
