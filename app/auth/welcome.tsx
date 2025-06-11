import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Truck, Package } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  const redirectToAuth = (user: any) => {
      if (user.role === 'client') {
        router.replace('/(client)');
      } else if (user.role === 'transporter') {
        router.replace('/(transporter)');
      }
  }

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Rediriger automatiquement vers l'interface appropriée
      redirectToAuth(user);
      
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-yellow-500 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white font-montserrat-medium mt-4">
          Chargement...
        </Text>
      </SafeAreaView>
    );
  }

  if (isAuthenticated) {
    
    return (
      <SafeAreaView className="flex-1 bg-yellow-500 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white font-montserrat-medium mt-4">
          Redirection...
        </Text>
        {/* <Redirect href="/auth" /> */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={require('@/assets/images/bg.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(255, 204, 0, 0)', 'rgba(255, 153, 0, 0.8)']}
          className="flex-1 justify-center items-center px-6"
        >
          <View className="items-center mb-12">
          
            <Text className="text-4xl font-montserrat-bold text-white text-center mb-4 pt-12">
              T'chukudu
            </Text>
            <Text className="text-lg font-montserrat text-white/90 text-center">
              Votre Parteanire Logistique Intelligent
            </Text>
          </View>

          <View className="w-full space-y-4">
            <Text className="text-xl font-montserrat-semibold text-white text-center mb-6">
              Choisissez votre rôle
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/auth?role=client')}
              className="bg-white rounded-2xl p-6 shadow-lg mx-4 mb-4"
            >
              <View className="flex-row items-center">
                <View className="w-16 h-16 bg-yellow-100 rounded-xl items-center justify-center mr-4">
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
                <View className="w-16 h-16 bg-yellow-100 rounded-xl items-center justify-center mr-4">
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

          <View className="pt-12">
            <Text className="text-sm font-montserrat text-white/80 text-center">
              Rejoignez des milliers d'utilisateurs qui nous font confiance
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});