import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, FAB } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ListaCardapio({ navigation, route }) {

  const [cardapio, setCardapio] = useState([]);
    useEffect(() => {
      loadCardapio();
    }, []);

    async function loadCardapio() {
      const response = await AsyncStorage.getItem('cardapios');
      const cardapioStorage = response ? JSON.parse(response) : [];
      setCardapio(cardapioStorage);
    }

    async function adicionarCardapio(cardapio) {
      let novaListaCardapio = cardapio;
      novaListaCardapio.push(cardapio);
      await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapio));
      setCardapio(novaListaCardapio);
    }

    async function editarCardapio(cardapioAntigo, novosDados) {

      const novaListaCardapio = cardapio.map(cardapio => {
        if (cardapio === cardapioAntigo) {
          return novosDados;
        } else {
          return cardapio;
        }
      });

      await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapio));
      setCardapio(novaListaCardapio);
    }

    async function excluirCardapio(cardapio) {
      const novaListaCardapio = cardapio.filter(item => item !== cardapio);
      await AsyncStorage.setItem('cardapios', JSON.stringify(novaListaCardapio));
      setCardapio(novaListaCardapio);
      Toast.show({
        type: 'success',
        text1: 'Ítem excluído com sucesso!',
      });
    }



  return (
    <View style={styles.container}>
      <Text  variant='titleLarge' style={styles.title} >Cardápio</Text>
      <FlatList
        style={styles.list}
        data={cardapio}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
            style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
              <Text variant='titleMedium'>{item?.nome}</Text>
              <Text variant='bodyLarge'>Descrição: {item?.descricao}</Text>
              <Text variant='bodyLarge'>Calorias: {item?.calorias}</Text>
              <Text variant='bodyLarge'>Data: {item.data}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
                  <Button onPress={() => navigation.push('FormCardapio', { acao: editarCardapio, cardapio: item })}>
                    Editar
                  </Button>
                  <Button onPress={() => excluirCardapio(item)}>
                    Excluir
                  </Button>
                </Card.Actions>
          </Card>
        )}       
      />
       <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.push('FormCardapio', { acao: adicionarCardapio })}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})