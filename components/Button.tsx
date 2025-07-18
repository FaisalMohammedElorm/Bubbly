import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Loading from '@/components/Loading'

const Button = ({
  style,
  onPress,
  children,
  loading=false,
}: ButtonProps) => {
  if(loading) {
    return (
      <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
        <Loading />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
     {children}
    </TouchableOpacity>
  )
}
        

const styles = StyleSheet.create({
  button:{
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    borderCurve: 'continuous',
    height: verticalScale(56),
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Button
