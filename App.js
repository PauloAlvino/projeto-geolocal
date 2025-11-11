import React, { useState, useEffect } from 'react';
import { Button } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

import Maps from './src/pages/Maps';
import Cadastro from './src/pages/Cadastro'; 

const Stack = createNativeStackNavigator();

export default function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'A permissão de localização é necessária.');
      }
    })();
  }, []);

  const handleRegisterUser = async (formData) => {
    const fullAddress = `${formData.street}, ${formData.number}, ${formData.city}, ${formData.state}, Brasil`;
    
    try {
      const geocodedLocations = await Location.geocodeAsync(fullAddress);

      if (geocodedLocations && geocodedLocations.length > 0) {
        const { latitude, longitude } = geocodedLocations[0];

        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          address: formData,
          latitude,
          longitude,
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
        
        Alert.alert('Sucesso!', `${formData.name} foi adicionado ao mapa.`);
        return true; 

      } else {
        Alert.alert('Erro', 'Não foi possível encontrar as coordenadas para o endereço informado.');
        return false;
      }
    } catch (error) {
      Alert.alert('Erro no Servidor', 'Ocorreu um erro ao buscar as coordenadas.');
      return false;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Cadastro" 
      >
        
        <Stack.Screen 
          name="Cadastro" 
          options={{ title: 'Cadastrar Endereço' }}
        >
          {(props) => <Cadastro {...props} onRegisterUser={handleRegisterUser} />}
        </Stack.Screen>

        <Stack.Screen 
          name="Maps"
          options={({ navigation }) => ({
            title: 'Mapa de Usuários',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Cadastro')}
                title="Novo"
                color="#007AFF"
              />
            ),
          })}
        >
          {(props) => <Maps {...props} users={users} />} 
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}