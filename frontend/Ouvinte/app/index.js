import {Text, View, Image } from 'react-native';
import { styles } from '../src/Styles/styles';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../src/img/OvF.png')} />

      <Text style={styles.title}>Bem vindo ao Ouvinte</Text>
      <View style={styles.container}>
        <Text style={styles.infoText}>O Ouvinte tem a intenção de ajudar a população e orgãos responsaveis a tornar a cidade melhor.você pode relatar problemas de infraestrutura, como buracos nas ruas, falta de iluminação, vazamentos e muito mais, de forma rápida e eficiente.
        </Text>
        <Text style={styles.title}> Vamos começar!</Text>


        <View style={styles.subContainer}>

          <Link href="/Login" style={styles.optText}>Quero fazer Login</Link>

          <Link href="/Cadastro" style={styles.optText}>Quero me cadastrar</Link>


        </View>
      </View>
    </View>
  )
}
