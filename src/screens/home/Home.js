import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'


const Home = ({navigation}) => {

  const navigateSouCLi = () =>{
    navigation.navigate('SouCLi');
  }

  const navigateSouFun = () =>{
    navigation.navigate('SouFun');
  }
  
  return (
    <View style={styles.container}>
      <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      />
      <Image
      source={require('../../../assets/banner.png')}
      style={styles.banner}
      />

      <Text style={{fontSize:20,color:'white', alignItems: 'center', marginTop:20, marginBottom:50  }}>BEM VINDO À CARLO'S BAKERY</Text>

      <TouchableOpacity 
              style={styles.button}
              onPress={navigateSouCLi}
      >  
            <Text style={styles.textButton}>Sou Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.button}
          onPress={navigateSouFun}
           >
            <Text style={styles.textButton}>Sou Funcionário</Text>
          </TouchableOpacity>
          


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#881235',
    alignItems: 'center'
  },
  banner:{
    width: 400,
    height: 200,
    marginTop:20
  },
  logo:{
    width: 400,
    height: 50,
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
