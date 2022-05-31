import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            <Image
                source={require('../assets/logo.png')}
                //source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'}}
                style={{
                    width: 110,
                    height: 100,
                }}
            />
        </View>
    )
}
