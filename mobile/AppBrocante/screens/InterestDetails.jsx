import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {getAvatar} from "../fetchAPI/avatar";

const InterestDetails = ({ route, navigation }) => {
    const { person } = route.params; // Récupère les détails de la personne
    const [profilePictureUrl, setProfilePictureUrl] = useState(''); // État pour stocker l'URL de la photo

    useEffect(() => {
        // Vous pouvez ici effectuer un appel API pour récupérer l'URL de l'image si nécessaire
        const fetchProfilePicture = async () => {
            try {
                const response = await getAvatar(person.id);
                console.log(response)
                setProfilePictureUrl(response); // Mettez à jour l'URL de l'image
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        fetchProfilePicture(); // Appel API lors du chargement du composant
    }, [person.profile_picture]); // Exécutez l'effet quand les détails de la personne changent

    const navigateToDealerDetails = () => {
        navigation.navigate('DealerDetails', { personId: person.id }); // Redirige vers DealerDetails avec person_id
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Person Details</Text>
            <Image
                source={{ uri: profilePictureUrl || `https://example.com/profiles/${person.profile_picture}` }} // Utilisation de l'URL récupérée ou de l'URL par défaut
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
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 20,
        textAlign: 'center',
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#3F2100',
    },
    detail: {
        fontSize: 18,
        color: '#6B4E18',
        marginBottom: 12,
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 10,
    },
    backButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dealerButton: {
        backgroundColor: '#3F2100',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    dealerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default InterestDetails;
