import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import du hook
import React, { useState, useCallback } from "react";
import { Button, TextInput } from "react-native-paper";



export default function LogIn() {
    const navigation = useNavigation(); // Utilisation du hook pour accéder à la navigation
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const resetForm = () => {
        setForm({
            email: '',
            password: '',
        });
    };

    // Utilisation de useFocusEffect pour réinitialiser les champs à chaque fois que l'écran est réaffiché
    useFocusEffect(
        useCallback(() => {
            resetForm(); // Réinitialiser le formulaire lorsque l'écran est focalisé
        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E5D289' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.headerImg}
                        alt="Logo"
                    />

                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                        style={styles.inputControl}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholder="address@example.com"
                        value={form.email}
                        onChangeText={email => setForm({ ...form, email })} // Correction : onChangeText
                    />

                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder="Password"
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })} // Correction : onChangeText
                    />

                    <Button
                        style={styles.button}
                        onPress={() => {
                            console.log('Sign In pressed');
                        }}
                    >
                        <Text style={styles.textButton}>Log in</Text>
                    </Button>

                    {/* Navigation vers CreateAccount */}
                    <Text
                      style={styles.switchPage}
                      onPress={() => navigation.navigate('CreateAccount')} // Navigue dans le MainTabs
                    >
                        Create an account
                    </Text>

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
        marginBottom: 15, // Ajout d'espacement entre les entrées
    },
    button: {
        backgroundColor: '#3F2100',
        borderRadius: 8,
        marginTop: 18,
        paddingVertical: 8,
    },
    textButton: {
        color: '#F0E6B3',
        fontSize: 21,
        textAlign: 'center',
    },
    switchPage: {
        color: '#3F2100',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 12, // Espacement plus conséquent
    },
});
