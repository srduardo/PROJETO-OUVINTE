import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";
import { ComplaintRequest } from "../types/ComplaintRequest";
import { ImageFile } from "../types/ImageFile";
import { ComplaintMap } from "../types/ComplaintMap";

const BASE_URL = 'http://192.168.18.3:8080/api';

export const registerComplaint = async (complaint: ComplaintRequest, image: ImageFile) => {
    const xmlRequest = new XMLHttpRequest();
    const token = await AsyncStorage.getItem('jwt');

    return new Promise((resolve, reject) => {
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState !== 4) return;

            console.log('Status:', xmlRequest.status);
            console.log('Response:', xmlRequest.responseText);

            if (xmlRequest.status === 200) {
                resolve(JSON.parse(xmlRequest.responseText));
            } else {
                console.error('Erro no envio: ', xmlRequest.responseText);
                reject('Erro ao enviar denúncia');
            }
        };

        xmlRequest.open("POST", "http://192.168.18.3:8080/api/complaints");
        xmlRequest.setRequestHeader("Authorization", `Bearer ${token}`);

        console.log("Dados da denúncia:", JSON.stringify(complaint));
        console.log("Imagem:", {
            uri: image.uri,
            name: image.name,
            type: image.type,
        });

        const formData = new FormData();
        formData.append("datas", JSON.stringify(complaint));
        formData.append("image", {
            uri: image.uri,
            name: image.name,
            type: image.type
        } as any);

        xmlRequest.send(formData);
    });
};

export const fetchComplaintFromBackend = async (id: string): Promise<ComplaintMap>  => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        console.log('Token: ', token);
        console.log('ID: ', id);

        const response = await fetch(`${BASE_URL}/complaints/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        });

        if (!response.ok) {
            const message = await response.text();
            console.log("Erro na API: ", message);
            throw new Error('Erro ao buscar dados do back-end');
        }

        console.log('Status:', response.status);
        const complaint: ComplaintMap = await response.json();
        console.log(complaint);

        return complaint;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
};

export const fetchUserByEmail = async (email: string) => {
    try {
        const response = await fetch(BASE_URL + '/users/' + email);

        if (!response.ok) {
            throw new Error('Erro ao buscar usuário por email');
        }

        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário por email: ', error);
    }
}

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
