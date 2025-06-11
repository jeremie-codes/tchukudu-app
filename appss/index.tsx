import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Truck, Package } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={['#f59e0b', '#d97706']}
        className="flex-1 justify-center items-center px-6"
      >
        <View className="items-center mb-12">
          <View className="w-32 h-32 bg-white rounded-full items-center justify-center mb-6 shadow-lg">
            <Text className="text-4xl font-montserrat-bold text-primary-500">T'</Text>
          </View>
          <Text className="text-4xl font-montserrat-bold text-white text-center mb-2">
            T'chukudu
          </Text>
          <Text className="text-lg font-montserrat text-white/90 text-center">
            Votre solution de transport intelligent
          </Text>
        </View>

        <View className="w-full space-y-4">
          <Text className="text-xl font-montserrat-semibold text-white text-center mb-6">
            Choisissez votre rôle
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/auth?role=client')}
            className="bg-white rounded-2xl p-6 shadow-lg mx-4"
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-primary-100 rounded-xl items-center justify-center mr-4">
                <Package size={32} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-montserrat-bold text-gray-900 mb-1">
                  Client
                </Text>
                <Text className="text-sm font-montserrat text-gray-600">
                  Expédier vos colis en toute sécurité
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/auth?role=transporter')}
            className="bg-white rounded-2xl p-6 shadow-lg mx-4"
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-primary-100 rounded-xl items-center justify-center mr-4">
                <Truck size={32} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-montserrat-bold text-gray-900 mb-1">
                  Transporteur
                </Text>
                <Text className="text-sm font-montserrat text-gray-600">
                  Proposer vos services de transport
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-12">
          <Text className="text-sm font-montserrat text-white/80 text-center">
            Rejoignez des milliers d'utilisateurs qui nous font confiance
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}