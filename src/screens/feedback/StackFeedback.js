import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListaFeedback from './ListaFeedback'
import FormFeedback from './FormFeedback'


const Stack = createStackNavigator()
export default function StackFeedback() {
  return (
   <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='ListaFeedback'
   >

    <Stack.Screen name='ListaFeedback' component={ListaFeedback}/>
    <Stack.Screen name='FormFeedback' component={FormFeedback}/>

   </Stack.Navigator>
  )
}
