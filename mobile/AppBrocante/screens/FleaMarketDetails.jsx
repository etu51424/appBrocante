import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { adaptedDateFormat } from "../utils/date";
import { useSelector } from 'react-redux';

const FleaMarketDetails = ({ route }) => {
    const { market } = route.params;
    const navigation = useNavigation(); 
    const langDict = useSelector((state) => state.language.langDict);

    const handleNavigateToInterests = () => {
        navigation.navigate('Interests', { fleaMarketId: market.id }); 
    };

    const handleNavigateToSlots = () => {
        navigation.navigate('Slots', { fleaMarketId: market.id }); 
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{market.title}</Text>
                <Text style={styles.theme}>{market.theme}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{langDict.address}:</Text>
                <Text style={styles.sectionContent}>{market.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dates:</Text>
                <Text style={styles.sectionContent}>
                    {adaptedDateFormat(market.date_start)} - {adaptedDateFormat(market.date_end)}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{langDict.averageRating}:</Text>
                <Text style={styles.sectionContent}>{market.average_rating} ⭐</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{langDict.numberOfReviews}:</Text>
                <Text style={styles.sectionContent}>{market.review_count}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleNavigateToInterests} style={styles.button}>
                    <Text style={styles.buttonText}>{langDict.viewInterests}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigateToSlots} style={styles.button}>
                    <Text style={styles.buttonText}>{langDict.viewSlots}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.buttonText}>{langDict.back}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#E5D289',
        padding: 40,
    },
    header: {
        backgroundColor: '#E5D289',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3F2100',
        textAlign: 'center',
    },
    theme: {
        fontSize: 18,
        color: '#6B4E18',
        textAlign: 'center',
        marginTop: 5,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#FFF9E6',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F2100',
        marginBottom: 5,
    },
    sectionContent: {
        fontSize: 16,
        color: '#6B4E18',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FleaMarketDetails;
