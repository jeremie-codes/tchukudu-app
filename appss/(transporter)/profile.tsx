import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Truck, Star, Phone, Mail, Settings, LogOut, Bell } from 'lucide-react-native';

export default function TransporterProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

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
              Jean Mukendi
            </Text>
            <Text className="font-montserrat text-gray-600">
              Transporteur T'chukudu
            </Text>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <Mail size={20} color="#6b7280" />
              <Text className="font-montserrat text-gray-700 ml-3">
                jey@example.com
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Phone size={20} color="#6b7280" />
              <Text className="font-montserrat text-gray-700 ml-3">
                0827289636
              </Text>
            </View>

            <View className="flex-row items-center">
              <Truck size={20} color="#6b7280" />
              <Text className="font-montserrat text-gray-700 ml-3">
                Moto • Plaque: KIN-1234
              </Text>
            </View>
          </View>
        </View>

        {/* Rating & Stats */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Mes Performances
          </Text>

          <View className="flex-row justify-between">
            <View className="items-center">
              <View className="flex-row items-center mb-1">
                <Star size={20} color="#f59e0b" fill="#f59e0b" />
                <Text className="font-montserrat-bold text-xl text-gray-900 ml-1">
                  4.9
                </Text>
              </View>
              <Text className="font-montserrat text-sm text-gray-600">
                Note moyenne
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-xl text-primary-500">
                142
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Courses
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-xl text-green-500">
                94%
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Acceptation
              </Text>
            </View>
          </View>
        </View>

        {/* Vehicle Info */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Mon Véhicule
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-700">Type</Text>
              <Text className="font-montserrat-semibold text-gray-900">Moto</Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-700">Plaque</Text>
              <Text className="font-montserrat-semibold text-gray-900">KIN-1234</Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-700">Couleur</Text>
              <Text className="font-montserrat-semibold text-gray-900">Rouge</Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat text-gray-700">Capacité</Text>
              <Text className="font-montserrat-semibold text-gray-900">50 kg</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Préférences
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Bell size={20} color="#6b7280" />
                <View className="ml-3">
                  <Text className="font-montserrat-semibold text-gray-900">
                    Notifications
                  </Text>
                  <Text className="font-montserrat text-sm text-gray-600">
                    Recevoir les alertes de nouvelles commandes
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

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Settings size={20} color="#6b7280" />
                <View className="ml-3">
                  <Text className="font-montserrat-semibold text-gray-900">
                    Acceptation automatique
                  </Text>
                  <Text className="font-montserrat text-sm text-gray-600">
                    Accepter automatiquement les commandes à proximité
                  </Text>
                </View>
              </View>
              <Switch
                value={autoAccept}
                onValueChange={setAutoAccept}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={autoAccept ? '#f59e0b' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center">
            <Settings size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Paramètres du véhicule
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