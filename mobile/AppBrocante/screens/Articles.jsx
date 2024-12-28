import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { createArticle, getArticlesByDealer, deleteArticle, updateArticle } from "../fetchAPI/CRUD/articles";
import { useSelector } from "react-redux";
import { selectPersonId } from "../store/slice/person"; // API fictive pour récupérer les articles

export default function Articles({ navigation }) { // Ajout de 'navigation' pour revenir à l'écran précédent
    const [articles, setArticles] = useState([]);
    const [isAdding, setIsAdding] = useState(false); // Etat pour afficher ou masquer le formulaire d'ajout d'article
    const [isEditing, setIsEditing] = useState(false); // Etat pour afficher ou masquer le formulaire de modification
    const [selectedArticle, setSelectedArticle] = useState(null); // Article sélectionné pour modification
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [condition, setCondition] = useState('');
    const personId = useSelector(selectPersonId);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticlesByDealer(personId); // Remplacez par une requête réelle
                setArticles(articlesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            }
        };
        fetchArticles();
    }, [personId]);

    const renderArticle = ({ item }) => (
        <View style={styles.articleCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.info}>Prix: {item.cost} €</Text>
            <Text style={styles.info}>Condition: {item.condition}</Text>

            {/* Bouton pour modifier l'article */}
            <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEditArticle(item)}
            >
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>

            {/* Bouton pour supprimer l'article */}
            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeleteArticle(item.id)}
            >
                <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );

    const handleAddArticle = async () => {
        if (!title || !description || !cost || !condition) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
            return;
        }

        try {
            const newArticle = {
                personId,
                title,
                description,
                entryDate: new Date().toLocaleDateString('fr-CA'),
                cost: parseFloat(cost),
                condition,
            };
            // Remplacer par la fonction d'ajout d'article réelle
            const addedArticle = await createArticle(newArticle); // Fonction à définir pour ajouter un article via l'API
            if (addedArticle) {
                Alert.alert('Succès', 'Article ajouté avec succès.');
                setArticles((prevArticles) => [addedArticle, ...prevArticles]);
                setIsAdding(false); // Masquer le formulaire après ajout
            } else {
                Alert.alert('Erreur', 'Impossible d\'ajouter l\'article.');
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article:", error);
        }
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            // Appel à la fonction pour supprimer un article via l'API
            await deleteArticle(articleId);
            setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
            Alert.alert('Succès', 'Article supprimé avec succès.');
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:", error);
            Alert.alert('Erreur', 'Impossible de supprimer l\'article.');
        }
    };

    const handleEditArticle = (article) => {
        setSelectedArticle(article); // Sélectionner l'article pour la modification
        setTitle(article.title);
        setDescription(article.description);
        setCost(article.cost.toString());
        setCondition(article.condition);
        setIsEditing(true); // Afficher le formulaire de modification
    };

    const handleUpdateArticle = async () => {
        if (!title || !description || !cost || !condition) {
            Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
            return;
        }

        try {
            const updatedArticle = {
                ...selectedArticle,
                title,
                description,
                cost: parseFloat(cost),
                condition,
            };
            const response = await updateArticle(updatedArticle); // Fonction pour mettre à jour un article via l'API
            if (response) {
                setArticles((prevArticles) =>
                    prevArticles.map((article) =>
                        article.id === selectedArticle.id ? updatedArticle : article
                    )
                );
                Alert.alert('Succès', 'Article modifié avec succès.');
                setIsEditing(false); // Masquer le formulaire après modification
            }
        } catch (error) {
            console.error("Erreur lors de la modification de l'article:", error);
            Alert.alert('Erreur', 'Impossible de modifier l\'article.');
        }
    };

    const handleBack = () => {
        setIsEditing(false); // Annuler l'ajout/modification et revenir à la liste des articles
        setIsAdding(false);
    };

    const handleBackNav = () =>{
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={(item) => item.id.toString()}
            />

            <TouchableOpacity style={styles.button} onPress={() => setIsAdding(true)}>
                <Text style={styles.buttonText}>Ajouter un article</Text>
            </TouchableOpacity>

            {isAdding && (
                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>Ajouter un nouvel article</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Titre"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prix"
                        value={cost}
                        onChangeText={setCost}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Condition"
                        value={condition}
                        onChangeText={setCondition}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleAddArticle}>
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {isEditing && (
                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>Modifier l'article</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Titre"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prix"
                        value={cost}
                        onChangeText={setCost}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Condition"
                        value={condition}
                        onChangeText={setCondition}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdateArticle}>
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Bouton Retour */}
            <TouchableOpacity style={styles.button} onPress={handleBackNav}>
                <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#E5D289",
    },
    articleCard: {
        backgroundColor: "#F0E6B3",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3F2100",
    },
    description: {
        fontSize: 16,
        color: "#3F2100",
        marginVertical: 4,
    },
    info: {
        fontSize: 14,
        color: "#3F2100",
    },
    button: {
        backgroundColor: "#FFC107",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    editButton: {
        backgroundColor: "#2196F3", // Couleur bleue pour le bouton de modification
    },
    deleteButton: {
        backgroundColor: "#F44336", // Couleur rouge pour le bouton de suppression
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    formContainer: {
        marginTop: 20,
        backgroundColor: "#F0E6B3",
        padding: 16,
        borderRadius: 8,
    },
    formHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#3F2100",
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 16,
        color: "#333",
    },
    formButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

