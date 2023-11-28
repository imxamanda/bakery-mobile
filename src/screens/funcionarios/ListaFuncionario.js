import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ListaFuncionario({ navigation, route }) {

  const navigateVoltar = () => {
    navigation.navigate('Home');
  }

  const [funcionarios, setFuncionarios] = useState([]);
  const [showModalExcluirFuncionario, setShowModalExcluirFuncionario] = useState(false);
  const [funcionarioASerExcluido, setFuncionarioASerExcluido] = useState(null);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const response = await AsyncStorage.getItem('funcionarios');
    const funcionariosStorage = response ? JSON.parse(response) : [];
    setFuncionarios(funcionariosStorage);
  }

  const showModal = () => setShowModalExcluirFuncionario(true);

  const hideModal = () => setShowModalExcluirFuncionario(false);

  async function adicionarFuncionario(funcionario) {
    let novaListaFuncionarios = funcionarios;
    novaListaFuncionarios.push(funcionario);
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function editarFuncionario(funcionarioAntigo, novosDados) {
    const novaListaFuncionarios = funcionarios.map(funcionario => {
      if (funcionario === funcionarioAntigo) {
        return novosDados;
      } else {
        return funcionario;
      }
    });

    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function excluirFuncionario(funcionario) {
    const novaListaFuncionarios = funcionarios.filter(f => f !== funcionario);
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
    Toast.show({
      type: 'success',
      text1: 'Funcionário excluído com sucesso!'
    });
  }

  function handleExcluirFuncionario() {
    excluirFuncionario(funcionarioASerExcluido);
    setFuncionarioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />
      <Text variant='titleLarge' style={styles.title} >FUNCIONÁRIOS</Text>

      <FlatList
        style={styles.list}
        data={funcionarios}
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
                <Text variant='bodyLarge' style={{ color: '#2d2d2d' }}>Cargo: {item?.cargo}</Text>
                <Text variant='bodyLarge' style={{ color: '#2d2d2d' }}>Loja: {item?.loja}</Text>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button style={{ color: '#010101', fontWeight: 'bold', fontSize: 18 }} onPress={() => navigation.push('FormFuncionario', { acao: editarFuncionario, funcionario: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setFuncionarioASerExcluido(item);
                showModal();
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
        onPress={() => navigation.navigate('FormFuncionario', { acao: adicionarFuncionario })}
      />

      <Portal>
        <Dialog visible={showModalExcluirFuncionario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirFuncionario}>Tenho Certeza</Button>
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
    backgroundColor: "#650d27",
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
  logo: {
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
});