import React, { createContext, useState } from 'react'
import { Producto } from '../interfaces/appInterdaces';

type ProductsContesProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<void>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>;
}


export const ProductsContext = createContext({} as ProductsContesProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    const loadProducts = async () => { };
    const addProduct = async (categoryId: string, productName: string) => { };
    const updateProduct = async (categoryId: string, productName: string, productId: string) => { };
    const deleteProduct = async (id: string) => { };
    const loadProductById = async (id: string) => {
        return {} as Producto;
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