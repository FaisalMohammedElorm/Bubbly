import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'

const Welcome = () => {
  return (
    <ScreenWrapper showPattern={true}>
      <Typo color={colors.white}>Welcome</Typo>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({

})

export default Welcome
