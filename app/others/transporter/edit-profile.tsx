import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ArrowLeft, User, Phone, Mail, Camera, Truck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function EditTransporterProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    avatar: user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        avatar: formData.avatar
      });
      
      Alert.alert(
        'Succès',
        'Votre profil a été mis à jour avec succès',
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
      'Changer la photo',
      'Choisissez une option',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Galerie', onPress: () => console.log('Open gallery') },
        { text: 'Appareil photo', onPress: () => console.log('Open camera') }
      ]
    );
  };

  const handleVehicleEdit = () => {
    router.push('/others/transporter/edit-vehicle');
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
              Modifier le profil
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
        {/* Photo Profile */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: formData.avatar }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity
              onPress={handlePhotoChange}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full items-center justify-center"
            >
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="font-montserrat text-gray-600 mt-2">
            Touchez pour changer la photo
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Name */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Nom complet *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <User size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="Votre nom complet"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Email *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Mail size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
              />
            </View>
          </View>

          {/* Phone */}
          <View>
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Numéro de téléphone *
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
              <Phone size={20} color="#6b7280" />
              <TextInput
                className="flex-1 ml-3 font-montserrat"
                placeholder="+243 XXX XXX XXX"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
              />
            </View>
          </View>
        </View>

        {/* Vehicle Section */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={handleVehicleEdit}
            className="bg-blue-50 rounded-xl p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                <Truck size={24} color="#3b82f6" />
              </View>
              <View>
                <Text className="font-montserrat-semibold text-gray-900">
                  Informations du véhicule
                </Text>
                <Text className="font-montserrat text-sm text-gray-600">
                  Modifier les détails de votre véhicule
                </Text>
              </View>
            </View>
            <ArrowLeft size={20} color="#6b7280" style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        {/* Current Vehicle Info */}
        {user?.vehicleInfo && (
          <View className="mt-4 p-4 bg-gray-50 rounded-xl">
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Véhicule actuel
            </Text>
            <Text className="font-montserrat text-gray-700">
              {user.vehicleInfo.type} • {user.vehicleInfo.plate} • {user.vehicleInfo.color}
            </Text>
          </View>
        )}

        {/* Info Section */}
        <View className="mt-8 p-4 bg-blue-50 rounded-xl">
          <Text className="font-montserrat-semibold text-blue-800 mb-2">
            Informations importantes
          </Text>
          <Text className="font-montserrat text-sm text-blue-700">
            • Votre profil est visible par les clients{'\n'}
            • Les informations du véhicule sont essentielles pour les commandes{'\n'}
            • Maintenez vos informations à jour pour une meilleure expérience
          </Text>
        </View>

        {/* Account Actions */}
        <View className="mt-8 space-y-3">
          <TouchableOpacity className="p-4 bg-yellow-50 rounded-xl mb-2">
            <Text className="font-montserrat-semibold text-yellow-700 text-center">
              Suspendre temporairement mon compte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-4 bg-red-50 rounded-xl mb-8">
            <Text className="font-montserrat-semibold text-red-600 text-center">
              Supprimer définitivement mon compte
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}