import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListaLoja from './ListaLoja'
import FormLoja from './FormLoja'


const Stack = createStackNavigator()
export default function StackLoja() {
  return (
   <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ListaLoja'
   >

    <Stack.Screen name='ListaLoja' component={ListaLoja}/>
    <Stack.Screen name='FormLoja' component={FormLoja}/>

   </Stack.Navigator>
  )
}
