import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function ListaCardapio({ navigation, route }) {

  const navigateVoltar = () =>{
    navigation.navigate('Home');
  }


  const [cardapios, setCardapios] = useState([])
  const [showModalExcluirCardapio, setShowModalExcluirCardapio] = useState(false)
  const [cardapioASerExcluido, setCardapioASerExcluido] = useState(null)

  useEffect(() => {
    loadCardapios()
  }, [])

  async function loadCardapios() {
    const response = await AsyncStorage.getItem('cardapios');
    console.log("🚀 ~ file: ListaCardapioAsyncStorage.js:21 ~ loadCardapios ~ response:", response)
    const cardapiosStorage = response ? JSON.parse(response) : [];
    setCardapios(cardapiosStorage);
  }

  const showModal = () => setShowModalExcluirCardapio(true);

  const hideModal = () => setShowModalExcluirCardapio(false);

  async function adicionarCardapio(cardapio) {
    let novaListaCardapios = cardapios;
    novaListaCardapios.push(cardapio);
    await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapios));
    setCardapios(novaListaCardapios);
  }

  async function editarCardapio(cardapioAntigo, novosDados) {
    console.log('CARDAPIO ANTIGO -> ', cardapioAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaCardapios = cardapios.map(cardapio => {
      if (cardapio == cardapioAntigo) {
        return novosDados
      } else {
        return cardapio
      }
    })

    await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapios))
    setCardapios(novaListaCardapios)

  }

  async function excluirCardapio(cardapio) {
    const novaListaCardapios = cardapios.filter(c => c !== cardapio)
    await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapios))
    setCardapios(novaListaCardapios)
    Toast.show({
      type: 'success',
      text1: 'Cardapio excluido com sucesso!'
    })
  }

  function handleExluirCardapio() {
    excluirCardapio(cardapioASerExcluido)
    setCardapioASerExcluido(null)
    hideModal()
  }


  return (
    <View style={styles.container}>
      <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      />
      <Text variant='titleLarge' style={styles.title} >CARDAPIO</Text>

      <FlatList
        style={styles.list}
        data={cardapios}
        renderItem={({ item }) => (

        <Card
         mode='outlined'
        style={styles.card}
      >
                <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={{color:'#010101', fontWeight: 'bold', fontSize:18}}>{item?.nome}</Text>

                <Text variant='bodyLarge' style={{color:'#2d2d2d'}}>Descrição: {item?.descricao}</Text>

                <Text variant='bodyLarge' style={{color:'#2d2d2d'}}>Calorias: {item?.calorias} kcal</Text>
                
              </View>
              </Card.Content>

            <Card.Actions>
              <Button style={{color:'#010101', fontWeight: 'bold', fontSize:18}}  onPress={() => navigation.push('FormCardapio', { acao: editarCardapio, cardapio: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setCardapioASerExcluido(item)
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
        onPress={() => navigation.navigate('FormCardapio', { acao: adicionarCardapio })}
      />

<Portal>
        <Dialog visible={showModalExcluirCardapio} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirCardapio}>Tenho Certeza</Button>
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
    fontWeight: 'bold',
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
    backgroundColor:"#9e9e9e",
    
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    marginRight: 10,
  },

  textButton: {
    fontSize: 22,
    color: "#881235",
    fontWeight: "bold",
    alignSelf: "center",
  },
})