import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Switch, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createInterest, getinterestsByFleaMarket, updateInterest, deleteInterestByFleaMarket } from "../fetchAPI/CRUD/interest";
import { selectPersonId } from '../store/slice/person';

const InterestsScreen = ({ route, navigation }) => {
    const { fleaMarketId } = route.params;
    const [interests, setInterests] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDealer, setIsDealer] = useState(false);
    const [participation, setParticipation] = useState('');
    const [hasPlacedInterest, setHasPlacedInterest] = useState(false);
    const [existingInterest, setExistingInterest] = useState(null);
    const langDict = useSelector((state) => state.language.langDict);

    const personId = useSelector(selectPersonId);

    // Fonction pour charger les intérêts
    const loadInterests = async () => {
        try {
            const updatedInterests = await getinterestsByFleaMarket(fleaMarketId);
            setInterests(updatedInterests);
            const currentInterest = updatedInterests.find(interest => interest.person_id === personId);
            if (currentInterest) {
                setHasPlacedInterest(true);
                setExistingInterest(currentInterest);
                setIsDealer(currentInterest.is_dealer);
                setParticipation(currentInterest.participation.toString());
            } else {
                setHasPlacedInterest(false);
                setExistingInterest(null);
                setIsDealer(false);
                setParticipation('');
            }
        } catch (error) {
            console.error(langDict.errWhLoadInts, error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadInterests();
        }, [])
    );

    // Fonction pour gérer l'envoi du formulaire
    const handleSubmitInterest = async () => {
        if (!participation || parseInt(participation) <= 0) {
            Alert.alert(langDict.error, langDict.partMustBeInt);
            return;
        }

        try {
            if (hasPlacedInterest) {
                // Mettre à jour l'intérêt existant
                await updateInterest({
                    fleaMarketId,
                    personId,
                    isDealer,
                    participation: parseInt(participation),
                });
                Alert.alert(langDict.success, langDict.yourInterestWasEdited);
            } else {
                // Créer un nouvel intérêt
                await createInterest({
                    fleaMarketId,
                    personId,
                    isDealer,
                    participation: parseInt(participation),
                });
                Alert.alert(langDict.success, langDict.intWasAdd);
            }

            // Fermer le modal et recharger la liste des intérêts
            setHasPlacedInterest(true);
            setModalVisible(false);
            loadInterests();
        } catch (error) {
            console.error(langDict.errWhAddLoadInt, error);
            Alert.alert(langDict.error, langDict.impPlaceEditInt);
        }
    };

    // Fonction pour supprimer l'intérêt
    const handleDeleteInterest = async () => {
        try {
            await deleteInterestByFleaMarket(fleaMarketId);
            Alert.alert(langDict.success, langDict.intWasDel);
            setHasPlacedInterest(false);
            setExistingInterest(null);
            setIsDealer(false);
            setParticipation('');
            loadInterests();
        } catch (error) {
            console.error(langDict.errWhDelInt, error);
            Alert.alert(langDict.error, langDict.impDelInt);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{langDict.interests}</Text>
            <Text style={styles.subtitle}>{langDict.fleaMarketID}: {fleaMarketId}</Text>

            <ScrollView style={styles.interestList} contentContainerStyle={styles.interestListContent}>
                {interests.map((interest) => (
                    <TouchableOpacity
                        key={interest.person_id}
                        style={styles.interestItem}
                        onPress={() => navigation.navigate('InterestDetails', { person: interest.person })}
                    >
                        <Text style={styles.interestName}>{langDict.personID}: {interest.person_id}</Text>
                        <Text style={styles.interestDetails}>
                            {langDict.interested} {interest.is_interested ? langDict.yes : langDict.no}
                        </Text>
                        <Text style={styles.interestDetails}>
                        {langDict.dealer}: {interest.is_dealer ? langDict.yes : langDict.no}
                        </Text>
                        <Text style={styles.interestDetails}>
                            {langDict.participation}: {interest.participation}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Afficher le bouton "Update Interest" si un intérêt a été placé */}
            {hasPlacedInterest ? (
                <>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={styles.updateInterestButton}
                    >
                        <Text style={styles.updateInterestButtonText}>{langDict.updateInterest}</Text>
                    </TouchableOpacity>

                    {/* Bouton pour supprimer l'intérêt */}
                    <TouchableOpacity
                        onPress={handleDeleteInterest}
                        style={styles.deleteInterestButton}
                    >
                        <Text style={styles.deleteInterestButtonText}>{langDict.deleteInterest}</Text>
                    </TouchableOpacity>
                </>
            ) : (
                // Sinon, afficher le bouton "Place Interest"
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.placeInterestButton}
                >
                    <Text style={styles.placeInterestButtonText}>{langDict.placeInterest}</Text>
                </TouchableOpacity>
            )}

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {hasPlacedInterest ? langDict.modifyInterest : langDict.placeInterest}
                        </Text>

                        <Text style={styles.hiddenField}>{langDict.fleaMarketID}: {fleaMarketId}</Text>
                        <Text style={styles.hiddenField}>{langDict.personID}: {personId}</Text>

                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>{langDict.dealer}:</Text>
                            <Switch value={isDealer} onValueChange={setIsDealer} />
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder={langDict.participation}
                            keyboardType="numeric"
                            value={participation}
                            onChangeText={setParticipation}
                        />

                        <TouchableOpacity onPress={handleSubmitInterest} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>{langDict.submit}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={[styles.modalButton, styles.cancelButton]}
                        >
                            <Text style={styles.modalButtonText}>{langDict.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{langDict.back}</Text>
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
    placeInterestButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    placeInterestButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    updateInterestButton: {
        backgroundColor: '#3F2100',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    updateInterestButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteInterestButton: {
        backgroundColor: '#D9534F', // Rouge pour la suppression
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    deleteInterestButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 20,
    },
    hiddenField: {
        display: 'none',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#3F2100',
        marginRight: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF9E6',
        borderRadius: 8,
        borderColor: '#6B4E18',
        borderWidth: 1,
        fontSize: 16,
        color: '#3F2100',
        marginVertical: 10,
    },
    modalButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#D9534F',
    },
    backButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#3F2100',
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default InterestsScreen;
