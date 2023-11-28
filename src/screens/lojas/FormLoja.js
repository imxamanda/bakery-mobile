import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function FormLoja({ navigation, route }) {
  const { acao, loja: lojaAntiga } = route.params;

  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const validationSchema = Yup.object().shape({
    estado: Yup.string().required('Campo obrigatório'),
    cep: Yup.string().required('Campo obrigatório'),
  });

  useEffect(() => {
    console.log('loja -> ', lojaAntiga);

    if (lojaAntiga) {
      setEstado(lojaAntiga.estado);
      setCep(lojaAntiga.cep);
    }
  }, [lojaAntiga]);

  function salvar(novaLoja) {
    console.log('SALVAR DADOS NA LOJA -> ', novaLoja);

    if (lojaAntiga) {
      acao(lojaAntiga, novaLoja);
    } else {
      acao(novaLoja);
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

      <Text variant='titleLarge' style={styles.title}>
        {lojaAntiga ? 'Editar Loja' : 'Adicionar à Loja'}
      </Text>

      <Formik
        initialValues={{
          estado: '',
          cep: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode='outlined'
                label='Estado'
                value={values.estado}
                onChangeText={handleChange('estado')}
                onBlur={handleBlur('estado')}
              />

              {(touched.estado && errors.estado) && <Text style={{ color: 'black' }}>{errors.estado}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='CEP'
                keyboardType='numeric'
                value={values.cep}
                onChangeText={handleChange('cep')}
                onBlur={handleBlur('cep')}
              />

              {(touched.cep && errors.cep) && <Text style={{ color: 'black' }}>{errors.cep}</Text>}
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button1}
                mode='contained-tonal'
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: '#881235', fontWeight: 'bold', fontSize: 20 }}>Voltar</Text>
              </Button>

              <Button
                style={styles.button}
                mode='contained'
                onPress={handleSubmit}
              >
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
});
