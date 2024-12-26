import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const InterestDetails = ({ route, navigation }) => {
    const { person } = route.params; // Récupère les détails de la personne

    const navigateToDealerDetails = () => {
        navigation.navigate('DealerDetails', { personId: person.id }); // Redirige vers DealerDetails avec person_id
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Person Details</Text>
            <Image
                source={{ uri: `https://example.com/profiles/${person.profile_picture}` }}
                style={styles.profilePicture}
            />
            <Text style={styles.detail}>Username: {person.username}</Text>
            <Text style={styles.detail}>Name: {person.first_name} {person.last_name}</Text>
            <Text style={styles.detail}>Address: {person.address}</Text>
            <Text style={styles.detail}>Phone: {person.phone_number}</Text>
            <Text style={styles.detail}>Email: {person.email}</Text>
            <Text style={styles.detail}>Admin: {person.is_admin ? "Yes" : "No"}</Text>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToDealerDetails} style={styles.dealerButton}>
                <Text style={styles.dealerButtonText}>View Dealer Details</Text>
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
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    detail: {
        fontSize: 16,
        color: '#6B4E18',
        marginBottom: 10,
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
    dealerButton: {
        backgroundColor: '#3F2100',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    dealerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default InterestDetails;
