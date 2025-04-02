import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../../../constants/styles';
import React from 'react';


export default function Esquecido() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esqueci minha senha!</Text>

            <Image style={styles.img} source={require('../../../../assets/img/OvF.png')} />

            <TextInput style={styles.formInput}
                placeholder="Informe o E-mail"
                keyboardType="email-address"
                autoComplete="email">
            </TextInput>

            <TextInput style={styles.formInput}
                placeholder="Informe a nova Senha"
                secureTextEntry>
            </TextInput>

            <TextInput style={styles.formInput}
                placeholder="Informe a nova Senha novamente"
                secureTextEntry>
            </TextInput>


            <TouchableOpacity style={styles.formButton}>
                <Text style={styles.textButton}>Gravar</Text>
            </TouchableOpacity>

        </View>
    )
}