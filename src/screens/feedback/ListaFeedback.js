import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ListaFeedback({ navigation, route }) {

  const navigateVoltar = () => {
    navigation.navigate('Home');
  }

  const [feedbacks, setFeedbacks] = useState([]);
  const [showModalExcluirFeedback, setShowModalExcluirFeedback] = useState(false);
  const [feedbackASerExcluido, setFeedbackASerExcluido] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  async function loadFeedbacks() {
    const response = await AsyncStorage.getItem('feedbacks');
    console.log("🚀 ~ file: ListaFeedbackAsyncStorage.js:21 ~ loadFeedbacks ~ response:", response)
    const feedbacksStorage = response ? JSON.parse(response) : [];
    setFeedbacks(feedbacksStorage);
  }

  const showModal = () => setShowModalExcluirFeedback(true);

  const hideModal = () => setShowModalExcluirFeedback(false);

  async function adicionarFeedback(feedback) {
    let novaListaFeedbacks = feedbacks;
    novaListaFeedbacks.push(feedback);
    await AsyncStorage.setItem('feedbacks', JSON.stringify(novaListaFeedbacks));
    setFeedbacks(novaListaFeedbacks);
  }

  async function editarFeedback(feedbackAntigo, novosDados) {
    console.log('FEEDBACK ANTIGO -> ', feedbackAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaFeedbacks = feedbacks.map(feedback => {
      if (feedback === feedbackAntigo) {
        return novosDados
      } else {
        return feedback
      }
    })

    await AsyncStorage.setItem('feedbacks', JSON.stringify(novaListaFeedbacks))
    setFeedbacks(novaListaFeedbacks)

  }

  async function excluirFeedback(feedback) {
    const novaListaFeedbacks = feedbacks.filter(f => f !== feedback)
    await AsyncStorage.setItem('feedbacks', JSON.stringify(novaListaFeedbacks))
    setFeedbacks(novaListaFeedbacks)
    Toast.show({
      type: 'success',
      text1: 'Feedback excluído com sucesso!'
    })
  }

  function handleExcluirFeedback() {
    excluirFeedback(feedbackASerExcluido)
    setFeedbackASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      <Text variant='titleLarge' style={styles.title} >FEEDBACKS</Text>

      <FlatList
        style={styles.list}
        data={feedbacks}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={{ color: '#010101', fontWeight: 'bold', fontSize: 18 }}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={{ color: '#2d2d2d' }}>Avaliação: {item?.avaliacao}</Text>
                <Text variant='bodyLarge' style={{ color: '#2d2d2d' }}>Nota: {item?.nota}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={{ color: '#010101', fontWeight: 'bold', fontSize: 18 }} onPress={() => navigation.push('FormFeedback', { acao: editarFeedback, feedback: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setFeedbackASerExcluido(item)
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
        onPress={() => navigation.navigate('FormFeedback', { acao: adicionarFeedback })}
      />

      <Portal>
        <Dialog visible={showModalExcluirFeedback} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirFeedback}>Tenho Certeza</Button>
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