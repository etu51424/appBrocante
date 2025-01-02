import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/person"; 
import { login as loginAPI } from "../../fetchAPI/login";
import {getPerson} from "../../fetchAPI/CRUD/person"; 
import { useSelector } from "react-redux";

export default function LogIn() {
    const navigation = useNavigation();
    const dispatch = useDispatch(); 

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

    // reinit le formulaire quand l'écran est "en focus"
    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    const langDict = useSelector((state) => state.language.langDict);

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
                    throw new Error(langDict.invalidUsernameOrPassword);
                }

                // confirme juste la correction
                Alert.alert(langDict.success, langDict.youAreNowLoggedIn, [
                    { text: "OK", onPress: () => navigation.navigate("UpdateProfile") }, // Navigue vers l'écran principal
                ]);
            } catch (error) {
                Alert.alert(langDict.loginFailed, error.message || langDict.invalidUsernameOrPassword);
            }
        } else {
            Alert.alert(langDict.error, langDict.plsFillInAllFields);
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

                    <Text style={styles.inputLabel}>{langDict.username}</Text>
                    <TextInput
                        style={styles.inputControl}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={langDict.enterYourUsername}
                        value={form.username}
                        onChangeText={username => setForm({ ...form, username })}
                    />

                    <Text style={styles.inputLabel}>{langDict.password}</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder={langDict.password}
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                    />

                    <Button
                        style={styles.button}
                        onPress={handleLogin} // clic est ici
                    >
                        <Text style={styles.textButton}>{langDict.logIn}</Text>
                    </Button>

                    <Text
                        style={styles.switchPage}
                        onPress={() => navigation.navigate('CreateAccount')}
                    >
                        {langDict.createAccount}
                    </Text>

                    <Button
                        style={styles.helpButton}
                        onPress={() => navigation.navigate('Help')} // va vers Help.jsx
                    >
                        <Text style={styles.textButton}>{langDict.cantLogin}</Text>
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
