import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../src/Styles/styles';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bem Vindo</Text>

      <StatusBar style="auto" />

      <TextInput style={styles.formInput}
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="nome"
        autoComplete="email">
      </TextInput>

      <TextInput style={styles.formInput}
        placeholder="Informe a Senha"
        autoCapitalize="nome"
        secureTextEntry>
      </TextInput>

      <View style={styles.subContainer}>
        <Pressable>
          <Text style={styles.subText}>Esqueci a senha</Text>
        </Pressable>
        <Pressable>
          <Link href="/Cadastro" style={styles.subText}>Novo usuário</Link>
        </Pressable>
      </View>

      <Pressable style={styles.formButton}>
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
    </View>
  );
}