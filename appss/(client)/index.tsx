import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, MapPin, Star, Truck, Clock } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

interface Transporter {
  id: string;
  name: string;
  rating: number;
  vehicleType: string;
  distance: string;
  eta: string;
  price: string;
  latitude: number;
  longitude: number;
  available: boolean;
}

const mockTransporters: Transporter[] = [
  {
    id: '1',
    name: 'Jean Mukendi',
    rating: 4.8,
    vehicleType: 'Moto',
    distance: '0.5 km',
    eta: '5 min',
    price: '2000 FC',
    latitude: -4.3317,
    longitude: 15.3139,
    available: true
  },
  {
    id: '2',
    name: 'Marie Tshala',
    rating: 4.9,
    vehicleType: 'Voiture',
    distance: '1.2 km',
    eta: '8 min',
    price: '5000 FC',
    latitude: -4.3297,
    longitude: 15.3159,
    available: true
  },
  {
    id: '3',
    name: 'Pierre Ngoy',
    rating: 4.7,
    vehicleType: 'Camion',
    distance: '2.1 km',
    eta: '12 min',
    price: '15000 FC',
    latitude: -4.3357,
    longitude: 15.3119,
    available: false
  }
];

export default function ClientHomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [transporters, setTransporters] = useState(mockTransporters);
  const [region, setRegion] = useState({
    latitude: -4.3317,
    longitude: 15.3139,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const availableTransporters = transporters.filter(t => t.available);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-primary-500 px-4 py-3">
          <Text className="text-white font-montserrat-bold text-xl mb-3">
            Trouvez votre transporteur
          </Text>
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3">
            <Search size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 font-montserrat"
              placeholder="Rechercher un transporteur..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Map - Half screen */}
        <View className="flex-1">
          <MapView
            style={{ flex: 1 }}
            region={region}
            onRegionChange={setRegion}
          >
            {availableTransporters.map((transporter) => (
              <Marker
                key={transporter.id}
                coordinate={{
                  latitude: transporter.latitude,
                  longitude: transporter.longitude,
                }}
                title={transporter.name}
                description={`${transporter.vehicleType} - ${transporter.distance}`}
              />
            ))}
          </MapView>
        </View>

        {/* Transporters List - Half screen */}
        <View className="flex-1 bg-gray-50">
          <View className="bg-white px-4 py-3 border-b border-gray-200">
            <Text className="font-montserrat-bold text-lg text-gray-900">
              Transporteurs disponibles ({availableTransporters.length})
            </Text>
          </View>

          <ScrollView className="flex-1 px-4 py-2">
            {availableTransporters.map((transporter) => (
              <TouchableOpacity
                key={transporter.id}
                onPress={() => router.push(`/order?transporterId=${transporter.id}`)}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text className="font-montserrat-bold text-lg text-gray-900 mr-2">
                        {transporter.name}
                      </Text>
                      <View className="flex-row items-center">
                        <Star size={16} color="#f59e0b" fill="#f59e0b" />
                        <Text className="font-montserrat-medium text-sm text-gray-700 ml-1">
                          {transporter.rating}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-2">
                      <Truck size={16} color="#6b7280" />
                      <Text className="font-montserrat text-gray-600 ml-2">
                        {transporter.vehicleType}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <MapPin size={16} color="#6b7280" />
                        <Text className="font-montserrat text-gray-600 ml-1">
                          {transporter.distance}
                        </Text>
                      </View>
                      
                      <View className="flex-row items-center">
                        <Clock size={16} color="#6b7280" />
                        <Text className="font-montserrat text-gray-600 ml-1">
                          {transporter.eta}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="font-montserrat-bold text-xl text-primary-500">
                      {transporter.price}
                    </Text>
                    <TouchableOpacity className="bg-primary-500 px-4 py-2 rounded-lg mt-2">
                      <Text className="text-white font-montserrat-semibold text-sm">
                        Commander
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}