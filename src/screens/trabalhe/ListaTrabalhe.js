import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function ListaTrabalhe({ navigation, route }) {
  const navigateVoltar = () => {
    navigation.navigate('Home');
  };

  const [trabalhes, setTrabalhes] = useState([]);
  const [showModalExcluirTrabalhe, setShowModalExcluirTrabalhe] = useState(false);
  const [trabalheASerExcluido, setTrabalheASerExcluido] = useState(null);

  useEffect(() => {
    loadTrabalhes();
  }, []);

  async function loadTrabalhes() {
    const response = await AsyncStorage.getItem('trabalhes');
    const trabalhesStorage = response ? JSON.parse(response) : [];
    setTrabalhes(trabalhesStorage);
  }

  const showModal = () => setShowModalExcluirTrabalhe(true);
  const hideModal = () => setShowModalExcluirTrabalhe(false);

  async function adicionarTrabalhe(trabalhe) {
    let novaListaTrabalhes = trabalhes;
    novaListaTrabalhes.push(trabalhe);
    await AsyncStorage.setItem('trabalhes', JSON.stringify(novaListaTrabalhes));
    setTrabalhes(novaListaTrabalhes);
  }

  async function editarTrabalhe(trabalheAntigo, novosDados) {
    const novaListaTrabalhes = trabalhes.map(trabalhe => (trabalhe === trabalheAntigo ? novosDados : trabalhe));

    await AsyncStorage.setItem('trabalhes', JSON.stringify(novaListaTrabalhes));
    setTrabalhes(novaListaTrabalhes);
  }

  async function excluirTrabalhe(trabalhe) {
    const novaListaTrabalhes = trabalhes.filter(t => t !== trabalhe);
    await AsyncStorage.setItem('trabalhes', JSON.stringify(novaListaTrabalhes));
    setTrabalhes(novaListaTrabalhes);

    Toast.show({
      type: 'success',
      text1: 'Trabalhe excluído com sucesso!',
    });
  }

  function handleExcluirTrabalhe() {
    excluirTrabalhe(trabalheASerExcluido);
    setTrabalheASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text variant="titleLarge" style={styles.title}>
        TRABALHE
      </Text>

      <FlatList
        style={styles.list}
        data={trabalhes}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium" style={{ color: '#010101', fontWeight: 'bold', fontSize: 18 }}>
                  {item?.nome}
                </Text>
                <Text variant="bodyLarge" style={{ color: '#2d2d2d' }}>
                  Escolaridade: {item?.escolaridade}
                </Text>
                <Text variant="bodyLarge" style={{ color: '#2d2d2d' }}>
                  Data de Nascimento: {item?.dataNascimento}
                </Text>
                <Text variant="bodyLarge" style={{ color: '#2d2d2d' }}>
                  Email: {item?.email}
                </Text>
                <Text variant="bodyLarge" style={{ color: '#2d2d2d' }}>
                  Telefone: {item?.telefone}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={{ color: '#010101', fontWeight: 'bold', fontSize: 18 }} onPress={() => navigation.push('FormTrabalhe', { acao: editarTrabalhe, trabalhe: item })}>
                Editar
              </Button>
              <Button
                onPress={() => {
                  setTrabalheASerExcluido(item);
                  showModal();
                }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB icon="plus" style={styles.fab} color="#881235" onPress={() => navigation.navigate('FormTrabalhe', { acao: adicionarTrabalhe })} />

      <Portal>
        <Dialog visible={showModalExcluirTrabalhe} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirTrabalhe}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TouchableOpacity style={styles.button} onPress={navigateVoltar}>
        <Text style={styles.textButton}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#881235',
  },
  title: {
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
    backgroundColor: '#650d27',
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
    borderBlockColor: '#881235',
  },
  logo: {
    width: 400,
    height: 50,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 100,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },

  textButton: {
    fontSize: 20,
    color: '#881235',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
