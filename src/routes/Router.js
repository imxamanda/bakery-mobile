import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/home/Home'
import SouFun from '../screens/soufuncionario/SouFun'
import SouCli from '../screens/soucliente/SouCli'

const Stack = createStackNavigator()
export default function StackRouter() {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false }}initialRouteName='Home'>
         <Stack.Screen name='Home' component={Home}/>

         <Stack.Screen name='SouFun' component={SouFun}/>

         <Stack.Screen name='SouCLi' component={SouCli}/>
         

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})