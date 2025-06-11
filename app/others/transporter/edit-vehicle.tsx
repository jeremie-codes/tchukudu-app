import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ArrowLeft, Truck, Camera, Package, Calendar, Palette } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const vehicleTypes = [
  { id: 'moto', label: 'Moto', capacity: '50 kg' },
  { id: 'voiture', label: 'Voiture', capacity: '200 kg' },
  { id: 'camionnette', label: 'Camionnette', capacity: '1 tonne' },
  { id: 'camion', label: 'Camion', capacity: '5 tonnes' }
];

const vehicleBrands = [
  'Honda', 'Yamaha', 'Toyota', 'Nissan', 'Mitsubishi', 'Isuzu', 'Mercedes', 'Autre'
];

const vehicleColors = [
  'Blanc', 'Noir', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Gris', 'Marron'
];

export default function EditVehicleScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: user?.vehicleInfo?.type || '',
    brand: user?.vehicleInfo?.brand || '',
    year: user?.vehicleInfo?.year || '',
    plate: user?.vehicleInfo?.plate || '',
    color: user?.vehicleInfo?.color || '',
    capacity: user?.vehicleInfo?.capacity || '',
    photo: user?.vehicleInfo?.photo || 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const handleSave = async () => {
    if (!formData.type || !formData.plate || !formData.color) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({
        vehicleInfo: {
          type: formData.type,
          brand: formData.brand,
          year: formData.year,
          plate: formData.plate,
          color: formData.color,
          capacity: formData.capacity,
          photo: formData.photo
        }
      });
      
      Alert.alert(
        'Succès',
        'Les informations de votre véhicule ont été mises à jour',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = () => {
    Alert.alert(
      'Changer la photo du véhicule',
      'Choisissez une option',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Galerie', onPress: () => console.log('Open gallery') },
        { text: 'Appareil photo', onPress: () => console.log('Open camera') }
      ]
    );
  };

  const handleTypeSelect = (type: string) => {
    const selectedType = vehicleTypes.find(v => v.id === type);
    setFormData({
      ...formData,
      type: selectedType?.label || '',
      capacity: selectedType?.capacity || ''
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white font-montserrat-bold text-xl ml-4">
              Modifier le véhicule
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            disabled={isLoading}
            className="bg-white/20 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-montserrat-semibold">
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Vehicle Photo */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: formData.photo }}
              className="w-32 h-24 rounded-xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handlePhotoChange}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full items-center justify-center"
            >
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="font-montserrat text-gray-600 mt-2">
            Photo de votre véhicule
          </Text>
        </View>

        {/* Vehicle Type */}
        <View className="mb-6">
          <Text className="font-montserrat-semibold text-gray-900 mb-3">
            Type de véhicule *
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {vehicleTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => handleTypeSelect(type.id)}
                className={`flex-1 min-w-[45%] p-3 rounded-xl border-2 ${
                  formData.type === type.label
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className={`text-center font-montserrat-semibold ${
                  formData.type === type.label ? 'text-yellow-500' : 'text-gray-700'
                }`}>
                  {type.label}
                </Text>
                <Text className={`text-center font-montserrat text-sm ${
                  formData.type === type.label ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  {type.capacity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Brand */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Marque
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Truck size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="Marque du véhicule"
                value={formData.brand}
                onChangeText={(text) => setFormData({...formData, brand: text})}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
              <View className="flex-row space-x-2">
                {vehicleBrands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => setFormData({...formData, brand})}
                    className={`px-3 py-1 rounded-full border ${
                      formData.brand === brand
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Text className={`font-montserrat text-sm ${
                      formData.brand === brand ? 'text-yellow-500' : 'text-gray-600'
                    }`}>
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Year */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Année
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Calendar size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="2020"
                keyboardType="numeric"
                maxLength={4}
                value={formData.year}
                onChangeText={(text) => setFormData({...formData, year: text})}
              />
            </View>
          </View>

          {/* Plate */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Numéro de plaque *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Package size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="KIN-1234"
                autoCapitalize="characters"
                value={formData.plate}
                onChangeText={(text) => setFormData({...formData, plate: text})}
              />
            </View>
          </View>

          {/* Color */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Couleur *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Palette size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="Couleur du véhicule"
                value={formData.color}
                onChangeText={(text) => setFormData({...formData, color: text})}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
              <View className="flex-row space-x-2">
                {vehicleColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setFormData({...formData, color})}
                    className={`px-3 py-1 rounded-full border ${
                      formData.color === color
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Text className={`font-montserrat text-sm ${
                      formData.color === color ? 'text-yellow-500' : 'text-gray-600'
                    }`}>
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Capacity (Read-only, set by type) */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Capacité de charge
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4">
              <Package size={20} color="#6b7280" />
              <Text className="flex-1 ml-3 font-montserrat text-gray-600">
                {formData.capacity || 'Sélectionnez un type de véhicule'}
              </Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View className="mt-8 p-4 bg-blue-50 rounded-xl">
          <Text className="font-montserrat-semibold text-blue-800 mb-2">
            Informations importantes
          </Text>
          <Text className="font-montserrat text-sm text-blue-700">
            • Ces informations sont visibles par les clients{'\n'}
            • Assurez-vous que la photo correspond à votre véhicule{'\n'}
            • Le numéro de plaque doit être exact pour la vérification{'\n'}
            • La capacité influence les types de commandes que vous recevrez
          </Text>
        </View>

        {/* Verification Status */}
        <View className="mt-6 p-4 bg-green-50 rounded-xl mb-8">
          <Text className="font-montserrat-semibold text-green-800 mb-2">
            Statut de vérification
          </Text>
          <Text className="font-montserrat text-sm text-green-700">
            ✅ Véhicule vérifié{'\n'}
            ✅ Documents validés{'\n'}
            ✅ Assurance à jour
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}