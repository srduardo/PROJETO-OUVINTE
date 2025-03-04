import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../src/Styles/styles';

export default function Cadastro() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua conta agora!</Text>

            <TextInput style={styles.formInput}
                placeholder="Informe o seu nome"
                autoCapitalize="nome">
            </TextInput>

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

            <TextInput style={styles.formInput}
                placeholder="Informe a Senha novamente"
                autoCapitalize="nome"
                secureTextEntry>
            </TextInput>


            <Pressable style={styles.formButton}>
                <Text style={styles.textButton}>Registrar-se</Text>
            </Pressable>

        </View>
    )
}