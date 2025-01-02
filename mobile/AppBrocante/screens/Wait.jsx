import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const Wait = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />

      {/* logo "Loading..." */}
      <ActivityIndicator size="large" color="#000" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5D289',
  },
  logo: {
    width: '25%', 
    height: '20%',
    marginBottom: 20,
  },
  loader: {
    marginTop: 10,
  },
});

export default Wait;