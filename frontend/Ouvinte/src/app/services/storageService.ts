import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const saveDataLocally = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        Alert.alert('Não foi possível salvar os dados localmente.', error.message);
    }
};

export const getDataLocally = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        Alert.alert('Não foi possível recuperar os dados localmente.', error.message);;
    }
};

export const removeDataLocally = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        Alert.alert('Não foi possível remover os dados localmente.', error.message);;
    }
};

export const getJWT = async(key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        Alert.alert('Não foi possível recuperar os dados localmente.', error.message);;
    }
}