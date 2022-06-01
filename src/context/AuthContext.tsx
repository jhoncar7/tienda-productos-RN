import React, { createContext, useReducer, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';
import { LoginData, LoginResponse, Usuario, RegisterData } from '../interfaces/appInterdaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'cheking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'cheking',
    token: null,
    errorMessage: '',
    user: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        // no Token, no autnenticado
        if (!token) return dispatch({ type: 'notAuthenticated' });

        //hay token
        const resp = await cafeApi.get('/auth', {
            headers: {
                'x-token': token
            }
        });
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.token); // renovacion token, nueva vigencia

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            }
        });
    }

    const signIn = async ({ correo, password }: LoginData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
            console.log(resp.data);
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                }
            });

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (err: any) {
            console.log(err.response.data);
            dispatch({
                type: 'addError',
                payload: err.response.data.msg || 'Informacion Incorrecta'
            })
        }
    };
    const signUp = async ({ correo, password, nombre }: RegisterData) => {

        try {
            const resp = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre });
            console.log(resp.data);
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                }
            });

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (err: any) {
            console.log(err.response.data);
            dispatch({
                type: 'addError',
                payload: err.response.data.errors[0].msg || 'EL email ya esta registrado'
            })
        }

    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,

        }}>
            {children}
        </AuthContext.Provider>
    )
}