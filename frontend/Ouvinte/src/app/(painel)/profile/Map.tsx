import React, { useState, useEffect, useRef } from 'react';
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

export default function Profile() {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView | null>(null);
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync({});
            setLocation(currentPosition);
            console.log('Permissão de localização concedida');
        }
    }

    const handleComplaint = async (complaintsFromBack: string) => {
        const jsonComplaintsFromBack: Complaint[] = JSON.parse(complaintsFromBack);
        
        const stored = await AsyncStorage.getItem('complaints');
        const storedComplaints: Complaint[] = stored ? JSON.parse(stored) : [];

        const storedComplaintIds = new Set(storedComplaints.map((c) => c.id));
        const newComplaint = jsonComplaintsFromBack.filter((c) => !storedComplaintIds.has(c.id));

        if (newComplaint.length > 0) {
            const complaints: Complaint[] = [...storedComplaints, ...newComplaint];
            await AsyncStorage.setItem('complaints', JSON.stringify(complaints));
            setComplaints(complaints);
        }
    };

    useWebSocket(handleComplaint);

    useEffect(() => {
        const loadStoredComplaints = async () =>  {
            const stored = await AsyncStorage.getItem('complaints');
            if (stored) {
                const jsonComplaints = JSON.parse(stored);
                setComplaints(jsonComplaints);
            }
        };

        loadStoredComplaints();
    }, [])

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
                    />

                    {complaints.map((c) => (
                        <Marker
                            key={c.id}
                            coordinate={{longitude: c.longitude, latitude: c.latitude}}
                            title={c.title}
                            description={c.description}
                        />
                    ))}
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
