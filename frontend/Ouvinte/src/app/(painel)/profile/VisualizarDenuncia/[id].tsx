import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from "react-native"
import { styles } from "../../../../../constants/styles"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router";
import { fetchComplaintFromBackend } from "../../../services/api";
import { ComplaintMap } from "../../../types/ComplaintMap";
import * as Location from 'expo-location';
import Icon from "react-native-vector-icons/Feather";
import { Image } from 'react-native';

export default function VisualizarDenuncia() {
    const {id} = useLocalSearchParams<{id: string}>();
    const [complaint, setComplaint] = useState<ComplaintMap | null>(null);
    const [address, setAddress] = useState<Location.LocationGeocodedAddress[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleVote = async () => {

    }

    useEffect(() => {
        const load = async () => {
            const complaintInfo: ComplaintMap = await fetchComplaintFromBackend(id);
            console.log(id);
            setComplaint(complaintInfo);
            console.log('useEffect: ', complaintInfo);

            const addressInfo = await Location.reverseGeocodeAsync({
                latitude: complaintInfo.latitude,
                longitude: complaintInfo.longitude
            });

            setAddress(addressInfo);
        }

        load();

        if (complaint) {
            console.log(complaint);
        }
    }, [id]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{ flex: 1, backgroundColor: '#F5EDED' }}>
                <View style={styles.container1}>
                    {!complaint || !address ? (
                        <Text>Carregando</Text>
                        ) : 
                        (   <>
                                <Text style={styles.title1}>Visualizando Denúncia</Text>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Image source={{uri: complaint.image.imageUrl}} style={{ width: '100%', height: 200, resizeMode: 'cover', borderRadius: 8, marginVertical: 15 }}/>
                                </TouchableOpacity>
                        
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        <Text style={{marginVertical: 14}}>{complaint.title}</Text>
                                    </View>
                                    <Icon name="tag" size={20} color="black" style={{ marginLeft: 5 }}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        <Text style={{marginVertical: 14}}>{complaint.description}</Text>
                                    </View>
                                    <Icon name="file-text" size={20} color="black" style={{ marginLeft: 5 }}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        <Text style={{ marginVertical: 14 }}>{address[0].formattedAddress}</Text>
                                    </View>
                                    <Icon name="map-pin" size={20} color="black" style={{ marginLeft: 5 }}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        <Text style={{fontWeight: 'bold', marginVertical: 14}}>VOTOS: </Text>
                                        <Text style={{ marginVertical: 14 }}>{complaint.votes}</Text>
                                    </View> 
                                    <Icon name="alert-circle" size={20} color="black" style={{ marginLeft: 5 }}/>
                                </View>
                                <View style={styles.typeComplaint}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                        <Text style={{fontWeight: 'bold', marginVertical: 14}}>TIPO: </Text>
                                        <Text style={{ marginVertical: 14 }}>{complaint.type.toUpperCase()}</Text>
                                    </View> 
                                    <Icon name="lock" size={20} color="black" style={{ marginLeft: 5 }}/>
                                </View>

                                <TouchableOpacity style={styles.submitButton} onPress={() => {handleVote}}>
                                    <Text style={styles.submitText}>Adicionar Voto</Text>
                                </TouchableOpacity>

                                <Modal visible={modalVisible} transparent={true}>
                                    <TouchableOpacity style={styles.modalImage} onPress={() => setModalVisible(false)}>
                                        <Image source={{uri: complaint.image.imageUrl}} style={styles.fullImage}/>
                                    </TouchableOpacity>
                                </Modal>
                            </>
                        )
                    }

                    

                    
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}