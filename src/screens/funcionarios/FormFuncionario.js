import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function FormFuncionario({ navigation, route }) {

  const { acao, funcionario: funcionarioAntigo } = route.params

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [loja, setLoja] = useState(0);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    cargo: Yup.string().required('Campo obrigatório'),
    loja: Yup.string().required('Campo obrigatório'),
  })

  useEffect(() => {
    console.log('funcionario -> ', funcionarioAntigo)

    if (funcionarioAntigo) {
      setNome(funcionarioAntigo.nome)
      setCargo(funcionarioAntigo.cargo)
      setLoja(funcionarioAntigo.loja)
    }

  }, [])


  function salvar(novoFuncionario) {
    console.log('SALVAR DADOS NO FUNCIONÁRIO -> ', novoFuncionario)

    if (funcionarioAntigo) {
      acao(funcionarioAntigo, novoFuncionario)
    } else {
      acao(novoFuncionario)
    }

    Toast.show({
      type: 'success',
      text1: 'Item salvo com sucesso!'
    })

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
      />

      <Text variant='titleLarge' style={styles.title} >{funcionarioAntigo ? 'Editar Funcionário' : 'Adicionar ao Funcionário'}</Text>

      <Formik
        initialValues={{
          nome: '',
          cargo: '',
          loja: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => salvar(values)}
      >

        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode='outlined'
                label='Nome'
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />

              {(touched.nome && errors.nome) && <Text style={{ color: 'black' }}>{errors.nome}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Cargo'
                value={values.cargo}
                onChangeText={handleChange('cargo')}
                onBlur={handleBlur('cargo')}
              />

              {(touched.cargo && errors.cargo) && <Text style={{ color: 'black' }}>{errors.cargo}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Loja'
                keyboardType='numeric'
                value={values.loja}
                onChangeText={handleChange('loja')}
                onBlur={handleBlur('loja')}
              />

              {(touched.loja && errors.loja) && <Text style={{ color: 'black' }}>{errors.loja}</Text>}

            </View>
            <View style={styles.buttonContainer}>

              <Button
                style={styles.button1}
                mode='contained-tonal'
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: '#881235', fontWeight: "bold", fontSize: 20 }}>Voltar</Text>
              </Button>

              <Button
                style={styles.button}
                mode='contained'
                onPress={handleSubmit}
              >
                <Text style={{ color: '#881235', fontWeight: "bold", fontSize: 20 }}>Salvar</Text>
              </Button>

            </View>

          </>

        )}
      </Formik>

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
  inputContainer: {
    width: '90%',
    flex: 1
  },
  input: {
    margin: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#c9c9c9",
    borderRadius: 100,
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
    marginBottom: 20,
  },
  button1: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
    marginBottom: 20,
    color: "#881235",
    marginLeft: 15,
    marginRight: 10
  },
  textButton: {
    fontSize: 22,
    color: "#881235",
    fontWeight: "bold",
    alignSelf: "center",
  },
  logo: {
    width: 400,
    height: 50,
  },
})
