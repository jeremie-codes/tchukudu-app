import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@/components/common/Picker';
import { CheckBox } from '@/components/common/CheckBox';
import Colors from '@/constants/Colors';

type OrderFormProps = {
  onSubmit: (orderData: any) => void;
};

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    transportType: 'express',
    packageType: 'carton',
    nature: 'solide',
    weight: '',
    volume: '',
    destination: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Form validation would go here
    onSubmit(formData);
  };

  const transportTypes = [
    { label: 'Express', value: 'express' },
    { label: 'Marchandises', value: 'marchandises' },
    { label: 'Déménagement', value: 'demenagement' },
  ];

  const packageTypes = [
    { label: 'Carton', value: 'carton' },
    { label: 'Conteneur', value: 'conteneur' },
    { label: 'Sacs', value: 'sacs' },
    { label: 'Palette', value: 'palette' },
  ];

  return (
    <View className="bg-gray-50 rounded-xl p-4 mb-8">
      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Type de transport</Text>
        <Picker
          selectedValue={formData.transportType}
          onValueChange={(value) => handleChange('transportType', value)}
          items={transportTypes}
        />
      </View>

      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Type d'emballage</Text>
        <Picker
          selectedValue={formData.packageType}
          onValueChange={(value) => handleChange('packageType', value)}
          items={packageTypes}
        />
      </View>

      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Nature</Text>
        <View className="flex-row">
          <View className="flex-row items-center mr-4">
            <CheckBox
              checked={formData.nature === 'solide'}
              onPress={() => handleChange('nature', 'solide')}
            />
            <Text className="font-montserrat ml-2">Solide</Text>
          </View>
          <View className="flex-row items-center">
            <CheckBox
              checked={formData.nature === 'liquide'}
              onPress={() => handleChange('nature', 'liquide')}
            />
            <Text className="font-montserrat ml-2">Liquide</Text>
          </View>
        </View>
      </View>

      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Poids (kg)</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md px-3 py-2 font-montserrat"
          value={formData.weight}
          onChangeText={(value) => handleChange('weight', value)}
          keyboardType="numeric"
          placeholder="Exemple: 10"
        />
      </View>

      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Volume (m³)</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md px-3 py-2 font-montserrat"
          value={formData.volume}
          onChangeText={(value) => handleChange('volume', value)}
          keyboardType="numeric"
          placeholder="Exemple: 0.5"
        />
      </View>

      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Destination</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md px-3 py-2 font-montserrat"
          value={formData.destination}
          onChangeText={(value) => handleChange('destination', value)}
          placeholder="Entrez l'adresse complète"
        />
      </View>

      <View className="mb-6">
        <Text className="font-montserrat-medium text-gray-800 mb-2">Notes additionnelles</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md px-3 py-2 font-montserrat"
          value={formData.notes}
          onChangeText={(value) => handleChange('notes', value)}
          placeholder="Instructions spéciales, etc."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        className="bg-primary py-3 rounded-lg items-center"
        onPress={handleSubmit}
        activeOpacity={0.7}
      >
        <Text className="font-montserrat-bold text-white">Continuer vers le paiement</Text>
      </TouchableOpacity>
    </View>
  );
};