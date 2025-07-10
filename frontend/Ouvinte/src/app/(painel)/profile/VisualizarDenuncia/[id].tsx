import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from "react-native"
import { styles } from "../../../../../constants/styles"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router";
import { fetchComplaintFromBackend, updateComplaint, voteComplaint } from "../../../services/api";
import { ComplaintMap } from "../../../types/ComplaintMap";
import * as Location from 'expo-location';
import Icon from "react-native-vector-icons/Feather";
import { Image } from 'react-native';

export default function VisualizarDenuncia() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [complaint, setComplaint] = useState<ComplaintMap | null>(null);
    const [address, setAddress] = useState<Location.LocationGeocodedAddress[] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isVoted, setIsVoted] = useState(false);

    const load = async () => {
        const complaintInfo: ComplaintMap = await fetchComplaintFromBackend(id);
        setComplaint(complaintInfo);
        
        const addressInfo = await Location.reverseGeocodeAsync({
            latitude: complaintInfo.latitude,
            longitude: complaintInfo.longitude
        });
        
        setAddress(addressInfo);
        console.log('Denúncia atualizada: ', complaintInfo);
    }

    const handleVote = async () => {
        setIsVoted(await voteComplaint(id));
        console.log('Voto alterado');
        load();
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#E5E1E1', padding: 20 }}>
                <View style={styles.container}>
                    {!complaint || !address ? (
                        <Text>Carregando</Text>
                    ) :
                        (<>
                            <Text style={{ fontSize: 50, fontWeight: 'bold', marginRight: '25%' }}>Visualizando</Text>
                            <Text style={{ fontSize: 50, fontWeight: 'bold', marginLeft: '16%', marginBottom: '5%' }}>Denúncia</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={{ uri: complaint.image.imageUrl }} style={{ width: 450, height: 200, resizeMode: 'cover', borderRadius: 20, marginVertical: 15 }} />
                            </TouchableOpacity>

                            <View style={styles.textContainer}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ marginVertical: 14 }}>{complaint.title}</Text>
                                </View>
                                <Icon name="tag" size={20} color="black" style={{ marginLeft: 5 }} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ marginVertical: 14 }}>{complaint.description}</Text>
                                </View>
                                <Icon name="file-text" size={20} color="black" style={{ marginLeft: 5 }} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ marginVertical: 14 }}>{address[0].formattedAddress}</Text>
                                </View>
                                <Icon name="map-pin" size={20} color="black" style={{ marginLeft: 5 }} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', marginVertical: 14 }}>VOTOS: </Text>
                                    <Text style={{ marginVertical: 14 }}>{complaint.votes}</Text>
                                </View>
                                <Icon name="bar-chart-2" size={20} color="black" style={{ marginLeft: 5 }} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', marginVertical: 14 }}>TIPO: </Text>
                                    <Text style={{ marginVertical: 14 }}>{complaint.type.toUpperCase()}</Text>
                                </View>
                                <Icon name="type" size={20} color="black" style={{ marginLeft: 5 }} />
                            </View>
                            {
                                isVoted ? (
                                    <TouchableOpacity style={styles.formButtonRemoveVote} onPress={handleVote}>
                                        <Text style={styles.textButtonRemoveVote}>Remover voto</Text>
                                    </TouchableOpacity>) : (
                                    <TouchableOpacity style={styles.formButton} onPress={handleVote}>
                                        <Text style={styles.textButton}>Adicionar Voto</Text>
                                    </TouchableOpacity>)
                            }

                            <Modal visible={modalVisible} transparent={true}>
                                <TouchableOpacity style={styles.modalImage} onPress={() => setModalVisible(false)}>
                                    <Image source={{ uri: complaint.image.imageUrl }} style={styles.fullImage} />
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