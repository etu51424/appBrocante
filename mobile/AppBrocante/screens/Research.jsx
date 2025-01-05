import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, Alert, Modal, Text, TouchableOpacity, FlatList} from 'react-native';
// on importe MapView et Marker
import MapView, { Marker } from 'react-native-maps'; 

import * as Location from 'expo-location'; 
import {Button} from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllFleaMarketsInRange} from "../fetchAPI/CRUD/fleaMarket";
import {adaptedDateFormat, isBefore} from "../utils/date";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

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
    const [radius, setRadius] = useState(10); 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedView, setSelectedView] = useState('map'); 
    const [locations, setLocations] = useState([])
    // permet de revenir à la view d'avant
    const [previousRegion, setPreviousRegion] = useState(null); 
    const [fleaMarkets, setFleaMarkets] = useState({});
    const langDict = useSelector((state) => state.language.langDict);

// verifie qu'on peut obtenir la location du système
    const checkPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            getUserLocation();
        } else {
            Alert.alert(langDict.permDenied, langDict.permAccDen);
        }
    };

    // se charge d'obtenir la location de l'useur
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
            console.error(langDict.failUserLoc, error);
        }
    };

    const searchAddress = async () => {
        try {
            const apiKey = 'AIzaSyDzlIRt44c757pVdKLQm1_Awk4MBoxE9JE';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                // extrait de results l'id, l'addr' la latitude/longitude
                const results = data.results.map((result, index) => ({
                    id: index.toString(),
                    name: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                }));

                setLocations(results); // MAJ la liste des locations

                // on centre la caméra sur la première location (= un result)
                if (mapViewRef.current && results.length > 0) {
                    mapViewRef.current.animateCamera({
                        center: { latitude: results[0].latitude, longitude: results[0].longitude },
                        zoom: 15,
                    }, { duration: 1000 });
                }
            } else {
                Alert.alert(langDict.error, langDict.noResFoundAddr);
            }
        } catch (error) {
            console.error(langDict.errLoc, error);
            Alert.alert(langDict.error, langDict.failLoc);
        }
    };

    // affiche la petite fenetre de filtre
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // utiliser les filtres sélectionnés par l'useur  -sur les brocantes
    const applyFilters = async () => {

        toggleModal(); // plus besoin du modal, on le ferme

        try {
            let fetchedFleaMarkets = await getAllFleaMarketsInRange(radius);

            if (startDate) {
                fetchedFleaMarkets = fetchedFleaMarkets.filter((fleaMarket) => {
                    return !isBefore(startDate, fleaMarket.date_start);
                })
            }
            if (endDate){
                fetchedFleaMarkets = fetchedFleaMarkets.filter((fleaMarket) => {
                    return isBefore(endDate, fleaMarket.date_end)
                })
            }
            setFleaMarkets(fetchedFleaMarkets);
        } catch (error) {
            console.error(langDict.errFilters, error);
        }
    };

    const filterMarketsByAddress = () => {
        if (address) {
            const filteredMarkets = fleaMarkets.filter((fleaMarket) =>
                // verifie si une adresse correspond à une autre (on ignore les majuscules)
                fleaMarket.address.toLowerCase().includes(address.toLowerCase()) 
            );
            setFleaMarkets(filteredMarkets);
        }
    };


    useEffect(() => {
        checkPermissions();
        getFleaMarkets(); 
    }, []);

    // On passe à la view avec la liste des brocantes.
    // donc retenir l'état de la carte dans un useState
    const switchToListView = () => {
        setPreviousRegion(region);
        setSelectedView('list');
    };

    // le réutiliser quand l'useur revient à la view carte
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

            const data = await getAllFleaMarketsInRange(100);
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
                            console.warn(`${langDict.geocodeFail}: ${market.address}`);
                            return null;
                        }
                    })
                );

                // Filtrer les emplacements valides uniquement
                setLocations(updatedLocations.filter(location => location !== null));
            }
        } catch (error) {
            console.error(langDict.marketFail, error);
        }
    };

    const navigation = useNavigation();


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

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
                        {userLocation && userLocation.latitude && userLocation.longitude && (
                            <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
                                <View style={styles.customMarker} />
                            </Marker>
                        )}

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
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={langDict.enterAddr}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={filterMarketsByAddress}>
                        <Icon name="search" size={20} color="#3F2100" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchButton} onPress={toggleModal} >
                        <Icon name="funnel" size={20} color="#3F2100" />
                    </TouchableOpacity>
                </View>

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
                    <TouchableOpacity style={styles.refreshButton} onPress={getFleaMarkets}>
                        <Icon name="refresh" size={25} color="#3F2100" />
                    </TouchableOpacity>

                </View>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>{langDict.radius} (km):</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={String(radius)}
                                    onChangeText={text => setRadius(Number(text))}
                                    keyboardType="numeric"
                                />
                            </View>
                            <Text style={styles.modalText}>{langDict.startDate}:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={startDate}
                                    onChangeText={setStartDate}
                                    placeholder="YYYY-MM-DD"
                                />
                            </View>
                            <Text style={styles.modalText}>{langDict.endDate}:</Text>
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
                                    <Text style={styles.textButton}>{langDict.applyFilters}</Text>
                                </Button>
                                <Button style={styles.button} onPress={toggleModal}>
                                    <Text style={styles.textButton}>{langDict.cancel}</Text>
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
        backgroundColor: '#E5D289', 
        padding: 20,
        borderRadius: 10,
        width: '80%', 
        alignItems: 'flex-start', 
    },
    modalText: {
        color: '#3F2100', 
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
        justifyContent: 'space-between',  // les boutons sont équitablement répartis
        width: '100%', 
    },
    button: {
        backgroundColor: '#3F2100',
        borderRadius: 8,
        paddingVertical: 12,  
        flex: 1,  // chaq bouton fait la meme taille
        marginHorizontal: 5,  
        justifyContent: 'center',  // textButton est au centre du bouton
        alignItems: 'center',
    },
    textButton: {
        color: '#F0E6B3',
        fontSize: 21,
        textAlign: 'center',
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
