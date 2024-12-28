import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { update, logout, selectPersonId, read } from '../../store/slice/person.js';
import { updatePerson } from "../../fetchAPI/CRUD/person";
import { getSelfAvatar } from "../../fetchAPI/avatar";
import { createDealer, updateDealer, getDealer } from "../../fetchAPI/CRUD/dealer";

const UpdateProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const user = useSelector(read).payload.user;
    const personId = useSelector(selectPersonId);

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [address, setAddress] = useState(user.address || '');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dealer, setDealer] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    const fetchProfilePhoto = async () => {
        try {
            const photoUrl = await getSelfAvatar();
            if (photoUrl) {
                setProfilePhoto(photoUrl);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de la photo de profil", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDealerInfo = async () => {
        try {
            const dealerInfo = await getDealer();
            if (dealerInfo) {
                setDealer(dealerInfo);
                setType(dealerInfo.type || '');
                setDescription(dealerInfo.description || '');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations Dealer", error);
        }
    };

    useEffect(() => {
        if (personId) {
            fetchProfilePhoto();
            fetchDealerInfo();
        } else {
            navigation.navigate('LogIn');
        }
    }, [personId, navigation]);

    const handleUpdate = async () => {
        if (!firstName || !lastName || !email) {
            Alert.alert('Erreur', 'Les champs prénom, nom et email sont obligatoires.');
            return;
        }
        const values = { firstName, lastName, email, phoneNumber, address };
        try {
            const APIUpdate = await updatePerson(values);
            if (APIUpdate) {
                dispatch(update(values));
                Alert.alert('Succès', 'Votre profil a été mis à jour.');
            } else {
                Alert.alert('Erreur', 'Votre profil n\'a pas pu être mis à jour.');
            }
        } catch (e) {
            console.error(`Erreur lors de la modification du profil ${e.message}`);
        }
    };

    const handleDealerCreation = async () => {
        if (!type || !description) {
            Alert.alert('Erreur', 'Les champs type et description sont obligatoires.');
            return;
        }
        try {
            const dealerData = { personId, type, description, averageRating : 1, reviewCount: 1 };
            const created = await createDealer(dealerData);
            if (created) {
                Alert.alert('Succès', 'Compte Dealer créé.');
                fetchDealerInfo();
            } else {
                Alert.alert('Erreur', 'Impossible de créer le compte Dealer.');
            }
        } catch (error) {
            console.error('Erreur lors de la création du compte Dealer', error);
        }
    };

    const handleDealerUpdate = async () => {
        if (!type || !description) {
            Alert.alert('Erreur', 'Les champs type et description sont obligatoires.');
            return;
        }
        try {
            const dealerData = { personId, type, description };
            const updated = await updateDealer(dealerData);
            if (updated) {
                Alert.alert('Succès', 'Profil Dealer mis à jour.');
                fetchDealerInfo();
            } else {
                Alert.alert('Erreur', 'Impossible de mettre à jour le profil Dealer.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil Dealer', error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigation.replace('LogIn');
    };

    if (loading || !personId) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>Mettre à jour le profil</Text>
                <View style={styles.photoContainer}>
                    {profilePhoto ? (
                        <Image
                            source={{ uri: profilePhoto }}
                            style={styles.profilePhoto}
                        />
                    ) : (
                        <Text style={styles.noPhotoText}>Pas de photo de profil</Text>
                    )}
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Numéro de téléphone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Numéro de téléphone"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Adresse</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>Mettre à jour</Text>
                </TouchableOpacity>
                {dealer ? (
                    <>
                        <Text style={styles.header}>Profil Dealer</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Type</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Type"
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <TouchableOpacity style={styles.updateButton} onPress={handleDealerUpdate}>
                            <Text style={styles.updateButtonText}>Mettre à jour le Dealer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('Articles')}>
                            <Text style={styles.updateButtonText}>Voir mes articles</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.header}>Créer un compte Dealer</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>Type</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Type"
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <TouchableOpacity style={styles.updateButton} onPress={handleDealerCreation}>
                            <Text style={styles.updateButtonText}>Créer le Dealer</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E5D289',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
    },
    noPhotoText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    field: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#F0E6B3',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    updateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default UpdateProfile;
