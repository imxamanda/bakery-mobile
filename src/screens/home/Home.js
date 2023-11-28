import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av';


const Home = ({navigation}) => {

  const navigateSouCLi = () =>{
    navigation.navigate('SouCLi');
  }

  const navigateSouFun = () =>{
    navigation.navigate('SouFun');
  }

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  
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
          
          <Video
          ref={video}
          style={styles.video}
          source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="{ResizeMode.STRETCH}"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttonv}>
        <Button 
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
        </View>


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
  buttonv: {
    backgroundColor: "#650d27",
    borderRadius: 100,
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
    marginBottom: 20
  },

  textButton: {
    fontSize: 20,
    color: "#881235",
    fontWeight: "bold",
    alignSelf: "center",
  },
  // video:{
  //   width: 380,
  //   height: 200,

  // }

})
