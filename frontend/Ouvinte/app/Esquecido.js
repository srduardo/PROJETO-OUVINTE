import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../src/Styles/styles';

export default function Esquecido() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esqueci minha senha!</Text>


            <TextInput style={styles.formInput}
                placeholder="Informe o E-mail"
                keyboardType="email-address"
                autoCapitalize="nome"
                autoComplete="email">
            </TextInput>

            <TextInput style={styles.formInput}
                placeholder="Informe a nova Senha"
                autoCapitalize="nome"
                secureTextEntry>
            </TextInput>

            <TextInput style={styles.formInput}
                placeholder="Informe a nova Senha novamente"
                autoCapitalize="nome"
                secureTextEntry>
            </TextInput>


            <Pressable style={styles.formButton}>
                <Text style={styles.textButton}>Gravar</Text>
            </Pressable>

        </View>
    )
}