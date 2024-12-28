import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux"; // Hook pour dispatcher des actions
import { login } from "../../store/slice/person"; // Import de l'action login
import { login as loginAPI } from "../../fetchAPI/login";
import {getPerson} from "../../fetchAPI/CRUD/person"; // API fictive pour login

export default function LogIn() {
    const navigation = useNavigation();
    const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const resetForm = () => {
        setForm({
            username: '',
            password: '',
        });
    };

    // Réinitialise le formulaire lorsque l'écran est focalisé
    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    const handleLogin = async () => {
        if (form.username && form.password) {
            try {
                const loginData = await loginAPI(form.username, form.password);

                if (loginData){
                    const userData = await getPerson();
                    if (userData) {
                        const adaptedUserData = {
                            personId : userData.id,
                            username : userData.username,
                            firstName : userData.first_name,
                            lastName : userData.last_name,
                            email : userData.email,
                            phoneNumber : userData.phone_number,
                            address : userData.address,
                        }
                        dispatch(login(adaptedUserData));
                    }
                } else {
                    throw new Error("Invalid username or password");
                }

                // Afficher une alerte pour confirmer la connexion
                Alert.alert("Success", "You are now logged in!", [
                    { text: "OK", onPress: () => navigation.navigate("UpdateProfile") }, // Navigue vers l'écran principal
                ]);
            } catch (error) {
                Alert.alert("Login Failed", error.message || "Invalid username or password.");
            }
        } else {
            Alert.alert("Error", "Please fill in all fields.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E5D289' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.headerImg}
                        alt="Logo"
                    />

                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.inputControl}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Enter your username"
                        value={form.username}
                        onChangeText={username => setForm({ ...form, username })}
                    />

                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="Password"
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                    />

                    <Button
                        style={styles.button}
                        onPress={handleLogin} // Appelle la fonction handleLogin
                    >
                        <Text style={styles.textButton}>Log in</Text>
                    </Button>

                    <Text
                        style={styles.switchPage}
                        onPress={() => navigation.navigate('CreateAccount')}
                    >
                        Create an account
                    </Text>

                    <Button
                        style={styles.helpButton}
                        onPress={() => navigation.navigate('Help')} // Redirige vers l'écran Help
                    >
                        <Text style={styles.textButton}>Je n'arrive pas à me connecter</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    header: {
        marginVertical: 46,
    },
    headerImg: {
        width: '25%',
        height: '22%',
        alignSelf: 'center',
        marginBottom: 160,
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 21,
        fontWeight: '700',
        color: '#000',
        marginBottom: 5,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#F0E6B3',
        paddingHorizontal: 20,
        borderRadius: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#B0855A',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#3F2100',
        borderRadius: 8,
        marginTop: 18,
        paddingVertical: 8,
    },
    helpButton: {
        backgroundColor: '#B0855A',
        borderRadius: 8,
        marginTop: 12,
        paddingVertical: 8,
    },
    textButton: {
        color: '#F0E6B3',
        fontSize: 18,
        textAlign: 'center',
    },
    switchPage: {
        color: '#3F2100',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 12,
    },
});
