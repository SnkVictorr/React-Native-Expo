import { Text, View, Image } from 'react-native'
import React from 'react'

export default function CarrinhoScreen(){
    return (
      <View>
        <Image source={require('@/assets/images/logo-gold.png')} />
        <Text>Carrinho</Text>
      </View>
    )
  }
