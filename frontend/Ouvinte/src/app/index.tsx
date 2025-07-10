import { Text, TextInput, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { styles } from '../../constants/styles';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { signInUser } from './services/api';
import Icon from 'react-native-vector-icons/Feather';
import { UserRequest } from './types/UserRequest';

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

    const user: UserRequest = {username: 'Usuário', email: email, password: password };
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
      <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1', padding: 20 }}>

        <View style={styles.container}>

          <Text style={{ fontSize: 60, fontWeight: 'bold', marginRight: '55%', marginTop: '10%'}}>Bem</Text>
          <Text style={{ fontSize: 60, fontWeight: 'bold', marginRight: '20%', marginBottom: '5%' }}>Vindo!</Text>

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

          <TouchableOpacity style={styles.formButton} onPress={handleSignIn} >
            <Text style={styles.textButton}>Conectar</Text >
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginVertical: '20%'}}>
            <View style={styles.subContainer}>
              <Link href="/(auth)/signup/Esquecido" style={styles.subText}>Esqueci a senha</Link>
              <Link href="/(auth)/signup/Cadastro" style={styles.subText}>Registrar-se</Link>
            </View>

            <View style={styles.linesContainer}>
              <View style={styles.line} />
              <Text>•</Text>
              <View style={styles.line} />
            </View>
          </View>
          <Image style={{ marginHorizontal: 'auto' }} source={require('../../assets/img/logo-texto.png')} />
        </View >

      </ScrollView >
    </SafeAreaView>

  );
}