import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { ArrowLeft, Star, Phone, MapPin, Truck, Shield, Clock, Package } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface TransporterDetails {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  joinDate: string;
  phone: string;
  photo: string;
  vehicleInfo: {
    type: string;
    plate: string;
    color: string;
    capacity: string;
    photo: string;
    year: string;
    brand: string;
  };
  verificationStatus: {
    identity: boolean;
    vehicle: boolean;
    license: boolean;
  };
  stats: {
    completionRate: number;
    responseTime: string;
    totalDeliveries: number;
  };
  reviews: Array<{
    id: string;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const mockTransporterDetails: TransporterDetails = {
  id: '1',
  name: 'Jean Mukendi',
  rating: 4.8,
  totalRides: 142,
  joinDate: 'Janvier 2023',
  phone: '+243 827 289 636',
  photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  vehicleInfo: {
    type: 'Moto',
    plate: 'KIN-1234',
    color: 'Rouge',
    capacity: '50 kg',
    photo: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2022',
    brand: 'Honda'
  },
  verificationStatus: {
    identity: true,
    vehicle: true,
    license: true
  },
  stats: {
    completionRate: 98,
    responseTime: '2 min',
    totalDeliveries: 134
  },
  reviews: [
    {
      id: '1',
      clientName: 'Marie K.',
      rating: 5,
      comment: 'Service excellent, très professionnel et ponctuel.',
      date: '2024-01-10'
    },
    {
      id: '2',
      clientName: 'Pierre M.',
      rating: 4,
      comment: 'Bon transporteur, livraison rapide.',
      date: '2024-01-08'
    }
  ]
};

export default function TransporterDetailsScreen() {
  const router = useRouter();
  const { transporterId } = useLocalSearchParams();
  const [transporter] = useState(mockTransporterDetails);

  const handleOrder = () => {
    router.push(`/order?transporterId=${transporterId}`);
  };

  const handleCall = () => {
    Alert.alert(
      'Appeler le transporteur',
      `Voulez-vous appeler ${transporter.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => console.log('Calling...') }
      ]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color="#f59e0b"
        fill={index < Math.floor(rating) ? "#f59e0b" : "transparent"}
      />
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-montserrat-bold text-xl ml-4">
            Détails du transporteur
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="bg-white p-6 border-b border-gray-100">
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: transporter.photo }}
              className="w-20 h-20 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="font-montserrat-bold text-xl text-gray-900">
                {transporter.name}
              </Text>
              <View className="flex-row items-center mt-1">
                {renderStars(transporter.rating)}
                <Text className="font-montserrat-semibold text-gray-700 ml-2">
                  {transporter.rating} ({transporter.totalRides} courses)
                </Text>
              </View>
              <Text className="font-montserrat text-gray-600 mt-1">
                Membre depuis {transporter.joinDate}
              </Text>
            </View>
          </View>

          {/* Verification Badges */}
          <View className="flex-row space-x-2">
            {transporter.verificationStatus.identity && (
              <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center">
                <Shield size={14} color="#22c55e" />
                <Text className="font-montserrat-semibold text-green-700 ml-1 text-xs">
                  Identité vérifiée
                </Text>
              </View>
            )}
            {transporter.verificationStatus.vehicle && (
              <View className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center">
                <Truck size={14} color="#3b82f6" />
                <Text className="font-montserrat-semibold text-blue-700 ml-1 text-xs">
                  Véhicule vérifié
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Vehicle Info */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Informations du véhicule
          </Text>
          
          <Image
            source={{ uri: transporter.vehicleInfo.photo }}
            className="w-full h-48 rounded-xl mb-4"
            resizeMode="cover"
          />

          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Type</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.type}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Marque</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.brand}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Année</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.year}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Plaque</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.plate}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Couleur</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.color}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-600">Capacité</Text>
              <Text className="font-montserrat-semibold text-gray-900">
                {transporter.vehicleInfo.capacity}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Statistiques
          </Text>
          
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-yellow-500">
                {transporter.stats.completionRate}%
              </Text>
              <Text className="font-montserrat text-sm text-gray-600 text-center">
                Taux de{'\n'}réussite
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-green-500">
                {transporter.stats.responseTime}
              </Text>
              <Text className="font-montserrat text-sm text-gray-600 text-center">
                Temps de{'\n'}réponse
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-blue-500">
                {transporter.stats.totalDeliveries}
              </Text>
              <Text className="font-montserrat text-sm text-gray-600 text-center">
                Livraisons{'\n'}réussies
              </Text>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View className="bg-white p-6">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Avis clients ({transporter.reviews.length})
          </Text>
          
          {transporter.reviews.map((review) => (
            <View key={review.id} className="mb-4 p-4 bg-gray-50 rounded-xl">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-montserrat-semibold text-gray-900">
                  {review.clientName}
                </Text>
                <View className="flex-row items-center">
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text className="font-montserrat text-gray-700 mb-2">
                {review.comment}
              </Text>
              <Text className="font-montserrat text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={handleCall}
            className="flex-1 bg-gray-800 rounded-xl py-4 flex-row items-center justify-center"
          >
            <Phone size={20} color="white" />
            <Text className="text-white font-montserrat-semibold ml-2">
              Appeler
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleOrder}
            className="flex-1 bg-yellow-500 rounded-xl py-4"
          >
            <Text className="text-white font-montserrat-bold text-center text-lg">
              Commander
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}