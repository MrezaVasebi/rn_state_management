import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { appColors } from '../utils'

interface IRootScreen {
  rootStyle?: object
}

const RootScreen = (props: IRootScreen & ViewProps) => {
  return (
    <View style={{ ...styles.rootStyle, ...props.rootStyle }}>
      <StatusBar hidden />
      {props.children}
    </View>
  )
}

export default RootScreen

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: appColors.bgColor,
  },
})
