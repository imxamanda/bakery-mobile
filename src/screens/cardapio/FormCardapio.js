import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'



export default function FormCardapio({ navigation, route }) {

  const { acao, cardapio: cardapioAntigo } = route.params

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [calorias, setCalorias] = useState(0);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    descricao: Yup.string().required('Campo obrigatório'),
    calorias: Yup.string().required('Campo obrigatório'),
})

useEffect(() => {

  console.log('cardapio -> ', cardapioAntigo)

  if (cardapioAntigo) {
      setNome(cardapioAntigo.nome)
      setDescricao(cardapioAntigo.descricao)
      setCalorias(cardapioAntigo.calorias)
  }

}, [])


function salvar(novoCardapio) {
  console.log('SALVAR DADOS NO CARDAPIO -> ', novoCardapio)

  if (cardapioAntigo) {
      acao(cardapioAntigo, novoCardapio)
  } else {
      acao(novoCardapio)
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

    <Text variant='titleLarge' style={styles.title} >{cardapioAntigo ? 'Editar Cardapio' : 'Adicionar ao Cardapio'}</Text>

    <Formik
    initialValues={{
     nome: '',
     descricao: '',
     calorias: ''
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
      label='Descrição'
      value={values.descricao}
      onChangeText={handleChange('descricao')}
      onBlur={handleBlur('descricao')}
    />

{(touched.descricao && errors.descricao) && <Text style={{ color: 'black' }}>{errors.descricao}</Text>}

    <TextInput
      style={styles.input}
      mode='outlined'
      label='Calorias'
      keyboardType='numeric'
      value={values.calorias}
      onChangeText={handleChange('calorias')}
      onBlur={handleBlur('calorias')}
    /> 

    {(touched.calorias && errors.calorias) && <Text style={{ color: 'black' }}>{errors.calorias}</Text>}

    </View>
    <View style={styles.buttonContainer}>
      
    <Button
      style={styles.button1}
      mode='contained-tonal'
      onPress={() => navigation.goBack()}
    >
      <Text style={{color:'#881235', fontWeight: "bold", fontSize: 20}}>Voltar</Text>
    </Button>

    <Button
      style={styles.button}
      mode='contained'
      onPress={handleSubmit}
    >
      <Text style={{color:'#881235', fontWeight: "bold", fontSize: 20 }}>Salvar</Text>
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
logo:{
  width: 400,
  height: 50,
},
})