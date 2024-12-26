import {StyleSheet, Text, View, SafeAreaView, Image, Pressable} from "react-native";
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback} from "react";
import { Button, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';


export default function CreateAccount(){
    const navigation = useNavigation();
    const goBack = () => { navigation.goBack(); };
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    });
    const resetForm = () => {
        setForm({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
        });
    };

    // Utilisation de useFocusEffect pour réinitialiser les champs à chaque fois que l'écran est réaffiché
    useFocusEffect(
        useCallback(() => {
            resetForm(); // Réinitialiser le formulaire lorsque l'écran est focalisé
        }, [])
    );
    return (
        <SafeAreaView style={{flex : 1, backgroundColor: '#E5D289'}}>
            <Pressable 
                onPressOut={goBack}
                style={styles.backButton}><Icon name="arrow-back" size={40} color={"#000"}/>
            </Pressable> 
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        source={require('../../assets/splash-icon.png')}
                        style={styles.headerImg}
                        alt= "Logo"
                    />

                    <Text style={styles.inputLabel}>FirstName</Text>
                    <TextInput style={styles.inputControl}
                    placeholder="FirstName"
                    value={form.firstname}
                    onChangeText={firstname => setForm ({...form, firstname})}/>

                    <Text style={styles.inputLabel}>LastName</Text>
                    <TextInput style={styles.inputControl}
                    placeholder="LastName"
                    value={form.lastname}
                    onChangeText={lastname => setForm ({...form, lastname})}/>

                    <Text style={styles.inputLabel}>UserName</Text>
                    <TextInput style={styles.inputControl}
                    placeholder="UserName"
                    value={form.username}
                    onChangeText={username => setForm ({...form, username})}/>

                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput style={styles.inputControl}
                    placeholder="Address"
                    value={form.address}
                    onChangeText={address => setForm ({...form, address})}/>

                    <Text style={styles.inputLabel}>PhoneNumber</Text>
                    <TextInput style={styles.inputControl}
                    placeholder="04xxxxxxxx"
                    value={form.phoneNumber}
                    onChangeText={phoneNumber => setForm ({...form, phoneNumber})}/>

                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput style={styles.inputControl}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="address@example.com"
                    value={form.email}
                    onchangeText={email => setForm ({ ...form, email })}
                    />

                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput 
                    secureTextEntry
                    style={styles.inputControl}
                    placeholder="Password"
                    value={form.password}
                    onchangeText={password => setForm ({ ...form, password })}
                    />
                    
                
                    <Button style= {styles.button} onPress= {() => {}}>
                        <Text style= {styles.textButton}>Create Account</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
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
        height: '20%',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: -20,
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
    },
    backButton: {
        position: 'relative',
        top: 50,
        left: 20,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#000'
    },
});
