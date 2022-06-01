import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/loginTheme'
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange, name } = useForm({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Registro incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }]);
    }, [errorMessage])

    const onLogin = () => {
        console.log({ email, password, name });
        Keyboard.dismiss();// para esconder o teclado
        signUp({ correo: email, password, nombre: name });
    }

    return (
        <>

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6',
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={loginStyles.formContainer}>
                    <WhiteLogo />
                    <Text style={loginStyles.title}>Register</Text>

                    <Text style={loginStyles.label}>Name:</Text>
                    <TextInput
                        placeholder='Ingrese name'
                        placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor={'rgba(255, 255, 255, 0.4)'}
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onLogin}
                        autoCapitalize='words'
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        placeholder='Ingrese email'
                        placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
                        keyboardType='email-address'
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor={'rgba(255, 255, 255, 0.4)'}
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        placeholder='Ingrese Password'
                        placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
                        underlineColorAndroid={'white'}
                        secureTextEntry={true}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor={'rgba(255, 255, 255, 0.4)'}
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Boton Login */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Atras */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.replace('Login')}
                        style={loginStyles.backButton}
                    >
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
