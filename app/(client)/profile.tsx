import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, Image } from 'react-native';
import { User, Phone, MapPin, Settings, LogOut, Eye, EyeOff, Edit } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';

export default function ClientProfileScreen() {
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
    router.push('/others/client/edit-profile');
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
              {user?.name || 'Client T\'chukudu'}
            </Text>
            <Text className="font-montserrat text-gray-600">
              Membre depuis janvier 2024
            </Text>
          </View>

          <View className="space-y-3">
            {user?.phone && (
              <View className="flex-row items-center">
                <Phone size={20} color="#6b7280" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  {user.phone}
                </Text>
              </View>
            )}
            
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
                {settings.locationVisible ? (
                  <Eye size={20} color="#6b7280" />
                ) : (
                  <EyeOff size={20} color="#6b7280" />
                )}
                <View className="ml-3">
                  <Text className="font-montserrat-semibold text-gray-900">
                    Position visible
                  </Text>
                  <Text className="font-montserrat text-sm text-gray-600">
                    Permettre aux transporteurs de voir votre{'\n'}position
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.locationVisible}
                onValueChange={(value) => updateSettings({ locationVisible: value })}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={settings.locationVisible ? '#f59e0b' : '#9ca3af'}
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
                value={settings.notifications}
                onValueChange={(value) => updateSettings({ notifications: value })}
                trackColor={{ false: '#e5e7eb', true: '#fbbf24' }}
                thumbColor={settings.notifications ? '#f59e0b' : '#9ca3af'}
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
              <Text className="font-montserrat-bold text-2xl text-yellow-500">
                {user?.stats?.totalOrders || 0}
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Commandes
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-green-500">
                {user?.stats?.completedOrders || 0}
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Livrées
              </Text>
            </View>
            
            <View className="items-center">
              <Text className="font-montserrat-bold text-2xl text-blue-500">
                {user?.stats?.rating || 0}
              </Text>
              <Text className="font-montserrat text-sm text-gray-600">
                Note moyenne
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-5">
          <TouchableOpacity 
            onPress={handleEditProfile}
            className="bg-gray-100 rounded-xl p-4 flex-row items-center mb-2"
          >
            <Edit size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Modifier mon profil
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity className="bg-gray-100 rounded-xl p-4 flex-row items-center mb-2">
            <Settings size={20} color="#6b7280" />
            <Text className="font-montserrat-semibold text-gray-700 ml-3">
              Paramètres avancés
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-50 rounded-xl p-4 flex-row items-center"
          >
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