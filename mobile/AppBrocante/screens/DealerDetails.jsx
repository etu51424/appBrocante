import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getArticlesByDealer } from "../fetchAPI/CRUD/articles.js"; // Assurez-vous que cette fonction existe
import { useSelector } from 'react-redux';

const DealerDetails = ({ route, navigation }) => {
    const { personId } = route.params; // Récupère le personId
    const [articles, setArticles] = useState([]); // État pour stocker les articles
    const langDict = useSelector((state) => state.language.langDict);

    useEffect(() => {
        // Fonction pour récupérer les articles associés au dealer
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getArticlesByDealer(personId); // Récupérer les articles via l'API
                setArticles(fetchedArticles); // Stocker les articles dans l'état
            } catch (error) {
                console.error(langDict.errWhLoadArts, error);
            }
        };

        fetchArticles(); // Appel à l'API lors de l'arrivée sur l'écran
    }, [personId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{langDict.dealerDetails}</Text>
            <Text style={styles.subtitle}>{langDict.personId}: {personId}</Text>

            {/* Vérification si la liste d'articles est vide */}
            {articles.length === 0 ? (
                <Text style={styles.noArticlesMessage}>{langDict.noRegisteredArticle}</Text>
            ) : (
                <ScrollView style={styles.articleList} contentContainerStyle={styles.articleListContent}>
                    {articles.map((article) => (
                        <View key={article.id} style={styles.articleItem}>
                            <Text style={styles.articleTitle}>{article.title}</Text>
                            <Text style={styles.articleDescription}>{article.description}</Text>
                            <Text style={styles.articleCost}>{langDict.price}: ${article.cost}</Text>
                            <Text style={styles.articleCondition}>{langDict.condition}: {article.condition}</Text>
                            <Text style={styles.articleDate}>{langDict.entryDate}: {new Date(article.entry_date).toLocaleDateString()}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

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
    articleList: {
        width: '100%',
        maxHeight: '60%',
    },
    articleListContent: {
        alignItems: 'center',
    },
    articleItem: {
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
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F2100',
    },
    articleDescription: {
        fontSize: 14,
        color: '#6B4E18',
        marginVertical: 5,
    },
    articleCost: {
        fontSize: 14,
        color: '#3F2100',
    },
    articleCondition: {
        fontSize: 14,
        color: '#3F2100',
    },
    articleDate: {
        fontSize: 12,
        color: '#6B4E18',
        marginTop: 5,
    },
    noArticlesMessage: {
        fontSize: 16,
        color: '#6B4E18',
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#6B4E18',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DealerDetails;
