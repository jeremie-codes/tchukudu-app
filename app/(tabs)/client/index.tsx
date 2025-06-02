import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Link, router } from 'expo-router';
import { MapPin, Truck, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { OrderForm } from '@/components/client/OrderForm';

export default function ClientHomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [transporteurs, setTransporteurs] = useState([
    { id: 1, name: 'Jean Dupont', type: 'Express', rating: 4.8, latitude: 0, longitude: 0, available: true },
    { id: 2, name: 'Marie Dubois', type: 'Marchandises', rating: 4.5, latitude: 0, longitude: 0, available: true },
    { id: 3, name: 'Pierre Martin', type: 'Express', rating: 4.9, latitude: 0, longitude: 0, available: true },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Simulate transporters around user's location
      if (location) {
        const updatedTransporteurs = transporteurs.map((t, index) => {
          // Random offsets to create transporters around the user
          const latOffset = (Math.random() - 0.5) * 0.01;
          const lngOffset = (Math.random() - 0.5) * 0.01;
          
          return {
            ...t,
            latitude: location.coords.latitude + latOffset,
            longitude: location.coords.longitude + lngOffset
          };
        });
        setTransporteurs(updatedTransporteurs);
      }
    })();
  }, []);

  const handleOrderSubmit = (orderData: any) => {
    console.log('Order submitted:', orderData);
    // Navigate to payment screen with order data
    router.push({
      pathname: '/client/payment',
      params: { orderId: 'new' }
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4">
        <Text className="text-2xl font-montserrat-bold text-white">Espace Client</Text>
      </View>

      {/* Map View */}
      <View className="h-1/3">
        {errorMsg ? (
          <View className="flex-1 justify-center items-center bg-gray-100">
            <AlertCircle size={32} color={Colors.danger} />
            <Text className="text-center mt-2 font-montserrat text-gray-800">{errorMsg}</Text>
          </View>
        ) : !location ? (
          <View className="flex-1 justify-center items-center bg-gray-100">
            <Text className="text-center font-montserrat text-gray-800">Chargement de la carte...</Text>
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {/* User marker */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Votre position"
            >
              <View className="bg-blue-500 p-2 rounded-full border-2 border-white">
                <MapPin size={18} color="#FFFFFF" />
              </View>
            </Marker>

            {/* Transporters markers */}
            {transporteurs.map((transporteur) => (
              <Marker
                key={transporteur.id}
                coordinate={{
                  latitude: transporteur.latitude,
                  longitude: transporteur.longitude,
                }}
                title={transporteur.name}
                description={`Type: ${transporteur.type}, Note: ${transporteur.rating}/5`}
              >
                <View className="bg-primary p-2 rounded-full border-2 border-white">
                  <Truck size={18} color="#FFFFFF" />
                </View>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Order Form */}
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-xl font-montserrat-bold text-gray-800 mb-4">
          Commander un transport
        </Text>
        
        <OrderForm onSubmit={handleOrderSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});