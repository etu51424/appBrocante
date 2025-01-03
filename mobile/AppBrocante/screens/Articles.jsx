import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { createArticle, getArticlesByDealer, deleteArticle, updateArticle } from "../fetchAPI/CRUD/articles";
import { useSelector } from "react-redux";
import { selectPersonId } from "../store/slice/person";

export default function Articles({ navigation }) { 
    const [articles, setArticles] = useState([]);
    const [isAdding, setIsAdding] = useState(false); 
    const [isEditing, setIsEditing] = useState(false); 
    const [selectedArticle, setSelectedArticle] = useState(null); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [condition, setCondition] = useState('');
    const personId = useSelector(selectPersonId);

    const langDict = useSelector((state) => state.language.langDict);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticlesByDealer(personId);
                setArticles(articlesData);
            } catch (error) {
                console.error(langDict.errorGetArticles, error);
            }
        };
        fetchArticles();
    }, [personId]);

    const renderArticle = ({ item }) => (
        <View style={styles.articleCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.info}>{langDict.price}: {item.cost} €</Text>
            <Text style={styles.info}>{langDict.condition}: {item.condition}</Text>

            {/* Bouton pour modifier l'article */}
            <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEditArticle(item)}
            >
                <Text style={styles.buttonText}>{langDict.edit}</Text>
            </TouchableOpacity>

            {/* Bouton pour supprimer l'article */}
            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeleteArticle(item.id)}
            >
                <Text style={styles.buttonText}>{langDict.delete}</Text>
            </TouchableOpacity>
        </View>
    );

    const handleAddArticle = async () => {
        if (!title || !description || !cost || !condition) {
            Alert.alert(langDict.error, langDict.plsFillInAllFields);
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

            const addedArticle = await createArticle(newArticle); 
            if (addedArticle) {
                Alert.alert(langDict.success, langDict.articleSuccess);
                setArticles((prevArticles) => [addedArticle, ...prevArticles]);
                setIsAdding(false); // cacher le formulaire après l'ajout 
            } else {
                Alert.alert(langDict.error, langDict.impossibleToAddArticle);
            }
        } catch (error) {
            console.error(langDict.errorWhenAddingArticle, error);
        }
    };

    const handleDeleteArticle = async (articleId) => {
        try {
            await deleteArticle(articleId);
            setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
            Alert.alert(langDict.success, '');
        } catch (error) {
            console.error(langDict.articleDeleteSuccess, error);
            Alert.alert(langDict.error, langDict.impDelArt);
        }
    };

    const handleEditArticle = (article) => {
        setSelectedArticle(article); 
        setTitle(article.title);
        setDescription(article.description);
        setCost(article.cost.toString());
        setCondition(article.condition);
        // affiche le formulaire pour que l'user puisse edit
        setIsEditing(true); 
    };

    const handleUpdateArticle = async () => {
        if (!title || !description || !cost || !condition) {
            Alert.alert(langDict.error, langDict.plsFillInAllFields);
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
            const response = await updateArticle(updatedArticle); 
            if (response) {
                setArticles((prevArticles) =>
                    prevArticles.map((article) =>
                        article.id === selectedArticle.id ? updatedArticle : article
                    )
                );
                Alert.alert(langDict.success, langDict.artDelSuc);
                setIsEditing(false);
            }
        } catch (error) {
            console.error(langDict.errWhEditArt, error);
            Alert.alert(langDict.error, langDict.impEdiArt);
        }
    };

    // annule les modifs
    const handleBack = () => {
        setIsEditing(false); 
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
                <Text style={styles.buttonText}>{langDict.addAnArticle}</Text>
            </TouchableOpacity>

            {isAdding && (
                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>{langDict.addANewArticle}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.title}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.description}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.price}
                        value={cost}
                        onChangeText={setCost}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.condition}
                        value={condition}
                        onChangeText={setCondition}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleAddArticle}>
                            <Text style={styles.buttonText}>{langDict.add}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>{langDict.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {isEditing && (
                <View style={styles.formContainer}>
                    <Text style={styles.formHeader}>{langDict.ediArt}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.title}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.description}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.price}
                        value={cost}
                        onChangeText={setCost}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={langDict.condition}
                        value={condition}
                        onChangeText={setCondition}
                    />
                    <View style={styles.formButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdateArticle}>
                            <Text style={styles.buttonText}>{langDict.edit}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>{langDict.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleBackNav}>
                <Text style={styles.buttonText}>{langDict.back}</Text>
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
        backgroundColor: "#2196F3",
    },
    deleteButton: {
        backgroundColor: "#F44336", 
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

