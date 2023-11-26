import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function FormCardapio({navigation}) {

  const { acao, cardapio: cardapioAntigo } = route.params;

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [calorias, setCalorias] = useState('')
  const [data, setData] = useState('')

  const [showMensagemErro, setShowMensagemErro] = useState(false)

  useEffect(() => {
    if (cardapioAntigo) {
      setNome(cardapioAntigo.nome)
      setDescricao(cardapioAntigo.descricao)
      setCalorias(cardapioAntigo.calorias)
      setData(cardapioAntigo.data)
    }
  }, [])

  function salvar() {
    if (nome === '' || descricao === '' || calorias === '' || data === '') {
      setShowMensagemErro(true)
  } else {
      setShowMensagemErro(false)

      const cardapioNovo = {
        nome: nome,
        descricao: descricao,
        calorias: calorias,
        data: data
      }

      if (cardapioNovo) {
        acao(cardapioAntigo, cardapioNovo)
      } else {
        acao(cardapioNovo)
      }
      
      Toast.show({
        type: 'success',
        text1: 'Cardápio salvo com sucesso!'
       })

       navigation.goBack()
    }
  }





  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>
      {cardapioAntigo ? 'Editar Cardápio' : 'Adicionar ao Cardápio'}
      </Text>

      <View>
      <TextInput
         style={styles.input}
         label={'Nome'}
         mode='outlined'
         value={nome}
         onChangeText={text => setNome(text)}
      />
      <TextInput
         style={styles.input}
         label={'Descrição'}
         mode='outlined'
         value={descricao}
         onChangeText={text => setDescricao(text)}
      />
      <TextInput
         style={styles.input}
         label={'Calorias'}
         mode='outlined'
         keyboardType='numeric'
         value={calorias}
         onChangeText={text => setCalorias(text)}
      />
      <TextInput
         style={styles.input}
         label={'Data'}
         mode='outlined'
         keyboardType='date'
         value={data}
         onChangeText={text => setData(text)}
      />

        {showMensagemErro && (
     <Text style={{ color: 'red', textAlign: 'center' }}>
        Preencha todos os campos!
       </Text>
       )}
      </View>

      <View>
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
          onPress={salvar}
        >
        Salvar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
input: {
  marginBottom: 10,
},
button: {
  marginTop: 10,
},
})