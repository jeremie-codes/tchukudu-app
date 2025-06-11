import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { User, Truck, Star, Phone, Mail, Settings, LogOut, Bell, Edit } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';

export default function TransporterProfileScreen() {
  const { user, logout } = useAuth();
  const { settings, updateSettings } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/welcome');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/others/transporter/edit-profile');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-montserrat-bold text-xl">
            Mon Profil
          </Text>
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-white/20 p-2 rounded-lg"
          >
            <Edit size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Profile Info */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <View className="items-center mb-4">
            <Image
              source={{ 
                uri: user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
              }}
              className="w-20 h-20 rounded-full mb-3"
            />
            <Text className="font-montserrat-bold text-xl text-gray-900">
              {user?.name || 'Transporteur'}
            </Text>
            <Text className="font-montserrat text-gray-600">
              Transporteur T'chukudu
            </Text>
          </View>

          <View className="space-y-3">
            {user?.email && (
              <View className="flex-row items-center">
                <Mail size={20} color="#6b7280" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  {user.email}
                </Text>
              </View>
            )}
            
            {user?.phone && (
              <View className="flex-row items-center">
                <Phone size={20} color="#6b7280" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  {user.phone}
                </Text>
              </View>
            )}

            {user?.vehicleInfo && (
              <View className="flex-row items-center">
                <Truck size={20} color="#6b7280" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  {user.vehicleInfo.type} • Plaque: {user.vehicleInfo.plate}
                </Text>
              </View>
            )}
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
                  {user?.rating || 0}
                </Text>
              </View>
              <Text className="font-montserrat text-sm text-gray-600">
                Note moyenne
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-xl text-yellow-500">
                {user?.stats?.totalOrders || 0}
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
        {user?.vehicleInfo && (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-montserrat-bold text-lg text-gray-900">
                Mon Véhicule
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/others/transporter/edit-vehicle')}
                className="bg-yellow-50 p-2 rounded-lg"
              >
                <Edit size={16} color="#f59e0b" />
              </TouchableOpacity>
            </View>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className="font-montserrat text-gray-700">Type</Text>
                <Text className="font-montserrat-semibold text-gray-900">{user.vehicleInfo.type}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="font-montserrat text-gray-700">Plaque</Text>
                <Text className="font-montserrat-semibold text-gray-900">{user.vehicleInfo.plate}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="font-montserrat text-gray-700">Couleur</Text>
                <Text className="font-montserrat-semibold text-gray-900">{user.vehicleInfo.color}</Text>
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="font-montserrat text-gray-700">Capacité</Text>
                <Text className="font-montserrat-semibold text-gray-900">{user.vehicleInfo.capacity}</Text>
              </View>
            </View>
          </View>
        )}

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
                value={settings.notifications}
                onValueChange={(value) => updateSettings({ notifications: value })}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={settings.notifications ? '#f59e0b' : '#9ca3af'}
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
                    Accepter automatiquement les commandes {'\n'}à proximité
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.autoAccept || false}
                onValueChange={(value) => updateSettings({ autoAccept: value })}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={settings.autoAccept ? '#f59e0b' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-3">
          <TouchableOpacity 
            onPress={handleEditProfile}
            className="bg-gray-100 rounded-xl p-4 flex-row items-center mb-2"
          >
            <Edit size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Modifier mon profil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/others/transporter/edit-vehicle')}
            className="bg-gray-100 rounded-xl p-4 flex-row items-center mb-2"
          >
            <Truck size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Paramètres du véhicule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-50 rounded-xl p-4 flex-row items-center mb-8"
          >
            <LogOut size={20} color="#dc2626" />
            <Text className="font-montserrat-semibold text-red-600 ml-3">
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}