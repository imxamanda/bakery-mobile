import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListaCardapio from './ListaCardapio'
import FormCardapio from './FormCardapio'

const Stack = createStackNavigator()
export default function StackCardapio() {
  return (
   <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ListaCardapio'
   >

    <Stack.Screen name='ListaCardapio' component={ListaCardapio}/>
    <Stack.Screen name='FormCardapio' component={FormCardapio}/>

   </Stack.Navigator>
  )
}
