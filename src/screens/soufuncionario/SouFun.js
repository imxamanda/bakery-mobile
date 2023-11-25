import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

const SouFun = ({navigation}) => {

    const navigateVoltar = () =>{
        navigation.navigate('Home');
      }

  return (
    <View style={styles.container}>
        <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      />

      <Image
      source={require('../../../assets/bakery2.png')}
      style={styles.banner}
      
      />
       <Text style={{fontSize:20,color:'white', alignItems: 'center', marginTop:20, marginBottom:50  }}>O QUE VOCÊ PROCURA?</Text>

       <TouchableOpacity 
              style={styles.button}
      >  
            <Text style={styles.textButton}>Nova Loja</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.button}
      >  
            <Text style={styles.textButton}>Adicionar ao Cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.button}
      >  
            <Text style={styles.textButton}>Novo Funcionário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.button}
              onPress={navigateVoltar}
      >  
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>
    </View>
  )
}

export default SouFun

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#881235',
    alignItems: 'center'
  },
  logo:{
    width: 400,
    height: 50,
  },
  banner:{
    width: 400,
    height: 200,
    marginTop:20
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    marginBottom: 20
  },

  textButton: {
    fontSize: 20,
    color: "#881235",
    fontWeight: "bold",
    alignSelf: "center",
  },
})