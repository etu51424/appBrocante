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

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);


  const selectLanguage = (language) => {
    handleChangeLanguage(language);
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

  const dispatch = useDispatch();
  
  const handleChangeLanguage = (lang) => {
    // update la langue globalement.
    // puis dispatch ce nouveau state
    // lang est un obj contenant le label, la value (en, nl, fr) et un flag

    dispatch(changeLanguage({value: lang.value}));
  };

  const langDict = useSelector((state) => state.language.langDict);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{langDict.selectALanguage}</Text>

        {/*bouton pour afficher/cacher la liste*/}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownOpen(!isDropdownOpen)}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setButtonWidth(width);
          }}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedLanguage ? selectedLanguage.label : langDict.chooseLanguage}
          </Text>
        </TouchableOpacity>
      </View>

      {isDropdownOpen && (
        <FlatList
          data={languages}
          keyExtractor={(item) => item.value}
          style={[styles.dropdownList, { width: buttonWidth }]}
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
    flex: 1, // 1/2 écran. Est en premier donc à gauche
  },
  dropdownButton: {
    backgroundColor: '#F0E6B3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1, // prend la moitié de l'espace à droite
    marginLeft: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', 
  },
  dropdownList: {
    backgroundColor: '#F0E6B3',
    borderRadius: 8,
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: 150, //quand l'useur scroll, ceci est la hauteur maximale
    marginTop: 10,
    alignSelf: 'flex-end', 
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
