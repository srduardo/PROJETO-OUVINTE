import AsyncStorage from "@react-native-async-storage/async-storage";
import { ComplaintRequest } from "../types/ComplaintRequest";
import { ImageFile } from "../types/ImageFile";
import { ComplaintMap } from "../types/ComplaintMap";
import { ComplaintResponse } from "../types/ComplaintResponse";
import { UserRequest } from "../types/UserRequest";
import { UserResponse } from "../types/UserResponse";

const BASE_URL = 'http://172.20.10.5:8080/api';

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

        xmlRequest.open("POST", `${BASE_URL}/complaints`);
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
            console.log("Erro na API: ", response.status);
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

        const user: UserResponse = await response.json();
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário por email: ', error);
    }
}

export const updateComplaint = async (complaint: ComplaintMap): Promise<ComplaintMap> => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        
        const response = await fetch(`${BASE_URL}/complaints/${complaint.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(complaint),
        });

        const complaintInfo: ComplaintMap = await response.json();

        return complaintInfo;
    } catch (error) {
        console.error('Erro ao atualizar denúncia:', error);
    }
}

export const updateUser = async (user: UserRequest) => {
    try {
        const token = await AsyncStorage.getItem('jwt');

        const response = await fetch(`${BASE_URL}/users/updatePassword/${user.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }

        const updatedUser: UserResponse = await response.json();
        console.log('Usuário atualizado com sucesso:', updatedUser);
    } catch (error) {
    
    }
};

export const voteComplaint = async (id: string): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        console.log('Token: ', token);
        console.log('ID: ', id);

        const response = await fetch(`${BASE_URL}/complaints/voteComplaint/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log('Status:', response);
            throw new Error('Erro ao votar na denúncia');
        }

        const isVoted: boolean= await response.json();
        console.log('Voto registrado com sucesso');
        return isVoted;
    } catch (error) {
        console.error('Erro ao votar na denúncia:', error);
    }
}

export const signUpUser = async (user: UserRequest) => {
    try {
        const response = await fetch(BASE_URL + '/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao cadastrar usuário: ${response.status} - ${errorText}`);
        }
        
        console.log('Usuário cadastrado com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
};


export const signInUser = async (user: UserRequest) => {
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
