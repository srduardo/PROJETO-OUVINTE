import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../../../constants/styles';
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { signUpUser } from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRequest } from '../../types/UserRequest';
import { UserResponse } from '../../types/UserResponse';


export default function Cadastro() {
    const [username, setUsermame] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSignUp() {
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            setError("Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas estão diferentes!");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        setLoading(true);

        const user: UserRequest = {username: username, email: email, password: password };
        signUpUser(user);

        setLoading(false);
        router.replace('/')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1', padding: 20 }}>
                <View style={styles.container}>

                    <Text style={{ fontSize: 60, fontWeight: 'bold', marginRight: '50%', marginTop: '5%' }}>Vamos</Text>
                    <Text style={{ fontSize: 60, fontWeight: 'bold', marginBottom: '5%' }}>começar! </Text>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="Nome de usuário"
                            value={username}
                            onChangeText={setUsermame}
                        />
                        <Icon name="user" size={20} color="black" style={{ marginRight: 5 }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="E-mail de usuário"
                            keyboardType="email-address"
                            autoComplete="email"
                            value={email}
                            onChangeText={setEmail}>
                        </TextInput>
                        <Icon name="mail" size={20} color="black" style={{ marginRight: 5 }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="Senha de usuário"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry>
                        </TextInput>
                        <Icon name="lock" size={20} color="black" style={{ marginRight: 5 }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="Confirme a senha"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <Icon name="lock" size={20} color="black" style={{ marginRight: 5 }} />
                    </View>

                    <TouchableOpacity style={styles.formButton} onPress={handleSignUp}>
                        <Text style={styles.textButton}>Registrar-se</Text>
                    </TouchableOpacity>

                    <Image style={{ marginHorizontal: 'auto', marginTop: '15%' }} source={require('../../../../assets/img/logo-texto.png')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}