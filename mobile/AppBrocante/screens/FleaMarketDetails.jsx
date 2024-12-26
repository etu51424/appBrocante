import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importation pour la navigation
import { adaptedDateFormat } from "../utils/date";

const FleaMarketDetails = ({ route }) => {
    const { market } = route.params; // Récupérer les données passées depuis l'écran précédent
    const navigation = useNavigation(); // Accéder à la navigation

    const handleNavigateToInterests = () => {
        navigation.navigate('Interests', { fleaMarketId: market.id }); // Navigation avec paramètre
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{market.title}</Text>
                <Text style={styles.theme}>{market.theme}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address:</Text>
                <Text style={styles.sectionContent}>{market.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dates:</Text>
                <Text style={styles.sectionContent}>
                    {adaptedDateFormat(market.date_start)} - {adaptedDateFormat(market.date_end)}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Average Rating:</Text>
                <Text style={styles.sectionContent}>{market.average_rating} ⭐</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Number of Reviews:</Text>
                <Text style={styles.sectionContent}>{market.review_count}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleNavigateToInterests} style={styles.interestsButton}>
                    <Text style={styles.buttonText}>View Interests</Text>
                </TouchableOpacity>

                {/* Bouton "Back" */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#E5D289',
        padding: 40,
    },
    header: {
        backgroundColor: '#E5D289',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3F2100',
        textAlign: 'center',
    },
    theme: {
        fontSize: 18,
        color: '#6B4E18',
        textAlign: 'center',
        marginTop: 5,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#FFF9E6',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 5,
    },
    sectionContent: {
        fontSize: 16,
        color: '#6B4E18',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    interestsButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FleaMarketDetails;
