import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationObject,
    LocationAccuracy,
} from 'expo-location';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../../../../constants/styles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ComplaintResponse } from '../../types/ComplaintResponse';
import { useWebSocket } from '../../services/webSocketService';
import { getComplaintLocation, filterComplaints, storeComplaintsLocally, removeDeletedComplaints, updateComplaints } from '../../services/complaintService';
import { useFocusEffect } from 'expo-router';
import { ComplaintMap } from '../../types/ComplaintMap';


export default function Profile() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const [complaints, setComplaints] = useState<ComplaintMap[]>([]);
    const [allComplaints, setAllComplaints] = useState<ComplaintMap[]>([]);
    const [filteredComplaints, setFilteredComplaints] = useState<ComplaintMap[]>([]);
    const [viewList, setViewList] = useState(false);
    const tipos = [
        'Buraco na pista',
        'Acidente',
        'Alagamento',
        'Rede elétrica',
        'Área abandonada',
    ];

    // Localização
    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync({});
            setLocation(currentPosition);
            const stringCurrentPosition: string = JSON.stringify(currentPosition);
            await AsyncStorage.setItem('userLocation', stringCurrentPosition);
            console.log('Permissão de localização concedida');
        }
    }

    // Manipulação de denúncias
    const handleComplaint = useCallback(async (complaintsFromBack: string) => {
        const complaintsResponse: ComplaintResponse[] = JSON.parse(complaintsFromBack);
        const stored = await AsyncStorage.getItem('complaints');

        const complaintsMap: ComplaintMap[] = complaintsResponse.map((c) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            type: c.type,
            image: c.image,
            votes: c.votes,
            latitude: c.latitude,
            longitude: c.longitude,
            location: getComplaintLocation(c),
            isVoted: false
        }))

        if (!stored) {
            storeComplaintsLocally(complaintsMap);
            console.log('Primeiras denúncias registradas!');
            return;
        }

        const jsonStoredComplaints: ComplaintMap[] = JSON.parse(stored);
        const [newComplaints, deletedComplaints] = filterComplaints(jsonStoredComplaints, complaintsMap);
        const nonDeletedCompalints: ComplaintMap[] = removeDeletedComplaints(deletedComplaints, jsonStoredComplaints);

        updateComplaints(newComplaints, nonDeletedCompalints);
    }, []);

    const loadStoredComplaints = async () => {
        const stored = await AsyncStorage.getItem('complaints');
        if (stored) {
            const jsonComplaints: ComplaintMap[] = JSON.parse(stored);
            setComplaints(jsonComplaints);
            console.log('loaded!')
        }
    };

    const filterComplaintsByType = async (type: string) => {
        const stored = await AsyncStorage.getItem('complaints');
        if (stored) {
            const jsonComplaints: ComplaintMap[] = JSON.parse(stored);
            const filtered: ComplaintMap[] = jsonComplaints.filter((c) => c.type === type);
            setComplaints(filtered);
        }
    };

    // Use's
    useFocusEffect(
        React.useCallback(() => {
            const { close } = useWebSocket(handleComplaint);
            loadStoredComplaints();
            requestLocationPermission();
            return () => {
                close();
            };
        }, [])
    );

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.High,
            timeInterval: 10000,
            distanceInterval: 1,
        }, (response) => {
            setLocation(response);
            if (mapRef.current) {
                mapRef.current?.animateToRegion({
                    latitude: response.coords.latitude,
                    longitude: response.coords.longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005,
                }, 1000);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0005,
                        longitudeDelta: 0.0005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        icon={require('../../../../assets/img/user-pin.png')}
                    />

                    {complaints.filter((c1) => c1.location && c1.location.coords).map((c2) => {
                        return (
                            <Marker key={c2.id} coordinate={{ latitude: c2.location.coords.latitude, longitude: c2.location.coords.longitude }} title={c2.title} icon={require('../../../../assets/img/complaint-pin.png')} onPress={() => router.push(`/(painel)/profile/VisualizarDenuncia/${c2.id}`)} />
                        );
                    })
                    }

                </MapView>
            )}

            {viewList && (
                <View style={{ position: 'absolute', top: '20%', alignSelf: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#E5E1E1', borderRadius: 10 }}>
                    <Text style={{ fontSize: 26, marginHorizontal: 'auto', fontWeight: 'bold', marginVertical: 5 }}>FILTRO</Text>
                    <FlatList
                        data={tipos}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (

                            <View>
                                <TouchableOpacity onPress={() => {
                                    setViewList(false);
                                    filterComplaintsByType(item);
                                }}>
                                    <View style={styles.complainsTypeButton}>
                                        <Text style={styles.typeText}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )} />

                    <TouchableOpacity onPress={() => {
                        setViewList(false);
                        loadStoredComplaints();
                    }}>
                        <View style={styles.allComplaintsButton}>
                            <Text style={styles.typeTextAll}>TODAS</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            )}

            <View style={styles.navBar}>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity onPress={() => setViewList(!viewList)}>
                        <Icon name="filter" size={24} color="black" />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => router.push('/(painel)/profile/denuncia')}>
                        <Icon name="pluscircleo" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/')}>
                        <Icon name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
