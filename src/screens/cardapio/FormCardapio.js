import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
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
    nome: Yup.string().required(),
    descricao: Yup.string().required(),
    calorias: Yup.string().required(),
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

   <TextInput
      style={styles.input}
      mode='outlined'
      label='Descrição'
      value={values.descricao}
      onChangeText={handleChange('descricao')}
      onBlur={handleBlur('descricao')}
    />

    <TextInput
      style={styles.input}
      mode='outlined'
      label='Calorias'
      value={values.calorias}
      onChangeText={handleChange('calorias')}
      onBlur={handleBlur('calorias')}
    />  
    </View>
    <View style={styles.buttonContainer}>
      
    <Button
      style={styles.button}
      mode='contained-tonal'
      onPress={() => navigation.goBack()}
    >
      Voltar
    </Button>

    <Button
      style={styles.button}
      mode='contained'
      onPress={handleSubmit}
    >
      Salvar
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
    fontWeight: 'bold',
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
    flex: 1
}
})