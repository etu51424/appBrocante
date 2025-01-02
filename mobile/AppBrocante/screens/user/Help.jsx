import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getRecoveryCode, verifyRecoveryCode } from "../../fetchAPI/recovery";
import { useNavigation } from '@react-navigation/native'; // Import pour la navigation
import { useSelector } from "react-redux";

export default function Help() {
    const [id, setId] = useState(''); // Identifiant de l'utilisateur
    const [recoveryCode, setRecoveryCode] = useState(''); // Code de récupération
    const navigation = useNavigation(); // Hook pour la navigation
    const langDict = useSelector((state) => state.language.langDict);

    const handleSubmit = async () => {
        if (id) {
            await getRecoveryCode(id);
            Alert.alert(langDict.submit, langDict.yourRecoveryRequestHas);
        } else {
            Alert.alert(langDict.error, langDict.plsEnterYourId);
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
                Alert.alert(langDict.success, langDict.codeIsValidated, [
                    { text: "OK", onPress: () => navigation.navigate("LogIn") }, // Navigue vers l'écran principal
                ]);
            } else {
                // Affichage du message d'erreur si le code est invalide
                Alert.alert(langDict.error, langDict.recoveryCodeInvalid);
            }
        } else {
            Alert.alert(langDict.error, langDict.plsEnterRecovCode);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{langDict.help}</Text>

            <View style={styles.inputGroup}>
                <TextInput
                    label="id"
                    value={id}
                    onChangeText={setId}
                    style={styles.input}
                    placeholder={langDict.enterYourId}
                />
            </View>

            <Button
                mode="contained"
                onPress={handleSubmit} // Soumettre les informations
                style={styles.submitButton}
            >
                {langDict.submit}
            </Button>

            <View style={styles.inputGroup}>
                <TextInput
                    label="Recovery Code"
                    value={recoveryCode}
                    onChangeText={setRecoveryCode}
                    style={styles.input}
                    placeholder={langDict.enterRecovCode}
                />
            </View>

            <Button
                mode="contained"
                onPress={handleFinalize} // Finaliser l'action avec le code de récupération
                style={styles.finalizeButton}
            >
                {langDict.finalize}
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
