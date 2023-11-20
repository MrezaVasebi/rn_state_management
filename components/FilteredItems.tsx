import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "./btns";
import { AppText } from "./txts";

const FilteredItems = ({
  count,
  onPressFilter,
}: {
  count: number;
  onPressFilter: (value: boolean) => void;
}) => {
  return (
    <View style={styles.countStyle}>
      <AppText
        lblStyle={{ opacity: 0.7 }}
        label={`User count: ${count.toString()}`}
        // label={`User count: ${usersSize.toString()}`}
      />

      <AppButton onPress={() => onPressFilter(true)}>
        <FontAwesome name="filter" size={20} />
      </AppButton>
    </View>
  );
};

export default FilteredItems;

const styles = StyleSheet.create({
  countStyle: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
