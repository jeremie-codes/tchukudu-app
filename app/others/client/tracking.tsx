import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MapPin, Clock, Star, CreditCard, X, Phone } from 'lucide-react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter } from 'expo-router';

export default function TrackingScreen() {
  const router = useRouter();
  const [orderStartTime] = useState(new Date(Date.now() - 15 * 60 * 1000)); // 15 minutes ago
  const [canCancelFree, setCanCancelFree] = useState(true);
  const [transporterDeparted, setTransporterDeparted] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanCancelFree(false);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    const now = new Date();
    const timeDiff = (now.getTime() - orderStartTime.getTime()) / (1000 * 60); // in minutes
    
    let cancelMessage = '';
    let penalty = '';
    
    if (timeDiff <= 5) {
      cancelMessage = 'Annulation gratuite (moins de 5 minutes)';
      penalty = 'Aucune pénalité';
    } else if (!transporterDeparted) {
      cancelMessage = 'Annulation avec pénalité réduite';
      penalty = '400 FC (20% du tarif)';
    } else {
      cancelMessage = 'Annulation avec pénalité standard';
      penalty = '1000 FC (50% du tarif)';
    }

    Alert.alert(
      'Confirmer l\'annulation',
      `${cancelMessage}\nPénalité: ${penalty}\n\nRaison de l'annulation:`,
      [
        { text: 'Retard transporteur', onPress: () => confirmCancel('retard') },
        { text: 'Erreur de ma part', onPress: () => confirmCancel('erreur') },
        { text: 'Changement de plan', onPress: () => confirmCancel('changement') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  };

  const confirmCancel = (reason: string) => {
    Alert.alert('Commande annulée', `Motif: ${reason}\nLe transporteur a été notifié.`);
  };

  const handlePayment = () => {
    router.push('/others/client/payment?orderId=1&amount=2000 FC');
  };

  const handleRating = () => {
    router.push('/others/client/rating?transporterId=1&transporterName=Jean Mukendi&orderId=1');
  };

  const simulateDeliveryComplete = () => {
    setOrderCompleted(true);
    Alert.alert(
      'Livraison terminée !',
      'Votre colis a été livré avec succès. Vous pouvez maintenant évaluer le transporteur et procéder au paiement.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <Text className="text-white font-montserrat-bold text-xl">
          Suivi en temps réel
        </Text>
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
        >
          <Marker
            coordinate={{ latitude: -4.3317, longitude: 15.3139 }}
            title="Votre position"
            pinColor="blue"
          />
          <Marker
            coordinate={{ latitude: -4.3297, longitude: 15.3159 }}
            title="Jean Mukendi - Transporteur"
            pinColor="red"
          />
          <Polyline
            coordinates={[
              { latitude: -4.3317, longitude: 15.3139 },
              { latitude: -4.3297, longitude: 15.3159 },
            ]}
            strokeColor="#f59e0b"
            strokeWidth={3}
          />
        </MapView>

        {/* Simulate delivery button (for demo) */}
        {!orderCompleted && (
          <TouchableOpacity
            onPress={simulateDeliveryComplete}
            className="absolute top-4 right-4 bg-green-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-montserrat-semibold text-sm">
              Simuler livraison
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Order Info */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="font-montserrat-bold text-lg text-gray-900">
              Jean Mukendi
            </Text>
            <Text className="font-montserrat text-gray-600">
              Moto • {orderCompleted ? 'Livraison terminée' : 'En route vers vous'}
            </Text>
          </View>
          <View className="items-end">
            <Text className="font-montserrat-bold text-xl text-yellow-500">
              2000 FC
            </Text>
            <Text className="font-montserrat text-sm text-gray-600">
              {orderCompleted ? 'Terminé' : 'Arrivée: 5 min'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <MapPin size={16} color="#6b7280" />
            <Text className="font-montserrat text-gray-600 ml-2">
              Distance: 0.8 km
            </Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={16} color="#6b7280" />
            <Text className="font-montserrat text-gray-600 ml-2">
              Commande: {orderStartTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        {!orderCompleted ? (
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-blue-500 rounded-xl py-3 flex-row items-center justify-center">
              <Phone size={20} color="white" />
              <Text className="text-white font-montserrat-semibold ml-2">
                Appeler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleCancel}
              className="flex-1 bg-red-500 rounded-xl py-3 flex-row items-center justify-center"
            >
              <X size={20} color="white" />
              <Text className="text-white font-montserrat-semibold ml-2">
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row space-x-3">
            <TouchableOpacity 
              onPress={handleRating}
              className="flex-1 bg-yellow-500 rounded-xl py-3 flex-row items-center justify-center"
            >
              <Star size={20} color="white" />
              <Text className="text-white font-montserrat-semibold ml-2">
                Évaluer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handlePayment}
              className="flex-1 bg-green-500 rounded-xl py-3 flex-row items-center justify-center"
            >
              <CreditCard size={20} color="white" />
              <Text className="text-white font-montserrat-semibold ml-2">
                Payer
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {canCancelFree && !orderCompleted && (
          <View className="mt-3 p-3 bg-green-50 rounded-xl">
            <Text className="text-green-800 font-montserrat-semibold text-center text-sm">
              Annulation gratuite pendant encore {Math.max(0, 5 - Math.floor((Date.now() - orderStartTime.getTime()) / (1000 * 60)))} min
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}