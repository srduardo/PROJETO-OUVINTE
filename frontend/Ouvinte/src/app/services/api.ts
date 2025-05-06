import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const BASE_URL = 'http://192.168.18.3:8080/api';

export const syncComplaintWithBackend = async (complaint: any) => {
    try {
        const response = await fetch(BASE_URL + '/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint),
        });
        if (!response.ok) {
            throw new Error('Erro ao sincronizar dados com o back-end');
        }
        console.log('Dados sincronizados com sucesso');
    } catch (error) {
        console.error('Erro ao sincronizar dados:', error);
    }
};

export const fetchComplaintFromBackend = async () => {
    try {
        const response = await fetch(BASE_URL + '/complaints');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do back-end');
        }
        const complaints = await response.json();
        return complaints;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

export const signUpUser = async (user: User) => {
    try {
        const response = await fetch(BASE_URL + '/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        
        if (!response.ok) {
            const errorText = await response.text(); // captura a resposta de erro
            throw new Error(`Erro ao cadastrar usuário: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        const userDto = JSON.stringify(data);
        await AsyncStorage.setItem('user', userDto);
        console.log('Usuário cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
};


export const signInUser = async (user: User) => {
    try {
        const response = await fetch(BASE_URL + '/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        
        if (!response.ok) {
            throw new Error('Erro ao logar usuário');
        }
        
        const token = await response.text();
        await AsyncStorage.setItem('jwt', token);
        console.log('Login efetuado com sucesso!');
        return token;
    } catch (error) {
        console.error('Erro ao logar usuário:', error);
    }
};
