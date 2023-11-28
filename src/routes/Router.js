import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/home/Home'
import SouFun from '../screens/soufuncionario/SouFun'
import SouCli from '../screens/soucliente/SouCli'
import StackCardapio from '../screens/cardapio/StackCardapio'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackLoja from '../screens/lojas/StackLoja'
import StackFuncionario from '../screens/funcionarios/StackFuncionario'
import StackTrabalhe from '../screens/trabalhe/StrackTrabalhe'
import ListaFeedback from '../screens/feedback/ListaFeedback'
import StackFeedback from '../screens/feedback/StackFeedback'


const Drawer = createDrawerNavigator()
export default function StackRouter() {
  return (
    <Drawer.Navigator 
    screenOptions={{ headerShown: false }}initialRouteName='Home'>
         <Drawer.Screen name='Home' component={Home}/>

         <Drawer.Screen name='SouFun' component={SouFun}/>

         <Drawer.Screen name='SouCLi' component={SouCli}/>

         <Drawer.Screen name='ListaCardapio' component={StackCardapio}/>

         <Drawer.Screen name='ListaLoja' component={StackLoja}/>

         <Drawer.Screen 
         name='ListaFuncionario' component={StackFuncionario}/>

        <Drawer.Screen 
         name='ListaTrabalhe' component={StackTrabalhe}/>
        
        <Drawer.Screen 
         name='ListaFeedback' component={StackFeedback}/>



         

    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})