import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { update, logout, selectPersonId, read } from '../../store/slice/person.js';
import { updatePerson } from "../../fetchAPI/CRUD/person";
import { getSelfAvatar } from "../../fetchAPI/avatar";
import { createDealer, updateDealer, getDealer } from "../../fetchAPI/CRUD/dealer";

const UpdateProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const langDict = useSelector((state) => state.language.langDict);

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
            console.error(langDict.errWhGetProfilePic, error);
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
            console.error(langDict.errWhGetDealer, error);
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
            Alert.alert(langDict.error, langDict.errSomeFieldsMustBe);
            return;
        }
        const values = { firstName, lastName, email, phoneNumber, address };
        try {
            const APIUpdate = await updatePerson(values);
            if (APIUpdate) {
                dispatch(update(values));
                Alert.alert(langDict.success, langDict.pWasUpd);
            } else {
                Alert.alert(langDict.error, langDict.pWasNotUpd);
            }
        } catch (e) {
            console.error(`${langDict.errWhEditProfile} ${e.message}`);
        }
    };

    const handleDealerCreation = async () => {
        if (!type || !description) {
            Alert.alert(langDict.error, langDict.typeDescMust);
            return;
        }
        try {
            const dealerData = { personId, type, description, averageRating : 1, reviewCount: 1 };
            const created = await createDealer(dealerData);
            if (created) {
                Alert.alert(langDict.success, langDict.dealerAccountCreated);
                fetchDealerInfo();
            } else {
                Alert.alert(langDict.error, langDict.couldntCreateDeaAcc);
            }
        } catch (error) {
            console.error(langDict.errWhCreatDeaAcc, error);
        }
    };

    const handleDealerUpdate = async () => {
        if (!type || !description) {
            Alert.alert(langDict.error, langDict.typeDescMust);
            return;
        }
        try {
            const dealerData = { personId, type, description };
            const updated = await updateDealer(dealerData);
            if (updated) {
                Alert.alert(langDict.success, langDict.dealerProfileUpd);
                fetchDealerInfo();
            } else {
                Alert.alert(langDict.error, langDict.noDealProfileUpd);
            }
        } catch (error) {
            console.error(langDict.errWhUpdDeaProfile, error);
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
                <Text style={styles.header}>{langDict.updateProfile}</Text>
                <View style={styles.photoContainer}>
                    {profilePhoto ? (
                        <Image
                            source={{ uri: profilePhoto }}
                            style={styles.profilePhoto}
                        />
                    ) : (
                        <Text style={styles.noPhotoText}>{langDict.noProfilePic}</Text>
                    )}
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>{langDict.firstName}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.firstName}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>{langDict.lastName}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.lastName}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>{langDict.email}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.email}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>{langDict.phoneNumber}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.phoneNumber}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>{langDict.address}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.address}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateButtonText}>{langDict.update}</Text>
                </TouchableOpacity>
                {dealer ? (
                    <>
                        <Text style={styles.header}>{langDict.dealerProfile}</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>{langDict.type}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={langDict.type}
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{langDict.description}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={langDict.description}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <TouchableOpacity style={styles.updateButton} onPress={handleDealerUpdate}>
                            <Text style={styles.updateButtonText}>{langDict.updateDealer}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('Articles')}>
                            <Text style={styles.updateButtonText}>{langDict.seeMyArticles}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.header}>{langDict.createDealerAccount}</Text>
                        <View style={styles.field}>
                            <Text style={styles.label}>{langDict.type}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={langDict.type}
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>{langDict.description}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={langDict.description}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <TouchableOpacity style={styles.updateButton} onPress={handleDealerCreation}>
                            <Text style={styles.updateButtonText}>{langDict.createDealer}</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>{langDict.logOut}</Text>
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
        backgroundColor: '#B0855A',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#B0855A',
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
