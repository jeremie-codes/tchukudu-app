import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { User, LogIn } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TransporteurHomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transporteur, setTransporteur] = useState({
    id: null,
    name: '',
    vehicle: '',
    isAvailable: false,
    rating: 0,
    completedRides: 0
  });
  
  useEffect(() => {
    // Check if user is already logged in (would use AsyncStorage in real app)
    // This is just a mock for demo purposes
    const checkLoginStatus = async () => {
      // Simulate getting logged in status
      const mockLoggedIn = true; // Set to false for demo purposes
      
      setIsLoggedIn(mockLoggedIn);
      
      if (mockLoggedIn) {
        // Fetch transporteur profile data
        setTransporteur({
          id: 123,
          name: 'Jean Dupont',
          vehicle: 'Camion 3T',
          isAvailable: true,
          rating: 4.8,
          completedRides: 152
        });
      }
    };
    
    checkLoginStatus();
  }, []);
  
  const handleLoginPress = () => {
    router.push('/transporteur/login');
  };
  
  const handleToggleAvailability = () => {
    // In a real app, this would make an API call to update status
    setTransporteur(prev => ({
      ...prev,
      isAvailable: !prev.isAvailable
    }));
    
    Alert.alert(
      'Statut mis à jour',
      `Vous êtes maintenant ${!transporteur.isAvailable ? 'disponible' : 'indisponible'} pour de nouvelles courses.`
    );
  };
  
  if (!isLoggedIn) {
    return (
      <View className="flex-1 bg-white">
        <View className="bg-primary pt-12 pb-4 px-4">
          <Text className="text-2xl font-montserrat-bold text-white">Espace Transporteur</Text>
        </View>
        
        <View className="flex-1 justify-center items-center p-6">
          <View className="bg-gray-100 rounded-xl p-8 w-full items-center">
            <User size={64} color={Colors.primary} />
            
            <Text className="text-xl font-montserrat-bold text-gray-800 mt-6 mb-2 text-center">
              Connexion requise
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-8 text-center">
              Vous devez vous connecter pour accéder à l'espace transporteur
            </Text>
            
            <TouchableOpacity
              className="bg-primary py-3 px-6 rounded-lg flex-row items-center"
              onPress={handleLoginPress}
              activeOpacity={0.7}
            >
              <LogIn size={20} color="#FFFFFF" />
              <Text className="font-montserrat-bold text-white ml-2">
                Se connecter
              </Text>
            </TouchableOpacity>
            
            <Link href="/transporteur/signup" asChild>
              <TouchableOpacity className="mt-4" activeOpacity={0.7}>
                <Text className="font-montserrat text-primary">
                  Pas encore inscrit? Créer un compte
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary pt-12 pb-4 px-4">
        <Text className="text-2xl font-montserrat-bold text-white">Tableau de bord</Text>
      </View>
      
      <View className="p-4">
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="font-montserrat-medium text-lg text-gray-800 mb-2">
            Bonjour, {transporteur.name}
          </Text>
          <Text className="font-montserrat text-gray-600">
            Véhicule: {transporteur.vehicle}
          </Text>
          
          <View className="flex-row items-center mt-2">
            <Text className="font-montserrat text-gray-600 mr-2">
              Note:
            </Text>
            <Text className="font-montserrat-bold text-primary">
              {transporteur.rating}
            </Text>
            <Text className="font-montserrat text-gray-600 ml-1">
              /5
            </Text>
          </View>
          
          <View className="flex-row items-center mt-1">
            <Text className="font-montserrat text-gray-600 mr-2">
              Courses complétées:
            </Text>
            <Text className="font-montserrat-bold text-gray-900">
              {transporteur.completedRides}
            </Text>
          </View>
        </View>
        
        <View className="mb-6">
          <Text className="font-montserrat-medium text-lg text-gray-800 mb-3">
            Statut de disponibilité
          </Text>
          
          <TouchableOpacity
            className={`py-4 rounded-lg items-center ${
              transporteur.isAvailable ? 'bg-secondary' : 'bg-gray-400'
            }`}
            onPress={handleToggleAvailability}
            activeOpacity={0.7}
          >
            <Text className="font-montserrat-bold text-white">
              {transporteur.isAvailable ? 'Disponible' : 'Indisponible'}
            </Text>
          </TouchableOpacity>
          
          <Text className="font-montserrat text-sm text-gray-500 mt-2 text-center">
            {transporteur.isAvailable
              ? 'Vous êtes visible pour les clients et pouvez recevoir des commandes'
              : 'Vous êtes invisible pour les clients et ne recevrez pas de commandes'}
          </Text>
        </View>
        
        <View className="bg-primary-light rounded-xl p-4">
          <Text className="font-montserrat-medium text-lg text-gray-800 mb-3">
            Accès rapide
          </Text>
          
          <Link href="/transporteur/carte" asChild>
            <TouchableOpacity
              className="bg-white py-3 rounded-lg items-center mb-3 border border-gray-200"
              activeOpacity={0.7}
            >
              <Text className="font-montserrat-medium text-gray-800">
                Voir la carte
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/transporteur/courses" asChild>
            <TouchableOpacity
              className="bg-white py-3 rounded-lg items-center border border-gray-200"
              activeOpacity={0.7}
            >
              <Text className="font-montserrat-medium text-gray-800">
                Mes courses
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}