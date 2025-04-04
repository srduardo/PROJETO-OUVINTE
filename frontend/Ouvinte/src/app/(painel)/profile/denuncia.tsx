import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../../../../constants/styles';

export default function Denuncia() {
  const [nomeDenuncia, setNomeDenuncia] = useState('');
  const [descricaoDenuncia, setDescricaoDenuncia] = useState('');
  const [tipoDenuncia, setTipoDenuncia] = useState('Selecione o tipo');
  const [imagem, setImagem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const tipos = [
    'Buraco na pista',
    'Acidente',
    'Alagamento',
    'Rede elétrica',
    'Área abandonada',
  ];

  const handleAnexarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleDenunciar = () => {
    if (!nomeDenuncia || !descricaoDenuncia || tipoDenuncia === 'Selecione o tipo') {
      Alert.alert('Erro', 'Preencha todos os campos antes de enviar a denúncia.');
      return;
    }
    Alert.alert('Denúncia enviada!', 'Sua denúncia foi registrada com sucesso.');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#F5EDED' }}>
        <View style={styles.container1}>
          <Text style={styles.title1}>Criando Denuncia</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome da denúncia"
              value={nomeDenuncia}
              onChangeText={setNomeDenuncia}
            />
            <Icon name="tag" size={20} color="black" />
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da denúncia"
              value={descricaoDenuncia}
              onChangeText={setDescricaoDenuncia}
              multiline
            />
            <Icon name="file-text" size={20} color="black" />
          </View>


          <TouchableOpacity style={styles.uploadButton} onPress={handleAnexarImagem}>
            <Icon name="image" size={40} color="black" />
            <Text style={styles.uploadText}>Anexar imagens</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.tipoContainer} onPress={() => setModalVisible(true)}>
            <Text style={styles.tipoText}>TIPO: {tipoDenuncia.toUpperCase()}</Text>
            <Icon name="chevron-down" size={20} color="black" />
          </TouchableOpacity>


          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione o tipo de denúncia</Text>
                <FlatList
                  data={tipos}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setTipoDenuncia(item);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.submitButton} onPress={handleDenunciar}>
            <Text style={styles.submitText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
