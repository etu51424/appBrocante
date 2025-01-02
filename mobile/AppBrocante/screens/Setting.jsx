import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Switch,
} from 'react-native';
import { changeLanguage } from "../store/slice/language";
import { useSelector, useDispatch } from "react-redux";

export default function LanguageSelector() {
  const languages = [
    { label: 'English', value: 'en', flag: require('../assets/en.png') },
    { label: 'Français', value: 'fr', flag: require('../assets/fr.png') },
    { label: 'Nederlands', value: 'nl', flag: require('../assets/nl.png') },
  ];

  // Langue par défaut : anglais
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // État pour le mode clair/sombre
  const [isDarkMode, setIsDarkMode] = useState(false);

  // État pour capturer la largeur du bouton
  const [buttonWidth, setButtonWidth] = useState(0);

  // Fonction pour sélectionner une langue
  const selectLanguage = (language) => {
    handleChangeLanguage(language);
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

  const dispatch = useDispatch();
  
  const handleChangeLanguage = (lang) => {
    // update la langue globalement. Passe la nouvelle langue. changeLanguage change de dictionnaire. 
    // puis dispatch ce nouveau state.langDict et state.Language sur toutes les autres pages.
    // lang est un obj contenant le label, la value (en, nl, fr) et un flag

    console.log("Dispatching language change to (lang.value) directly :", lang.value); // Log only the language code
    console.log("Dispatching language change to (as an { value : language.value object) }):", { value: lang.value });
    console.log("Langue contient plusieurs trucs:", lang);
    dispatch(changeLanguage({value: lang.value}));
  };

  const langDict = useSelector((state) => state.language.langDict);
  console.log('langDict from Redux:', langDict);

  return (
    <View style={styles.container}>
      {/* Ligne unique pour "Select a Language" et le bouton déroulant */}
      <View style={styles.row}>
        <Text style={styles.label}>{langDict.selectALanguage}</Text>

        {/* Bouton pour afficher/masquer la liste */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownOpen(!isDropdownOpen)}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setButtonWidth(width); // Capturer la largeur du bouton
          }}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedLanguage ? selectedLanguage.label : 'Choose...'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Liste déroulante */}
      {isDropdownOpen && (
        <FlatList
          data={languages}
          keyExtractor={(item) => item.value}
          style={[styles.dropdownList, { width: buttonWidth }]} // Appliquer la largeur du bouton
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.languageItem}
              onPress={() => selectLanguage(item)}
            >
              <Image source={item.flag} style={styles.flag} />
              <Text style={styles.languageText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Ligne pour le mode clair/sombre */}
      <View style={styles.row}>
        <Text style={styles.label}>{langDict.darkMode}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode((prevMode) => !prevMode)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40,
    padding: 20,
    backgroundColor: '#E5D289',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Prend la moitié gauche de l'écran
  },
  dropdownButton: {
    backgroundColor: '#F0E6B3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1, // Prend la moitié droite de l'écran
    marginLeft: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Centrer le texte
  },
  dropdownList: {
    backgroundColor: '#F0E6B3',
    borderRadius: 8,
    elevation: 3, // Ombre (Android)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: 150, // Limiter la hauteur pour le défilement
    marginTop: 10,
    alignSelf: 'flex-end', // Aligner à dro
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
});
