import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Complaint } from '../../types/Complaint';
import { useWebSocket } from '../../services/webSocketService';
import { sortRoutes } from 'expo-router/build/sortRoutes';
import { handleComplaintLocation, filterComplaints, storeComplaintsLocally, removeDeletedComplaints, updateComplaints } from '../../services/complaintService';
import { useFocusEffect } from 'expo-router';

export default function Profile() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [socketControls, setSocketControls] = useState<{
        send: (message: string) => void;
        close: () => void;
      } | null>(null);
    
    // Localização
    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync({});
            setLocation(currentPosition);
            console.log('Permissão de localização concedida');
        }
    }

    // Manipulação de denúncias
    const handleComplaint = useCallback(async (complaintsFromBack: string)=> {
        const jsonComplaints: Complaint[] = handleComplaintLocation(JSON.parse(complaintsFromBack));
        const stored = await AsyncStorage.getItem('complaints');
    
        if (!stored) {
            storeComplaintsLocally(jsonComplaints);
            console.log('Primeiras denúncias registradas!');
            return;
        }
    
        const jsonStoredComplaints: Complaint[] = JSON.parse(stored);
        const [newComplaints, deletedComplaints] = filterComplaints(jsonStoredComplaints, jsonComplaints);
        const nonDeletedCompalints: Complaint[] = removeDeletedComplaints(deletedComplaints, jsonStoredComplaints);
        
        updateComplaints(newComplaints, nonDeletedCompalints);
    }, []);
        
    const loadStoredComplaints = async () =>  {
        const stored = await AsyncStorage.getItem('complaints');
        if (stored) {
            const jsonComplaints: Complaint[] = JSON.parse(stored);
            setComplaints(jsonComplaints);
            console.log('loaded!')
        }
    };

    // Use's

    useFocusEffect(
        React.useCallback(() => {
            const {send, close} = useWebSocket(handleComplaint);
            setSocketControls({send, close});
            loadStoredComplaints();
            return () => {
            close();
            setSocketControls(null);
          };
        }, [])
      );
    
    
    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Balanced,
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

                    { complaints.filter((c1) => c1.location && c1.location.coords).map((c2) => {
                        return (
                            <Marker key={c2.id} coordinate={{latitude: c2.location.coords.latitude, longitude: c2.location.coords.longitude}} title={c2.title} icon={require('../../../../assets/img/complaint-pin.png')}/>
                        );
                    })

                    }

                </MapView>
            )}

            <View style={styles.navBar}>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity onPress={() => router.push('/(painel)/profile/home')}>
                        <Icon name="filter" size={24} color="black" />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => router.push('/(painel)/profile/denuncia')}>
                        <Icon name="pluscircleo" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(painel)/profile/settings')}>
                        <Icon name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
