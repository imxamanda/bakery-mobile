import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/home/Home'
import SouFun from '../screens/soufuncionario/SouFun'
import SouCli from '../screens/soucliente/SouCli'
import StackCardapio from '../screens/cardapio/StackCardapio'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()
export default function StackRouter() {
  return (
    <Drawer.Navigator 
    screenOptions={{ headerShown: false }}initialRouteName='Home'>
         <Drawer.Screen name='Home' component={Home}/>

         <Drawer.Screen name='SouFun' component={SouFun}/>

         <Drawer.Screen name='SouCLi' component={SouCli}/>

         <Drawer.Screen name='Cardapio' component={StackCardapio}/>
         

    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})