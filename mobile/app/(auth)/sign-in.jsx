import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {authStyles} from  "../../assets/styles/auth.styles"
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { COLORS } from '../../constants/colors';

const SignIn = () => {

  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () =>{
    if (!email || !password){
      Alert.alert("Error","Please fill all fields")
    }

    if(!isLoaded) return;

    setLoading(true);

    try {
      const signInAttempt =  await signIn.create({
        identifier :email,
        password
      })

      if (signInAttempt.status === "complete"){
        await setActive({session:signInAttempt.createdSessionId})
      }
      else{
        Alert.alert("Error","Sign in failed. Please try again")
      }

    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Sign In Failed")
    } finally{
      setLoading(false);
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "ios" ?"padding" :"height"}
        keyboardVerticalOffset={Platform.OS=== "ios"? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image 
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit='contain'
            />
          </View>
          <Text style={authStyles.title}>Welcome Back</Text>

          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder='Enter Email'
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize="none"
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder='Enter Password'
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
               <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
               />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ?"Signing In..." :"Sign In"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push ("/(auth)/sign-up")}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text Text style={authStyles.link}>Sign Up</Text>
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignIn