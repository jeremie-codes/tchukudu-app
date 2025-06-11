import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Power, Navigation, Clock, Package, MapPin } from 'lucide-react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface IncomingOrder {
  id: string;
  clientName: string;
  pickup: string;
  destination: string;
  price: string;
  distance: string;
  packageType: string;
}

export default function TransporterHomeScreen() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasActiveRoute, setHasActiveRoute] = useState(false);
  const [incomingOrder, setIncomingOrder] = useState<IncomingOrder | null>(null);

  // Simulate incoming order
  useEffect(() => {
    if (isAvailable && !incomingOrder) {
      const timer = setTimeout(() => {
        setIncomingOrder({
          id: '1',
          clientName: 'Marie Kasongo',
          pickup: 'Gombe, Kinshasa',
          destination: 'Lemba, Kinshasa',
          price: '3500 FC',
          distance: '5.2 km',
          packageType: 'Colis express'
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isAvailable, incomingOrder]);

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    if (isAvailable) {
      setIncomingOrder(null);
    }
  };

  const handleAcceptOrder = () => {
    Alert.alert(
      'Commande acceptée',
      'Le client a été notifié. Dirigez-vous vers le point de récupération.',
      [
        {
          text: 'Activer le départ',
          onPress: () => {
            setHasActiveRoute(true);
            setIncomingOrder(null);
          }
        }
      ]
    );
  };

  const handleDeclineOrder = () => {
    setIncomingOrder(null);
    Alert.alert('Commande refusée', 'Une nouvelle commande vous sera proposée bientôt.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary-500 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-montserrat-bold text-xl">
            Tableau de bord
          </Text>
          <TouchableOpacity
            onPress={toggleAvailability}
            className={`px-4 py-2 rounded-xl flex-row items-center ${
              isAvailable ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <Power size={16} color="white" />
            <Text className="text-white font-montserrat-semibold ml-2">
              {isAvailable ? 'Disponible' : 'Indisponible'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map */}
      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -4.3317,
            longitude: 15.3139,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {hasActiveRoute && (
            <>
              <Marker
                coordinate={{ latitude: -4.3317, longitude: 15.3139 }}
                title="Point de récupération"
                pinColor="green"
              />
              <Marker
                coordinate={{ latitude: -4.3297, longitude: 15.3159 }}
                title="Destination"
                pinColor="red"
              />
              <Polyline
                coordinates={[
                  { latitude: -4.3317, longitude: 15.3139 },
                  { latitude: -4.3307, longitude: 15.3149 },
                  { latitude: -4.3297, longitude: 15.3159 },
                ]}
                strokeColor="#f59e0b"
                strokeWidth={4}
              />
            </>
          )}
        </MapView>

        {/* Status overlay */}
        {!isAvailable && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-xl p-6 mx-6">
              <Text className="font-montserrat-bold text-xl text-center text-gray-900 mb-2">
                Mode indisponible
              </Text>
              <Text className="font-montserrat text-center text-gray-600">
                Activez votre disponibilité pour recevoir des commandes
              </Text>
            </View>
          </View>
        )}

        {/* Incoming order notification */}
        {incomingOrder && (
          <View className="absolute bottom-4 left-4 right-4">
            <View className="bg-white rounded-2xl p-4 shadow-lg border-2 border-primary-500">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-montserrat-bold text-lg text-gray-900">
                  Nouvelle commande !
                </Text>
                <View className="bg-primary-500 px-3 py-1 rounded-full">
                  <Text className="text-white font-montserrat-bold">
                    {incomingOrder.price}
                  </Text>
                </View>
              </View>

              <View className="space-y-2 mb-4">
                <View className="flex-row items-center">
                  <Package size={16} color="#6b7280" />
                  <Text className="font-montserrat text-gray-700 ml-2">
                    {incomingOrder.clientName} • {incomingOrder.packageType}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <MapPin size={16} color="#6b7280" />
                  <Text className="font-montserrat text-gray-700 ml-2">
                    De: {incomingOrder.pickup}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Navigation size={16} color="#f59e0b" />
                  <Text className="font-montserrat text-gray-700 ml-2">
                    Vers: {incomingOrder.destination}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Clock size={16} color="#6b7280" />
                  <Text className="font-montserrat text-gray-700 ml-2">
                    Distance: {incomingOrder.distance}
                  </Text>
                </View>
              </View>

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={handleDeclineOrder}
                  className="flex-1 bg-red-500 rounded-xl py-3"
                >
                  <Text className="text-white font-montserrat-bold text-center">
                    Refuser
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAcceptOrder}
                  className="flex-1 bg-green-500 rounded-xl py-3"
                >
                  <Text className="text-white font-montserrat-bold text-center">
                    Accepter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Active route info */}
        {hasActiveRoute && (
          <View className="absolute bottom-4 left-4 right-4">
            <View className="bg-white rounded-xl p-4 shadow-lg">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-montserrat-bold text-lg text-gray-900">
                  Course en cours
                </Text>
                <Text className="font-montserrat-bold text-xl text-primary-500">
                  3500 FC
                </Text>
              </View>
              
              <Text className="font-montserrat text-gray-600 mb-3">
                Vers: Lemba, Kinshasa • 2.1 km restants
              </Text>

              <TouchableOpacity className="bg-green-500 rounded-xl py-3">
                <Text className="text-white font-montserrat-bold text-center">
                  Terminer la course
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}