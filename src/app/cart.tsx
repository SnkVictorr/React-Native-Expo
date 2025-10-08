import { Text, View, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'

export default function CarrinhoScreen(){
    return (
      <View>
        <Image source={require('@/assets/images/logo-gold.png')} style={styles.image}/>
        <Text>Carrinho</Text>
      </View>
    )
  }


  const styles = StyleSheet.create({
    image:{   
      width: 80,
      height: 80,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 50
    }
  })