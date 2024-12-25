import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getRecoveryCode, verifyRecoveryCode } from "../../fetchAPI/recovery";
import { useNavigation } from '@react-navigation/native'; // Import pour la navigation

export default function Help() {
    const [id, setId] = useState(''); // Identifiant de l'utilisateur
    const [recoveryCode, setRecoveryCode] = useState(''); // Code de récupération
    const navigation = useNavigation(); // Hook pour la navigation

    const handleSubmit = async () => {
        if (id) {
            await getRecoveryCode(id);
            Alert.alert("Submit", "Your recovery request has been submitted.");
        } else {
            Alert.alert("Error", "Please Enter your Id.");
        }
    };

    // Fonction pour finaliser l'action (Finalize)
    const handleFinalize = async () => {
        if (recoveryCode && id) {
            let body = {
                personId: Number(id),
                recoveryCode: recoveryCode,
            };
             const result = await verifyRecoveryCode(body);
            if (result) {
                Alert.alert("Success", "Le code est validé !", [
                    { text: "OK", onPress: () => navigation.navigate("LogIn") }, // Navigue vers l'écran principal
                ]);
            } else {
                // Affichage du message d'erreur si le code est invalide
                Alert.alert("Error", "The recovery code is invalid.");
            }
        } else {
            Alert.alert("Error", "Please enter the recovery code.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help</Text>

            <View style={styles.inputGroup}>
                <TextInput
                    label="id"
                    value={id}
                    onChangeText={setId}
                    style={styles.input}
                    placeholder="Enter your id"
                />
            </View>

            <Button
                mode="contained"
                onPress={handleSubmit} // Soumettre les informations
                style={styles.submitButton}
            >
                Submit
            </Button>

            <View style={styles.inputGroup}>
                <TextInput
                    label="Recovery Code"
                    value={recoveryCode}
                    onChangeText={setRecoveryCode}
                    style={styles.input}
                    placeholder="Enter recovery code"
                />
            </View>

            <Button
                mode="contained"
                onPress={handleFinalize} // Finaliser l'action avec le code de récupération
                style={styles.finalizeButton}
            >
                Finalize
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E5D289',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
        width: '100%',
    },
    input: {
        width: '100%',
    },
    submitButton: {
        width: '100%',
        marginBottom: 10,
    },
    finalizeButton: {
        width: '100%',
    },
});
