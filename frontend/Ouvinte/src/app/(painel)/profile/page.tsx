import { View, Text, StyleSheet } from "react-native";
import { styles } from '../../../../constants/styles';

export default function Profile() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.infoText}>Aqui você pode ver e editar suas informações de perfil.</Text>
        </View>
    );

}
