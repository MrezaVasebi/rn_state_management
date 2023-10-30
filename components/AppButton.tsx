import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { appColors } from '../utils'
import AppText from './AppText'

interface IAppButton {
  label: string
  lblStyle?: object
  btnStyle?: object
}

const AppBUtton = (props: TouchableOpacityProps & IAppButton) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} disabled={props.disabled} style={{ ...styles.btnStyle, ...props.btnStyle }}>
      <AppText label={props.label} lblStyle={{ ...styles.llbStyle, ...props.lblStyle }} />
    </TouchableOpacity>
  )
}

export default AppBUtton

const styles = StyleSheet.create({
  btnStyle: {
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.blue,
  },
  llbStyle: {
    color: appColors.white,
  },
})
