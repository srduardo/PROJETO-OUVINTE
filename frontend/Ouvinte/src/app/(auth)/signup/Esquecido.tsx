import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../../../../constants/styles';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser } from '../../services/api';
import { UserRequest } from '../../types/UserRequest';
import { router } from 'expo-router';


export default function Esquecido() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    async function handleResetPassword() {
        if (email === "" || password === "" || confirmPassword === "") {
            Alert.alert("Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("As senhas estão diferentes!");
            return;
        }

        if (password.length < 6) {
            Alert.alert("A senha deve ter pelo menos 6 caracteres!");
            return;
        }
        const user: UserRequest = {username: 'Usuário', email: email, password: password };
        user.password = password;
        await updateUser(user);

        await AsyncStorage.setItem('userCredentials', JSON.stringify(user));
        console.log(user);
        router.push('/');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1', padding: 20 }}>
                <Text style={{ fontSize: 60, fontWeight: 'bold', margin: 'auto', marginTop: '10%'}}>Defina sua</Text>
                <Text style={{ fontSize: 60, fontWeight: 'bold', margin: 'auto', marginBottom: '5%'}}>nova senha!</Text>
                <View style={styles.container}>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="E-mail de usuário"
                            keyboardType="email-address"
                            autoComplete="email"
                            value={email}
                            onChangeText={setEmail}>
                        </TextInput>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="Nova senha"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}>
                        </TextInput>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.formInput}
                            placeholder="Confirme a senha"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}>
                        </TextInput>
                    </View>

                    <TouchableOpacity style={styles.formButton} onPress={handleResetPassword} >
                        <Text style={styles.textButton}>Alterar</Text>
                    </TouchableOpacity>

                    <Image style={{ marginHorizontal: 'auto', marginTop: '30%' }} source={require('../../../../assets/img/logo-texto.png')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}