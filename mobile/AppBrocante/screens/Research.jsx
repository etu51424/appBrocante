import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Alert, Modal, Text, TouchableOpacity, FlatList} from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Importation de MapView et Marker
import * as Location from 'expo-location'; // Importation de l'API Location d'Expo
import {Button} from 'react-native-paper'; // Importation du bouton de Paper
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllFleaMarketsInRange} from "../fetchAPI/CRUD/fleaMarket";
import {adaptedDateFormat} from "../utils/date";
import { useNavigation } from '@react-navigation/native';

export default function Research() {
    const initialRegion = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 180,
        longitudeDelta: 360,
    };

    const mapViewRef = useRef(null);
    const [region, setRegion] = useState(initialRegion);
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [radius, setRadius] = useState(10); // en kilomètres
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedView, setSelectedView] = useState('map'); // Initialement "map"
    const [locations, setLocations] = useState([])
    const [previousRegion, setPreviousRegion] = useState(null); // Pour restaurer la vue précédente
    const [fleaMarkets, setFleaMarkets] = useState({});

    // Fonction pour vérifier et demander les autorisations de localisation
    const checkPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            getUserLocation();
        } else {
            Alert.alert('Permission Denied', 'Permission to access location was denied');
        }
    };

    // Fonction pour obtenir la géolocalisation de l'utilisateur
    const getUserLocation = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            const { latitude, longitude } = location.coords;
            setUserLocation({ latitude, longitude });
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        } catch (error) {
            console.error('Failed to fetch user location:', error);
        }
    };

    const searchAddress = async () => {
        try {
            const apiKey = 'AIzaSyDzlIRt44c757pVdKLQm1_Awk4MBoxE9JE';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                // Extraction de tous les résultats
                const results = data.results.map((result, index) => ({
                    id: index.toString(),
                    name: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                }));

                setLocations(results); // Mettre à jour la liste des emplacements

                // Centrer la caméra sur le premier résultat
                if (mapViewRef.current && results.length > 0) {
                    mapViewRef.current.animateCamera({
                        center: { latitude: results[0].latitude, longitude: results[0].longitude },
                        zoom: 15,
                    }, { duration: 1000 });
                }
            } else {
                Alert.alert('Error', 'No results found for the address.');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            Alert.alert('Error', 'Failed to fetch the location.');
        }
    };

    // Fonction pour afficher la fenêtre modale de filtre
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Appliquer les filtres
    const applyFilters = () => {
        console.log(`Radius: ${radius} km`);
        console.log(`Start Date: ${startDate}`);
        console.log(`End Date: ${endDate}`);
        toggleModal(); // Fermer la modale après avoir appliqué les filtres
    };

    useEffect(() => {
        checkPermissions();
        getFleaMarkets(); // Récupération des marchés aux puces
    }, []);

    // Sauvegarder l'état de la carte lors du passage à la vue "list"
    const switchToListView = () => {
        setPreviousRegion(region);
        setSelectedView('list');
    };

    // Restaurer l'état de la carte lors du retour à la vue "map"
    const switchToMapView = () => {
        setSelectedView('map');
        if (previousRegion) {
            setRegion(previousRegion);
        }

    };

    const resetMapToNorth = () => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                ...region,
                heading: 0,
            }, 500);
        }
    };

    const getFleaMarkets = async () => {
        try {

            // const data = await getAllFleaMarketsInRange(100);
            const data = [
                {
                    "id": 1,
                    "address": "123 Rue de la Paix, Paris",
                    "date_start": "2024-12-01T08:00:00.000Z",
                    "date_end": "2024-12-01T17:00:00.000Z",
                    "title": "Marché de Noël",
                    "theme": "Artisanat",
                    "is_charity": true,
                    "average_rating": 4.8,
                    "review_count": 50
                },
                {
                    "id": 2,
                    "address": "456 Avenue des Champs, Lyon",
                    "date_start": "2024-12-15T09:00:00.000Z",
                    "date_end": "2024-12-25T19:00:00.000Z",
                    "title": "Marché Vintage",
                    "theme": "Antiquités",
                    "is_charity": false,
                    "average_rating": 4.5,
                    "review_count": 30
                },
                {
                    "id": 3,
                    "address": "456 Avenue des Champs, Lyon",
                    "date_start": "2024-12-15T09:00:00.000Z",
                    "date_end": "2024-12-25T19:00:00.000Z",
                    "title": "Marché Vintage",
                    "theme": "Antiquités",
                    "is_charity": false,
                    "average_rating": 4.5,
                    "review_count": 30
                },
            ]


            if (data){
                setFleaMarkets(data);
                const updatedLocations = await Promise.all(
                    data.map(async (market, index) => {
                        const apiKey = 'AIzaSyDzlIRt44c757pVdKLQm1_Awk4MBoxE9JE';
                        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(market.address)}&key=${apiKey}`;
                        const response = await fetch(url);
                        const data = await response.json();

                        if (data.status === 'OK') {
                            const location = data.results[0].geometry.location;
                            return {
                                id: index.toString(),
                                name: market.name,
                                latitude: location.lat,
                                longitude: location.lng,
                            };
                        } else {
                            console.warn(`Geocoding failed for address: ${market.address}`);
                            return null;
                        }
                    })
                );

                // Filtrer les emplacements valides uniquement
                setLocations(updatedLocations.filter(location => location !== null));
            }
        } catch (error) {
            console.error('Failed to fetch flea markets:', error);
        }
    };

    const navigation = useNavigation();


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* MapView avec géolocalisation de l'utilisateur */}
                {selectedView === 'map' ? (
                    <MapView
                        ref={mapViewRef}
                        style={styles.map}
                        region={region}
                        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                        zoomEnabled={true}
                        scrollEnabled={true}
                        mapType='standard'
                    >
                        {/* Marqueur pour la localisation de l'utilisateur */}
                        {userLocation && userLocation.latitude && userLocation.longitude && (
                            <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
                                <View style={styles.customMarker} />
                            </Marker>
                        )}

                        {/* Marqueurs pour tous les résultats de recherche */}
                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                                title={location.name}
                            />
                        ))}
                    </MapView>
                ) : (
                    <FlatList
                        data={fleaMarkets}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => {
                                    // Naviguer vers l'écran des détails et passer l'objet fleaMarket en paramètre
                                    navigation.navigate('FleaMarketDetails', { market: item });
                                }}
                            >
                                <Text style={styles.listItemText}>{item.title}</Text>
                                <Text style={styles.listItemCoords}>{item.address}</Text>
                                <Text style={styles.listItemCoords}>
                                    {adaptedDateFormat(item.date_start)} - {adaptedDateFormat(item.date_end)}
                                </Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.listContainer}
                    />

                )}
                {/* Conteneur de la barre de recherche */}
                <View style={styles.searchContainer}>
                    {/* TextInput pour entrer l'adresse */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter an address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    {/* Bouton de recherche */}
                    <TouchableOpacity style={styles.searchButton} onPress={searchAddress}>
                        <Icon name="search" size={20} color="#3F2100" />
                    </TouchableOpacity>
                    {/* Bouton de filtre */}
                    <TouchableOpacity style={styles.searchButton} onPress={toggleModal} >
                        <Icon name="funnel" size={20} color="#3F2100" />
                    </TouchableOpacity>
                </View>

                {/* Bouton pour rediriger la carte vers le nord */}
                {selectedView === 'map' && (
                    <TouchableOpacity style={styles.northButton} onPress={resetMapToNorth}>
                        <Icon name="compass" size={30} color="#3F2100" />
                    </TouchableOpacity>
            )}

                <View style={styles.switch}>
                    <TouchableOpacity style={[
                        styles.switchButton,
                        selectedView === 'map' && { backgroundColor: '#F0E6B3' },
                        ]}
                        onPress={() => switchToMapView()}
                    >
                        <Icon name="map" size={25} color="#3F2100" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[
                        styles.switchButton,
                        selectedView === 'list' && { backgroundColor: '#F0E6B3'}
                        ]}
                        onPress={() => switchToListView()}
                    >
                        <Icon name="list" size={25} color="#3F2100" />
                    </TouchableOpacity>
                    {/* Bouton pour rafraîchir les brocantes */}
                    <TouchableOpacity style={styles.refreshButton} onPress={getFleaMarkets}>
                        <Icon name="refresh" size={25} color="#3F2100" />
                    </TouchableOpacity>

                </View>
                {/* Modal for Filters */}
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>Radius (km):</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={String(radius)}
                                    onChangeText={text => setRadius(Number(text))}
                                    keyboardType="numeric"
                                />
                            </View>
                            <Text style={styles.modalText}>Start Date:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={startDate}
                                    onChangeText={setStartDate}
                                    placeholder="YYYY-MM-DD"
                                />
                            </View>
                            <Text style={styles.modalText}>End Date:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={endDate}
                                    onChangeText={setEndDate}
                                    placeholder="YYYY-MM-DD"
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button style={styles.button} onPress={applyFilters}>
                                    <Text style={styles.textButton}>Apply Filters</Text>
                                </Button>
                                <Button style={styles.button} onPress={toggleModal}>
                                    <Text style={styles.textButton}>Cancel</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    customMarker: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E5D289',
        borderWidth: 2,
        borderColor: '#fff',
        alignSelf: 'bottom',
    },
    northButton: {
        position: 'absolute',
        top: 130,
        left: 20,
        backgroundColor: '#E5D289',
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    switch: {
        position: 'absolute',
        top: 130,
        right: 20,
        backgroundColor: '#E5D289',
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        flexDirection: 'row',
    },
    switchButton: {
        padding: 7,
        borderRadius: 8,
        marginHorizontal: 2,
    },
    searchContainer: {
        position: 'absolute',
        top: 75,
        left: 10,
        right: 10,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#E5D289',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
        fontSize: 16,
        backgroundColor: '#F0E6B3',
        borderRadius: 8,
    },
    searchButton: {
        marginLeft: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#E5D289', // Fond de la modale
        padding: 20,
        borderRadius: 10,
        width: '80%', // Ajustez la largeur
        alignItems: 'flex-start', // Alignement des éléments à gauche
    },
    modalText: {
        color: '#3F2100', // Couleur de texte
        fontSize: 16,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 12,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#F0E6B3',
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',  // Cela garantit que les boutons sont bien espacés
        width: '100%',  // Assurez-vous que le conteneur prend toute la largeur disponible
    },
    button: {
        backgroundColor: '#3F2100',
        borderRadius: 8,
        paddingVertical: 12,  // Assurez-vous que les boutons sont assez grands et ont la même taille
        flex: 1,  // Cela garantit que chaque bouton prend une largeur égale
        marginHorizontal: 5,  // Espacement entre les boutons
        justifyContent: 'center',  // Centrer le texte à l'intérieur du bouton
        alignItems: 'center',
    },
    textButton: {
        color: '#F0E6B3',
        fontSize: 21,
        textAlign: 'center',  // Assurez-vous que le texte est bien centré
    },
    listContainer: {
        padding: 10,
        top: 190,
    },
    listItem: {
        backgroundColor: '#F0E6B3',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    listItemText: { fontSize: 18, color: '#3F2100' },
    listItemCoords: { fontSize: 14, color: '#6B4E18' },
});
