import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getinterestsByFleaMarket } from "../fetchAPI/CRUD/interest";

const InterestsScreen = ({ route, navigation }) => {
    const { fleaMarketId } = route.params; // Récupère l'ID du marché
    const [interests, setInterests] = useState([]); // État pour stocker les intérêts

    // Charger les intérêts uniquement à l'arrivée sur l'écran
    useFocusEffect(
        useCallback(() => {
            const fetchInterests = async () => {
                try {
                    const fetchedInterests = await getinterestsByFleaMarket(fleaMarketId);
                    setInterests(fetchedInterests);
                } catch (error) {
                    console.error("Erreur lors du chargement des intérêts:", error);
                }
            };

            fetchInterests();
        }, [fleaMarketId])
    );

    const handleInterestPress = (person) => {
        navigation.navigate('InterestDetails', { person }); // Redirection vers InterestDetails
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interests</Text>
            <Text style={styles.subtitle}>Flea Market ID: {fleaMarketId}</Text>

            <ScrollView style={styles.interestList} contentContainerStyle={styles.interestListContent}>
                {interests.map((interest) => (
                    <TouchableOpacity
                        key={interest.person_id}
                        style={styles.interestItem}
                        onPress={() => handleInterestPress(interest.person)} // Gestion du clic
                    >
                        <Text style={styles.interestName}>Person ID: {interest.person_id}</Text>
                        <Text style={styles.interestDetails}>
                            Interested: {interest.is_interested ? "Yes" : "No"}
                        </Text>
                        <Text style={styles.interestDetails}>
                            Dealer: {interest.is_dealer ? "Yes" : "No"}
                        </Text>
                        <Text style={styles.interestDetails}>
                            Participation: {interest.participation}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5D289',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B4E18',
        marginBottom: 20,
    },
    interestList: {
        width: '100%',
        maxHeight: '60%',
        marginBottom: 20,
    },
    interestListContent: {
        alignItems: 'center',
    },
    interestItem: {
        width: '90%',
        backgroundColor: '#FFF9E6',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    interestName: {
        fontSize: 16,
        color: '#3F2100',
        fontWeight: 'bold',
    },
    interestDetails: {
        fontSize: 14,
        color: '#6B4E18',
    },
    backButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default InterestsScreen;
