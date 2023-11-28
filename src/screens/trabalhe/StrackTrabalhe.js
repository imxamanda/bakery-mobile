import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListaTrabalhe from './ListaTrabalhe'
import FormTrabalhe from './FormTrabalhe'

const Stack = createStackNavigator()
export default function StackTrabalhe() {
  return (
   <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ListaTrabalhe'
   >

    <Stack.Screen name='ListaTrabalhe' component={ListaTrabalhe}/>
    <Stack.Screen name='FormTrabalhe' component={FormTrabalhe}/>

   </Stack.Navigator>
  )
}
