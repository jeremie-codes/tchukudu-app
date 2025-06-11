import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, MapPin, Star, Truck, Clock, Eye } from 'lucide-react-native';
import MapView from 'react-native-maps';
import { useRouter } from 'expo-router';
import TransporterMarker from '@/components/TransporterMarker';

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
    available: true,
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
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
    available: true,
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
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
    available: false,
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Grace Mbuyi',
    rating: 4.6,
    vehicleType: 'Moto',
    distance: '1.8 km',
    eta: '10 min',
    price: '2500 FC',
    latitude: -4.3337,
    longitude: 15.3179,
    available: true,
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Paul Kabongo',
    rating: 4.9,
    vehicleType: 'Voiture',
    distance: '0.8 km',
    eta: '6 min',
    price: '4500 FC',
    latitude: -4.3277,
    longitude: 15.3199,
    available: true,
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Région initiale stable - définie en dehors du composant
const INITIAL_REGION = {
  latitude: -4.3317,
  longitude: 15.3139,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

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

  const mapRef = useRef<MapView>(null);
  
  // Mémoriser les transporteurs disponibles pour éviter les recalculs
  const availableTransporters = React.useMemo(() => 
    transporters.filter(t => t.available), 
    [transporters]
  );

  // Callbacks mémorisés pour éviter les re-créations
  const handleTransporterPress = useCallback((transporterId: string) => {
    router.push(`/others/client/transporter-details?transporterId=${transporterId}`);
  }, [router]);

  const handleMarkerPress = useCallback((transporterId: string) => {
    handleTransporterPress(transporterId);
  }, [handleTransporterPress]);

  // Éviter les mises à jour de région qui causent le tremblement
  const onRegionChangeComplete = useCallback((region: any) => {
    // Ne pas mettre à jour l'état de la région pour éviter les re-rendus
    // La région est gérée par la carte elle-même
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        {/* <View className="bg-yellow-500 px-4 py-3 pt-12">
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
        </View> */}

        {/* Map - Half screen */}
        <View className="flex-1">
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={INITIAL_REGION}
            onRegionChangeComplete={onRegionChangeComplete}
            showsUserLocation={false}
            showsMyLocationButton={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            {availableTransporters.map((transporter) => (
              <TransporterMarker
                key={transporter.id}
                transporter={transporter}
                onPress={() => handleMarkerPress(transporter.id)}
              />
            ))} 
          </MapView>
        </View>

        {/* Transporters List - Half screen */}
        <View className="flex-1 bg-gray-50" style={{ paddingBottom: 0 }}>
          <View className="bg-white px-4 py-3 border-b border-gray-200">
            <Text className="font-montserrat-bold text-lg text-gray-900">
              Transporteurs disponibles ({availableTransporters.length})
            </Text>
          </View>

          <ScrollView className="flex-1 px-4 pt-4" >
            {availableTransporters.map((transporter) => (
              <TouchableOpacity
                  key={transporter.id}
                  onPress={() => handleTransporterPress(transporter.id)}
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

                    <View className="flex-row items-center justify-between pr-2">
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
                    <Text className="font-montserrat-bold text-xl text-yellow-500">
                      {transporter.price}
                    </Text>
                    <TouchableOpacity className="bg-gray-800 px-3 py-2 rounded-lg mt-2 flex-row items-center"
                      onPress={() => handleTransporterPress(transporter.id)}>
                      <Eye size={16} color="white" />
                      <Text className="text-white font-montserrat-semibold text-sm ml-1">
                        Voir détails
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ height: 90 }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}