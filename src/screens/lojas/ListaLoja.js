import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaLoja({ navigation, route }) {

  const navigateVoltar = () =>{
    navigation.navigate('Home');
  }


  const [lojas, setLojas] = useState([])
  const [showModalExcluirLoja, setShowModalExcluirLoja] = useState(false)
  const [lojaASerExcluido, setLojaASerExcluido] = useState(null)

  useEffect(() => {
    loadLojas()
  }, [])

  async function loadLojas() {
    const response = await AsyncStorage.getItem('lojas');
    console.log("🚀 ~ file: ListaLojaAsyncStorage.js:21 ~ loadLojas ~ response:", response)
    const lojasStorage = response ? JSON.parse(response) : [];
    setLojas(lojasStorage);
  }

  const showModal = () => setShowModalExcluirLoja(true);

  const hideModal = () => setShowModalExcluirLoja(false);

  async function adicionarLoja(loja) {
    let novaListaLojas = lojas;
    novaListaLojas.push(loja);
    await AsyncStorage.setItem('lojas', JSON.stringify(novaListaLojas));
    setLojas(novaListaLojas);
  }

  async function editarLoja(lojaAntigo, novosDados) {
    console.log('LOJA ANTIGA -> ', lojaAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaLojas = lojas.map(loja => {
      if (loja == lojaAntigo) {
        return novosDados
      } else {
        return loja
      }
    })

    await AsyncStorage.setItem('lojas', JSON.stringify(novaListaLojas))
    setLojas(novaListaLojas)

  }

  async function excluirLoja(loja) {
    const novaListaLojas = lojas.filter(c => c !== loja)
    await AsyncStorage.setItem('lojas', JSON.stringify(novaListaLojas))
    setLojas(novaListaLojas)
    Toast.show({
      type: 'success',
      text1: 'Loja excluida com sucesso!'
    })
  }

  function handleExluirLoja() {
    excluirLoja(lojaASerExcluido)
    setLojaASerExcluido(null)
    hideModal()
  }
  


  return (
    <View style={styles.container}>
      <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      />
      <Text variant='titleLarge' style={styles.title} >LOJA</Text>

      <FlatList
        style={styles.list}
        data={lojas}
        renderItem={({ item }) => (

        <Card
         mode='outlined'
        style={styles.card}
      >
                <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>

                <Text variant='bodyLarge' style={{color:'#2d2d2d'}}>Estado: {item?.descricao}</Text>

                <Text variant='bodyLarge' style={{color:'#2d2d2d'}}>CEP: {item?.calorias} </Text>
                
              </View>
              </Card.Content>

            <Card.Actions>
              <Button style={{color:'#010101', fontWeight: 'bold', fontSize:18}}  onPress={() => navigation.push('FormLoja', { acao: editarLoja, loja: item })}>
                Editar
              </Button>
              <Button  onPress={() => {
                setLojaASerExcluido(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

     <FAB
        icon="plus"
        style={styles.fab}
        color="#881235"
        onPress={() => navigation.navigate('FormLoja', { acao: adicionarLoja })}
      />

<Portal>
        <Dialog visible={showModalExcluirLoja} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirLoja}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <TouchableOpacity 
              style={styles.button}
              onPress={navigateVoltar}
      >  
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#881235'
  },
  title: {
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
    backgroundColor:"#650d27",
    
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
    borderBlockColor: '#881235'
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
    width: 100,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 15,
    
  },

  textButton: {
    fontSize: 20,
    color: "#881235",
    fontWeight: "bold",
    alignSelf: "center",
  },
})