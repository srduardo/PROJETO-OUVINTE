import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../../../constants/styles';
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User } from '../../types/User';
import { signUpUser } from '../../services/api';


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
            setError("As senhas não coincidem!");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        setLoading(true);

        const user: User = {username, email, password};
        signUpUser(user);

        setLoading(false);
        router.replace('/')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1' }}>
                <View style={styles.container}>
                    <Image style={styles.img} source={require('../../../../assets/img/OvF.png')}
                    />
                    <Text style={styles.title}>Crie sua conta agora!</Text>

                    <TextInput style={styles.formInput}
                        placeholder="Informe o seu nome"
                        value={username}
                        onChangeText={setUsermame}
                    />

                    <TextInput style={styles.formInput}
                        placeholder="Informe o E-mail"
                        keyboardType="email-address"
                        autoComplete="email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput style={styles.formInput}
                        placeholder="Informe a Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput style={styles.formInput}
                        placeholder="Informe a Senha novamente"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity style={styles.formButton} onPress={handleSignUp}>
                        <Text style={styles.textButton}>Registrar-se</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}