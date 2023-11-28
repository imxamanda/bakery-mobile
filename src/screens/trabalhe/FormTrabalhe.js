import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function FormTrabalhe({ navigation, route }) {
  const { acao, trabalhe: trabalheAntigo } = route.params;

  console.log(trabalheAntigo)

  const [nome, setNome] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    escolaridade: Yup.string().required('Campo obrigatório'),
    dataNascimento: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().required('Campo obrigatório'),
  });

  useEffect(() => {
    if (trabalheAntigo) {
      setNome(trabalheAntigo.nome);
      setEscolaridade(trabalheAntigo.escolaridade);
      setDataNascimento(trabalheAntigo.dataNascimento);
      setEmail(trabalheAntigo.email);
      setTelefone(trabalheAntigo.telefone);
    }
  }, []);

  function salvar(novoTrabalhe) {
    if (trabalheAntigo) {
      acao(trabalheAntigo, novoTrabalhe);
    } else {
      acao(novoTrabalhe);
    }

    Toast.show({
      type: 'success',
      text1: 'Item salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />

      <Text variant="titleLarge" style={styles.title}>
        {trabalheAntigo ? 'Editar Trabalhe' : 'Adicionar ao Trabalhe'}
      </Text>

      <Formik
        initialValues={{
          nome: nome,
          escolaridade: escolaridade,
          dataNascimento: dataNascimento,
          email: email,
          telefone: telefone,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />

              {touched.nome && errors.nome && <Text style={{ color: 'black' }}>{errors.nome}</Text>}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Escolaridade"
                value={values.escolaridade}
                onChangeText={handleChange('escolaridade')}
                onBlur={handleBlur('escolaridade')}
              />

              {touched.escolaridade && errors.escolaridade && (
                <Text style={{ color: 'black' }}>{errors.escolaridade}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Data de Nascimento"
                value={values.dataNascimento}
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                render={props => 
                <TextInputMask
                  {...props}
                  type={'datetime'}
                />
                }
              />

              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={{ color: 'black' }}>{errors.dataNascimento}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />

              {touched.email && errors.email && <Text style={{ color: 'black' }}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Telefone"
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                render={props => 
                  <TextInputMask
                    {...props}
                    type={'cel-phone'}
                  />
                  }
              />

              {touched.telefone && errors.telefone && <Text style={{ color: 'black' }}>{errors.telefone}</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <Button style={styles.button1} mode="contained-tonal" onPress={() => navigation.goBack()}>
                <Text style={{ color: '#881235', fontWeight: 'bold', fontSize: 20 }}>Voltar</Text>
              </Button>

              <Button style={styles.button} mode="contained" onPress={handleSubmit}>
                <Text style={{ color: '#881235', fontWeight: 'bold', fontSize: 20 }}>Salvar</Text>
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
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
  logo:{
    width: 400,
    height: 50,
  },
  })