import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from './src/Styles/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('./src/img/OvF.png')}/>

      <Text style= {styles.title}>Bem Vindo</Text>

      <StatusBar style="auto" />

      <TextInput style={styles.formInput}></TextInput>
      <TextInput style={styles.formInput}></TextInput>

      <View style={styles.subContainer}>
      <Pressable>
      <Text style={styles.subText}>Esqueci a senha</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.subText}>Novo usuário</Text>
      </Pressable>
      </View>

      <Pressable style={styles.formButton}>
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
    </View>
  );
}

