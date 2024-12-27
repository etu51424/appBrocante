import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getSlotsByFleaMarket } from "../fetchAPI/CRUD/slots"; // Assurez-vous que cette fonction existe et récupère les slots

const Slots = ({ route, navigation }) => {
    const { fleaMarketId } = route.params; // Récupère l'ID du marché aux puces
    const [slots, setSlots] = useState([]); // État pour stocker les slots
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    useEffect(() => {
        // Fonction pour récupérer les slots associés au marché
        const fetchSlots = async () => {
            try {
                const fetchedSlots = await getSlotsByFleaMarket(fleaMarketId); // API call
                setSlots(fetchedSlots);
            } catch (error) {
                console.error("Erreur lors de la récupération des slots:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, [fleaMarketId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Slots for Flea Market ID: {fleaMarketId}</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading slots...</Text>
            ) : slots.length === 0 ? (
                <Text style={styles.noSlotsText}>No slots available for this flea market.</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.slotList}>
                    {slots.map((slot) => (
                        <View key={slot.id} style={styles.slotItem}>
                            <Text style={styles.slotDetail}>Slot ID: {slot.id}</Text>
                            <Text style={styles.slotDetail}>
                                Availability: {slot.is_available ? "Available" : "Unavailable"}
                            </Text>
                            <Text style={styles.slotDetail}>Area: {slot.area} m²</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#6B4E18',
        marginBottom: 20,
    },
    noSlotsText: {
        fontSize: 16,
        color: '#6B4E18',
        marginBottom: 20,
        textAlign: 'center',
    },
    slotList: {
        width: '100%',
        alignItems: 'center',
    },
    slotItem: {
        width: '90%',
        backgroundColor: '#FFF9E6',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    slotDetail: {
        fontSize: 16,
        color: '#3F2100',
        marginBottom: 5,
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

export default Slots;
