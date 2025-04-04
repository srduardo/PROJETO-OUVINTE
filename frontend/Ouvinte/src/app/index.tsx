import { Pressable, Text, TextInput, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { styles } from '../../constants/styles';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    // Aqui você pode adicionar a lógica para registrar o usuário, como chamar uma API ou usar Firebase.

    console.log("Login efetuado com sucesso!");
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