import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';

export type ProductsStackParams = {
    Productos: undefined;
    Producto: { id?: string, name?: string };
}
const Stack = createStackNavigator<ProductsStackParams>();

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'white' },
                headerStyle: {
                    elevation: 0,//android
                    shadowColor: 'transparent',//ios
                },
            }}

        >
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} />

        </Stack.Navigator>
    )
}
