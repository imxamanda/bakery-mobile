import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListaFuncionario from './ListaFuncionario'
import FormFuncionario from './FormFuncionario'

const Stack = createStackNavigator()
export default function StackFuncionario() {
  return (
   <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ListaFuncionario'
   >

    <Stack.Screen name='ListaFuncionario' component={ListaFuncionario}/>
    <Stack.Screen name='FormFuncionario' component={FormFuncionario}/>

   </Stack.Navigator>
  )
}
