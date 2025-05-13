import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleSearchCEP = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('CEP inválido', 'Digite 8 números');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        return;
      }
      
      setAddress({
        city: data.localidade,
        state: data.uf,
        neighborhood: data.bairro
      });
      
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão');
    }
  };

  const handleImageError = (uri) => {
    setImageErrors(prev => ({ ...prev, [uri]: true }));
  };

  const Card = ({ image, title }) => {
    const descriptions = {
      'Apartamento 303 Guilhermina': 'Apartamento com 2 quartos, 72m², vista para o mar, valor R$ 350.000',
      'Prime Tower': 'Edifício premium com piscina e academia, 110m², valor R$ 550.000',
      'Melvi': 'Casa térrea com jardim, 3 dormitórios, 150m², valor R$ 480.000',
      'Ocian': 'Casa de praia com piscina, 4 suítes, 200m², valor R$ 1.200.000'
    };

    return (
      <View style={styles.card}>
        <Image 
          source={{ uri: imageErrors[image] ? 'https://via.placeholder.com/200x100.png?text=Imagem+indispon%C3%ADvel' : image }} 
          style={styles.cardImage}
          onError={() => handleImageError(image)}
          resizeMode="cover"
        />
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSub}>Praia Grande - SP</Text>
        <TouchableOpacity onPress={() => Alert.alert(title, descriptions[title] || 'Descrição não disponível')}>
          <Text style={styles.cardButton}>Saiba mais</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Campo de CEP */}
      <View style={styles.cepContainer}>
        <TextInput
          style={styles.cepInput}
          placeholder="Digite seu CEP"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          maxLength={8}
        />
        <TouchableOpacity 
          style={styles.cepButton} 
          onPress={handleSearchCEP}
          disabled={cep.length !== 8}
        >
          <Text style={styles.cepButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição do endereço */}
      {address && (
        <View style={styles.addressContainer}>
          <Ionicons name="location" size={16} color="#004d40" />
          <Text style={styles.addressText}>
            {address.neighborhood}, {address.city} - {address.state}
          </Text>
        </View>
      )}

      {/* Botão de perfil */}
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Ionicons name="person-circle-outline" size={30} color="#004d40" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.location}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>Praia Grande - SP</Text>
        </TouchableOpacity>
        <Image 
          source={{ uri: 'https://i.imgur.com/Zx8zeJw.png' }} 
          style={styles.logo} 
        />
      </View>

      {/* Conteúdo principal */}
      <Text style={styles.title}>Olá, <Text style={styles.bold}>Corretor</Text></Text>
      <Text style={styles.subtitle}>Vamos explorar?</Text>

      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#ccc" />
        <TextInput 
          placeholder="Pesquisa..." 
          style={styles.searchInput} 
          placeholderTextColor="#ccc"
        />
        <Feather name="mic" size={20} color="#ccc" />
      </View>

      <View style={styles.filters}>
        {['Tudo', 'Casa', 'Apartamento'].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.filterButton, item === 'Tudo' && styles.selectedFilter]}
          >
            <Text style={[styles.filterText, item === 'Tudo' && styles.selectedFilterText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Seções de imóveis */}
      <Text style={styles.sectionTitle}>Apartamentos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        <Card image="https://i.imgur.com/1NHShuT.jpg" title="Apartamento 303 Guilhermina" />
        <Card image="https://i.imgur.com/8EaxIYw.jpg" title="Prime Tower" />
      </ScrollView>

      <Text style={styles.sectionTitle}>Casas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        <Card image="https://i.imgur.com/jE5VKKp.jpg" title="Melvi" />
        <Card image="https://i.imgur.com/Y6F5XtM.jpg" title="Ocian" />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cepContainer: {
    flexDirection: 'row',
    marginTop: 55,
    marginHorizontal: 10,
    gap: 10,
    zIndex: 2,
  },
  cepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  cepButton: {
    backgroundColor: '#004d40',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    opacity: 1,
  },
  cepButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0f2f1',
    margin: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  addressText: {
    marginLeft: 10,
    color: '#004d40',
    fontWeight: '600',
    fontSize: 14,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#004d40',
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginBottom: 5,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: '#3f51b5',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    width: 200,
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  cardSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  cardButton: {
    marginTop: 8,
    color: '#3f51b5',
    fontWeight: 'bold',
    fontSize: 14,
  },
});