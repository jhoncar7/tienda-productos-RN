import React from 'react'
import { View } from 'react-native'

export const Background = () => {
  return (
    <View
        style={{
            width: 1000,
            height: 1200,
            top:-450,
            backgroundColor:'#5856d6',
            position: 'absolute',
            transform:[
                {rotate: '-70deg'},
            ]
        }}
    />
  )
}
