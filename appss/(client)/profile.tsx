import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Phone, MapPin, Settings, LogOut, Eye, EyeOff } from 'lucide-react-native';

export default function ClientProfileScreen() {
  const [locationVisible, setLocationVisible] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-primary-500 px-4 py-4">
        <Text className="text-white font-montserrat-bold text-xl">
          Mon Profil
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Profile Info */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-3">
              <User size={32} color="#f59e0b" />
            </View>
            <Text className="font-montserrat-bold text-xl text-gray-900">
              Client T'chukudu
            </Text>
            <Text className="font-montserrat text-gray-600">
              Membre depuis janvier 2024
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <Phone size={20} color="#6b7280" />
              <Text className="font-montserrat text-gray-700 ml-3">
                +243 XXX XXX XXX
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <MapPin size={20} color="#6b7280" />
              <Text className="font-montserrat text-gray-700 ml-3">
                Kinshasa, RDC
              </Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Paramètres
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                {locationVisible ? (
                  <Eye size={20} color="#6b7280" />
                ) : (
                  <EyeOff size={20} color="#6b7280" />
                )}
                <View className="ml-3">
                  <Text className="font-montserrat-semibold text-gray-900">
                    Position visible
                  </Text>
                  <Text className="font-montserrat text-sm text-gray-600">
                    Permettre aux transporteurs de voir votre position
                  </Text>
                </View>
              </View>
              <Switch
                value={locationVisible}
                onValueChange={setLocationVisible}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={locationVisible ? '#f59e0b' : '#9ca3af'}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Settings size={20} color="#6b7280" />
                <View className="ml-3">
                  <Text className="font-montserrat-semibold text-gray-900">
                    Notifications
                  </Text>
                  <Text className="font-montserrat text-sm text-gray-600">
                    Recevoir les notifications de commandes
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={notifications ? '#f59e0b' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Mes Statistiques
          </Text>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-primary-500">
                12
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Commandes
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-green-500">
                10
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Livrées
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-blue-500">
                4.8
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Note moyenne
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center">
            <Settings size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Paramètres avancés
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-50 rounded-xl p-4 flex-row items-center">
            <LogOut size={20} color="#dc2626" />
            <Text className="font-montserrat-semibold text-red-600 ml-3">
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}