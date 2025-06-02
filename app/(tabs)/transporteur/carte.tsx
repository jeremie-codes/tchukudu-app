import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MapPin, Navigation, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TransporteurMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [route, setRoute] = useState<any[]>([]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Simulate receiving an order (would come from API/WebSocket)
      setTimeout(() => {
        if (location) {
          const clientLocation = {
            latitude: location.coords.latitude + 0.01,
            longitude: location.coords.longitude + 0.01,
          };
          
          setActiveOrder({
            id: 'ORD-1234',
            clientName: 'Marie Dubois',
            pickup: {
              latitude: clientLocation.latitude,
              longitude: clientLocation.longitude,
              address: 'Boulevard du 30 Juin, Kinshasa'
            },
            destination: {
              latitude: location.coords.latitude + 0.02,
              longitude: location.coords.longitude + 0.02,
              address: 'Avenue Lukusa, Kinshasa'
            },
            packageType: 'Carton',
            status: 'pending'
          });
          
          // Simulate route between transporteur and client
          const routePoints = generateMockRoute(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            },
            clientLocation
          );
          setRoute(routePoints);
        }
      }, 3000);
    })();
  }, []);
  
  const generateMockRoute = (start: any, end: any) => {
    // A simple function to generate intermediate points for a route
    // In a real app, this would come from Google Directions API
    const points = [];
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      const lat = start.latitude + (end.latitude - start.latitude) * (i / steps);
      const lng = start.longitude + (end.longitude - start.longitude) * (i / steps);
      
      // Add some randomness to make it look more like a real route
      const jitter = i > 0 && i < steps ? (Math.random() - 0.5) * 0.002 : 0;
      
      points.push({
        latitude: lat + jitter,
        longitude: lng + jitter
      });
    }
    
    return points;
  };
  
  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    
    Alert.alert(
      'Statut mis à jour',
      `Vous êtes maintenant ${!isAvailable ? 'disponible' : 'indisponible'} pour de nouvelles courses.`
    );
  };
  
  const handleAcceptOrder = () => {
    setActiveOrder({
      ...activeOrder,
      status: 'accepted'
    });
    
    Alert.alert(
      'Commande acceptée',
      'Vous pouvez maintenant vous rendre au point de récupération.'
    );
  };
  
  const handleRejectOrder = () => {
    setActiveOrder(null);
    setRoute([]);
    
    Alert.alert(
      'Commande refusée',
      'Vous avez refusé cette commande.'
    );
  };
  
  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary pt-12 pb-4 px-4">
        <Text className="text-2xl font-montserrat-bold text-white">Carte</Text>
      </View>
      
      <View className="flex-1">
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
            {/* Transporteur marker */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Vous êtes ici"
            >
              <View className={`p-2 rounded-full border-2 border-white ${isAvailable ? 'bg-secondary' : 'bg-gray-400'}`}>
                <Navigation size={18} color="#FFFFFF" />
              </View>
            </Marker>
            
            {/* Client pickup location */}
            {activeOrder && (
              <>
                <Marker
                  coordinate={activeOrder.pickup}
                  title="Point de récupération"
                  description={activeOrder.pickup.address}
                >
                  <View className="bg-primary p-2 rounded-full border-2 border-white">
                    <MapPin size={18} color="#FFFFFF" />
                  </View>
                </Marker>
                
                {/* Route polyline */}
                {route.length > 0 && (
                  <Polyline
                    coordinates={route}
                    strokeWidth={4}
                    strokeColor={Colors.primary}
                    lineDashPattern={[0]}
                  />
                )}
              </>
            )}
          </MapView>
        )}
      </View>
      
      {/* Bottom panel */}
      <View className="bg-white p-4 border-t border-gray-200">
        <TouchableOpacity
          className={`py-3 rounded-lg items-center mb-4 ${
            isAvailable ? 'bg-secondary' : 'bg-gray-400'
          }`}
          onPress={handleToggleAvailability}
          activeOpacity={0.7}
        >
          <Text className="font-montserrat-bold text-white">
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </Text>
        </TouchableOpacity>
        
        {activeOrder && activeOrder.status === 'pending' && (
          <View className="bg-gray-50 rounded-xl p-4">
            <Text className="font-montserrat-bold text-lg text-gray-800 mb-2">
              Nouvelle commande
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-1">
              Client: {activeOrder.clientName}
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-1">
              Récupération: {activeOrder.pickup.address}
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-4">
              Type: {activeOrder.packageType}
            </Text>
            
            <View className="flex-row">
              <TouchableOpacity
                className="bg-danger py-2 rounded-lg items-center flex-1 mr-2"
                onPress={handleRejectOrder}
                activeOpacity={0.7}
              >
                <Text className="font-montserrat-bold text-white">
                  Refuser
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="bg-secondary py-2 rounded-lg items-center flex-1 ml-2"
                onPress={handleAcceptOrder}
                activeOpacity={0.7}
              >
                <Text className="font-montserrat-bold text-white">
                  Accepter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {activeOrder && activeOrder.status === 'accepted' && (
          <View className="bg-secondary-light rounded-xl p-4">
            <Text className="font-montserrat-bold text-lg text-gray-800 mb-2">
              En cours de livraison
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-1">
              Client: {activeOrder.clientName}
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-1">
              Récupération: {activeOrder.pickup.address}
            </Text>
            
            <Text className="font-montserrat text-gray-600 mb-1">
              Destination: {activeOrder.destination.address}
            </Text>
            
            <TouchableOpacity
              className="bg-secondary py-2 rounded-lg items-center mt-3"
              activeOpacity={0.7}
            >
              <Text className="font-montserrat-bold text-white">
                Voir les détails
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});