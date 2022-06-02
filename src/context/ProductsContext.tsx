import React, { createContext, useEffect, useState } from 'react'
import cafeApi from '../api/cafeApi';
import { Producto, ProductsResponse } from '../interfaces/appInterdaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type ProductsContesProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>;
}


export const ProductsContext = createContext({} as ProductsContesProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);


    const loadProducts = async () => {
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        //setProducts([...products, ...resp.data.productos]);
        setProducts([...resp.data.productos]);
    };

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No hay token');
            const resp = await cafeApi.post<Producto>('/productos', {
                categoria: categoryId,
                nombre: productName,
            }, {
                headers: {
                    'x-token': token,
                }
            });

            setProducts([...products, resp.data]);

            return resp.data;

        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No hay token');
            const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
                categoria: categoryId,
                nombre: productName,
            }, {
                headers: {
                    'x-token': token,
                }
            });

            setProducts(
                products.map(product => product._id === productId ? resp.data : product)
            );
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    const deleteProduct = async (id: string) => {

    };

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };

    const uploadImage = async (data: any, id: string) => { };


    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}
