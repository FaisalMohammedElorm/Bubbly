import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Loading = ({
  size = 'large',
  color = colors.primaryDark,
}: ActivityIndicatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Loading
