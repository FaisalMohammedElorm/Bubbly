import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { BackButtonProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const Login = ({ 
  backButtonProps = {} 
}: { 
  backButtonProps?: BackButtonProps 
} = {}) => {
  const router = useRouter()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill in all fields.')
      return
    }
    // Good to go
  }
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenWrapper showPattern={true}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={[styles.button, backButtonProps.style]}>
              <AntDesign 
                name="arrowleft" 
                size={backButtonProps.iconSize || 35} 
                color={backButtonProps.color || "white"} 
                style={backButtonProps.style as any}
              />
            </TouchableOpacity>
            <Typo size={16} color={colors.white}>
              Forgot your password?
            </Typo>
          </View>
          <View style={styles.content}>
            <ScrollView 
              contentContainerStyle={styles.form} 
              showsVerticalScrollIndicator={false}
              >
                <View style={{ gap: spacingY._10, marginBottom: spacingY._15}}>
                  <Typo size={28} color={colors.black} fontWeight={'600'}>
                    Welcome back
                  </Typo>
                  <Typo color={colors.neutral600}>
                    We are happy to see you!
                  </Typo>
                </View>
                <Input 
                  placeholder="Enter your email"
                  onChangeText={(value: string) => emailRef.current = value}
                  icon={<AntDesign name="mail" size={verticalScale(25)} color={colors.neutral600} />}
                />
                <Input 
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={(value: string) => passwordRef.current = value}
                  icon={<AntDesign name="lock" size={verticalScale(25)} color={colors.neutral600} />}
                />
                <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                  <Button loading={isLoading} onPress={handleSubmit}>
                    <Typo fontWeight={'bold'} color={colors.black} size={20}>Login</Typo>
                  </Button>
                  <View style={styles.footer}>
                    <Typo color={colors.neutral600}>
                      Don't have an account? 
                    </Typo>
                    <Pressable onPress={() => router.push('/(auth)/register')}>
                      <Typo fontWeight={'bold'} color={colors.primaryDark}>
                        Sign Up
                      </Typo>
                    </Pressable>
                  </View>
                </View>
            </ScrollView>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._25,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._50,
    borderCurve: 'continuous',
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  form: {
    gap: spacingY._20,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }
});
export default Login
