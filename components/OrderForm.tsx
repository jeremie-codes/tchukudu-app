import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Package, MapPin, Weight, Truck, DollarSign } from 'lucide-react-native';

interface OrderFormProps {
  transporterId: string;
  onSubmit: (orderData: any) => void;
  onCancel: () => void;
}

export default function OrderForm({ transporterId, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState({
    transportType: 'express',
    packageType: 'carton',
    nature: 'solide',
    weight: '',
    volume: '',
    pickup: '',
    destination: '',
    specialInstructions: ''
  });

  const handleSubmit = () => {
    if (!formData.pickup || !formData.destination || !formData.weight) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    onSubmit({
      ...formData,
      transporterId,
      estimatedPrice: '2000 FC' // Mock calculation
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 py-12">
        <Text className="font-montserrat-bold text-2xl text-gray-900 mb-6">
          Nouvelle commande
        </Text>

        {/* Transport Type */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-3">
            Type de transport
          </Text>
          <View className="flex-row space-x-3">
            {[
              { key: 'express', label: 'Express' },
              { key: 'standard', label: 'Standard' },
              { key: 'marchandises', label: 'Marchandises' }
            ].map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setFormData({...formData, transportType: type.key})}
                className={`flex-1 p-3 rounded-xl border-2 ${
                  formData.transportType === type.key 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className={`text-center font-montserrat-semibold ${
                  formData.transportType === type.key ? 'text-yellow-500' : 'text-gray-700'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Package Type */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-3">
            Type d'emballage
          </Text>
          <View className="flex-row space-x-3">
            {[
              { key: 'carton', label: 'Carton' },
              { key: 'sac', label: 'Sac' },
              { key: 'palette', label: 'Palette' }
            ].map((type) => (
              <TouchableOpacity
                key={type.key}
                onPress={() => setFormData({...formData, packageType: type.key})}
                className={`flex-1 p-3 rounded-xl border-2 ${
                  formData.packageType === type.key 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className={`text-center font-montserrat-semibold ${
                  formData.packageType === type.key ? 'text-yellow-500' : 'text-gray-700'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nature */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-3">
            Nature du colis
          </Text>
          <View className="flex-row space-x-3">
            {[
              { key: 'solide', label: 'Solide' },
              { key: 'liquide', label: 'Liquide' }
            ].map((nature) => (
              <TouchableOpacity
                key={nature.key}
                onPress={() => setFormData({...formData, nature: nature.key})}
                className={`flex-1 p-3 rounded-xl border-2 ${
                  formData.nature === nature.key 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className={`text-center font-montserrat-semibold ${
                  formData.nature === nature.key ? 'text-yellow-500' : 'text-gray-700'
                }`}>
                  {nature.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weight and Volume */}
        <View className="flex-row space-x-3 mb-6">
          <View className="flex-1">
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Poids *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Weight size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="0"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) => setFormData({...formData, weight: text})}
              />
              <Text className="font-montserrat text-gray-600">kg</Text>
            </View>
          </View>

          <View className="flex-1">
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Volume
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Package size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="0"
                keyboardType="numeric"
                value={formData.volume}
                onChangeText={(text) => setFormData({...formData, volume: text})}
              />
              <Text className="font-montserrat text-gray-600">m³</Text>
            </View>
          </View>
        </View>

        {/* Locations */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-2">
            Point de récupération *
          </Text>
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mb-4">
            <MapPin size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 font-montserrat"
              placeholder="Adresse de récupération"
              value={formData.pickup}
              onChangeText={(text) => setFormData({...formData, pickup: text})}
            />
          </View>

          <Text className="font-montserrat-semibold text-gray-900 mb-2">
            Destination *
          </Text>
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
            <MapPin size={20} color="#f59e0b" />
            <TextInput
              className="flex-1 ml-3 font-montserrat"
              placeholder="Adresse de destination"
              value={formData.destination}
              onChangeText={(text) => setFormData({...formData, destination: text})}
            />
          </View>
        </View>

        {/* Special Instructions */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-2">
            Instructions spéciales
          </Text>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-4 font-montserrat"
            placeholder="Instructions particulières pour le transporteur..."
            multiline
            numberOfLines={3}
            value={formData.specialInstructions}
            onChangeText={(text) => setFormData({...formData, specialInstructions: text})}
          />
        </View>

        {/* Price Estimate */}
        <View className="bg-yellow-50 rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="font-montserrat-semibold text-gray-900">
              Estimation du coût
            </Text>
            <View className="flex-row items-center">
              <DollarSign size={20} color="#f59e0b" />
              <Text className="font-montserrat-bold text-xl text-yellow-500 ml-1">
                2000 FC
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={onCancel}
            className="flex-1 bg-gray-200 rounded-xl py-4"
          >
            <Text className="text-gray-700 font-montserrat-semibold text-center">
              Annuler
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-1 bg-yellow-500 rounded-xl py-4"
          >
            <Text className="text-white font-montserrat-bold text-center">
              Confirmer la commande
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}