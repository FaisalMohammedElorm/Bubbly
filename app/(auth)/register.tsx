import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'

const Register = () => {
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>Register</Typo>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({

})
export default Register
