import { Pressable, Text, TextInput, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { styles } from '../../constants/styles';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { User } from './types/User';
import { signInUser } from './services/api';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    const user: User = {username: 'Usuário', email: email, password: password};
    const token = await signInUser(user);
  
    if (!token) {
      Alert.alert("Erro ao efetuar login. Verifique suas credenciais.");
      return;   
    }

    console.log(token);
    router.push('/(painel)/profile/Map');
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1' }}>

        <View style={styles.container}>

          <Image style={styles.img} source={require('../../assets/img/OvF.png')}
          />
          <Text style={styles.title}>Bem Vindo</Text>

          <TextInput style={styles.formInput}
            placeholder="Informe o E-mail"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}>

          </TextInput>

          <TextInput style={styles.formInput}
            placeholder="Informe a Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry>
          </TextInput>

          <View style={styles.subContainer}>
            <Pressable>
              <Link href="/(auth)/signup/Esquecido" style={styles.subText}>Esqueci a senha</Link>
            </Pressable>

            <Pressable>
              <Link href="/(auth)/signup/Cadastro" style={styles.subText}>Novo usuário</Link>
            </Pressable>
          </View>

          <TouchableOpacity style={styles.formButton} onPress={handleSignIn} >
            <Text style={styles.textButton}>Logar</Text >
          </TouchableOpacity>
        </View >

      </ScrollView >
    </SafeAreaView>

  );
}