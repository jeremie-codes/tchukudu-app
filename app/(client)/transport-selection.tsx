import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ArrowRight, MapPin, Truck, Package, Clock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

interface TransportType {
  id: string;
  name: string;
  icon: any;
  description: string;
  capacity: string;
  estimatedPrice: string;
}

const transportTypes: TransportType[] = [
  {
    id: 'moto',
    name: 'Moto',
    icon: Package,
    description: 'Livraison rapide pour petits colis',
    capacity: 'Jusqu\'à 50 kg',
    estimatedPrice: '1500-3000 FC'
  },
  {
    id: 'voiture',
    name: 'Voiture',
    icon: Package,
    description: 'Transport standard pour colis moyens',
    capacity: 'Jusqu\'à 200 kg',
    estimatedPrice: '3000-8000 FC'
  },
  {
    id: 'camionnette',
    name: 'Camionnette',
    icon: Truck,
    description: 'Pour gros colis et déménagements',
    capacity: 'Jusqu\'à 1 tonne',
    estimatedPrice: '8000-20000 FC'
  },
  {
    id: 'camion',
    name: 'Camion',
    icon: Truck,
    description: 'Transport de marchandises lourdes',
    capacity: 'Jusqu\'à 5 tonnes',
    estimatedPrice: '20000-50000 FC'
  }
];

export default function TransportSelectionScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');

  const handleContinue = () => {
    if (!selectedTransport || !pickup || !destination) {
      Alert.alert('Information manquante', 'Veuillez remplir tous les champs pour continuer');
      return;
    }

    // Passer les paramètres à la carte
    router.push({
      pathname: '/(client)',
      params: {
        transportType: selectedTransport,
        pickup,
        destination,
        urgency
      }
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={['#f59e0b', '#fbbf24', '#ffffff']}
        className="flex-1"
      >
        {/* Header avec salutation */}
        <View className="px-6 py-8 pt-16">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
              <User size={24} color="white" />
            </View>
            <View>
              <Text className="text-white font-montserrat text-lg">
                {getGreeting()},
              </Text>
              <Text className="text-white font-montserrat-bold text-xl">
                {user?.name?.split(' ')[0] || 'Client'}
              </Text>
            </View>
          </View>
          
          <Text className="text-white font-montserrat-semibold text-lg mb-2">
            Où souhaitez-vous envoyer votre colis ?
          </Text>
          <Text className="text-white/80 font-montserrat">
            Choisissez votre type de transport et votre destination
          </Text>
        </View>

        <ScrollView className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
          {/* Type de transport */}
          <View className="mb-8">
            <Text className="font-montserrat-bold text-xl text-gray-900 mb-4">
              Type de transport
            </Text>
            
            <View className="space-y-3">
              {transportTypes.map((transport) => {
                const IconComponent = transport.icon;
                return (
                  <TouchableOpacity
                    key={transport.id}
                    onPress={() => setSelectedTransport(transport.id)}
                    className={`p-4 rounded-xl border-2 ${
                      selectedTransport === transport.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                        selectedTransport === transport.id
                          ? 'bg-primary-100'
                          : 'bg-gray-100'
                      }`}>
                        <IconComponent 
                          size={24} 
                          color={selectedTransport === transport.id ? '#f59e0b' : '#6b7280'} 
                        />
                      </View>
                      <View className="flex-1">
                        <Text className={`font-montserrat-bold text-lg ${
                          selectedTransport === transport.id ? 'text-primary-500' : 'text-gray-900'
                        }`}>
                          {transport.name}
                        </Text>
                        <Text className="font-montserrat text-sm text-gray-600 mb-1">
                          {transport.description}
                        </Text>
                        <View className="flex-row items-center justify-between">
                          <Text className="font-montserrat text-xs text-gray-500">
                            {transport.capacity}
                          </Text>
                          <Text className="font-montserrat-semibold text-sm text-primary-500">
                            {transport.estimatedPrice}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Urgence */}
          <View className="mb-8">
            <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
              Urgence
            </Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setUrgency('standard')}
                className={`flex-1 p-4 rounded-xl border-2 ${
                  urgency === 'standard'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View className="items-center">
                  <Clock size={24} color={urgency === 'standard' ? '#f59e0b' : '#6b7280'} />
                  <Text className={`font-montserrat-semibold mt-2 ${
                    urgency === 'standard' ? 'text-primary-500' : 'text-gray-700'
                  }`}>
                    Standard
                  </Text>
                  <Text className="font-montserrat text-xs text-gray-600 text-center mt-1">
                    Livraison normale
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setUrgency('express')}
                className={`flex-1 p-4 rounded-xl border-2 ${
                  urgency === 'express'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View className="items-center">
                  <Clock size={24} color={urgency === 'express' ? '#f59e0b' : '#6b7280'} />
                  <Text className={`font-montserrat-semibold mt-2 ${
                    urgency === 'express' ? 'text-primary-500' : 'text-gray-700'
                  }`}>
                    Express
                  </Text>
                  <Text className="font-montserrat text-xs text-gray-600 text-center mt-1">
                    Livraison rapide (+30%)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Adresses */}
          <View className="mb-8">
            <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
              Adresses
            </Text>
            
            <View className="space-y-4">
              <View>
                <Text className="font-montserrat-semibold text-gray-900 mb-2">
                  Point de récupération
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
                  <MapPin size={20} color="#6b7280" />
                  <TextInput
                    className="flex-1 ml-3 font-montserrat"
                    placeholder="D'où voulez-vous expédier ?"
                    value={pickup}
                    onChangeText={setPickup}
                  />
                </View>
              </View>

              <View>
                <Text className="font-montserrat-semibold text-gray-900 mb-2">
                  Destination
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
                  <MapPin size={20} color="#f59e0b" />
                  <TextInput
                    className="flex-1 ml-3 font-montserrat"
                    placeholder="Où voulez-vous livrer ?"
                    value={destination}
                    onChangeText={setDestination}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Adresses suggérées */}
          <View className="mb-8">
            <Text className="font-montserrat-semibold text-gray-900 mb-3">
              Adresses fréquentes
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-3">
                {[
                  'Gombe, Kinshasa',
                  'Lemba, Kinshasa',
                  'Bandalungwa, Kinshasa',
                  'Matete, Kinshasa',
                  'Kintambo, Kinshasa'
                ].map((address) => (
                  <TouchableOpacity
                    key={address}
                    onPress={() => {
                      if (!pickup) {
                        setPickup(address);
                      } else if (!destination) {
                        setDestination(address);
                      }
                    }}
                    className="bg-gray-100 px-4 py-2 rounded-full"
                  >
                    <Text className="font-montserrat text-gray-700 text-sm">
                      {address}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Bouton continuer */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selectedTransport || !pickup || !destination}
            className={`rounded-xl py-4 mb-8 ${
              selectedTransport && pickup && destination
                ? 'bg-primary-500'
                : 'bg-gray-300'
            }`}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white font-montserrat-bold text-lg mr-2">
                Voir les transporteurs
              </Text>
              <ArrowRight size={20} color="white" />
            </View>
          </TouchableOpacity>

          <View style={{ height: 100 }}></View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}