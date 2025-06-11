import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Phone, Mail, Lock, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    name: ''
  });

  const isClient = role === 'client';
  const isTransporter = role === 'transporter';

  const handleAuth = () => {
    if (isTransporter && formData.email === 'jey@example.com' && formData.password === '123456') {
      router.replace('/(transporter)');
    } else if (isClient && formData.phone) {
      router.replace('/(client)');
    } else {
      Alert.alert('Erreur', 'Vérifiez vos informations de connexion');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={['#f59e0b', '#d97706']}
        className="flex-1"
      >
        <View className="flex-row items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-montserrat-bold text-white ml-4">
            {isClient ? 'Connexion Client' : 'Connexion Transporteur'}
          </Text>
        </View>

        <View className="flex-1 bg-white mt-4 rounded-t-3xl px-6 pt-8">
          <View className="items-center mb-8">
            <Text className="text-2xl font-montserrat-bold text-gray-900 mb-2">
              {isLogin ? 'Bienvenue !' : 'Créer un compte'}
            </Text>
            <Text className="text-gray-600 font-montserrat text-center">
              {isClient 
                ? 'Connectez-vous rapidement avec votre numéro' 
                : 'Accédez à votre espace transporteur'
              }
            </Text>
          </View>

          <View className="space-y-4">
            {!isLogin && (
              <View>
                <Text className="text-gray-700 font-montserrat-medium mb-2">Nom complet</Text>
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
            )}

            {isClient && (
              <View>
                <Text className="text-gray-700 font-montserrat-medium mb-2">Numéro de téléphone</Text>
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
            )}

            {isTransporter && (
              <>
                <View>
                  <Text className="text-gray-700 font-montserrat-medium mb-2">Email</Text>
                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
                    <Mail size={20} color="#6b7280" />
                    <TextInput
                      className="flex-1 ml-3 font-montserrat"
                      placeholder="jey@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={formData.email}
                      onChangeText={(text) => setFormData({...formData, email: text})}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-gray-700 font-montserrat-medium mb-2">Mot de passe</Text>
                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
                    <Lock size={20} color="#6b7280" />
                    <TextInput
                      className="flex-1 ml-3 font-montserrat"
                      placeholder="123456"
                      secureTextEntry
                      value={formData.password}
                      onChangeText={(text) => setFormData({...formData, password: text})}
                    />
                  </View>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={handleAuth}
            className="bg-primary-500 rounded-xl py-4 mt-8"
          >
            <Text className="text-white font-montserrat-bold text-center text-lg">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            className="mt-6"
          >
            <Text className="text-center font-montserrat text-gray-600">
              {isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
            </Text>
          </TouchableOpacity>

          {isTransporter && (
            <View className="mt-8 p-4 bg-blue-50 rounded-xl">
              <Text className="text-sm font-montserrat-semibold text-blue-800 mb-1">Test:</Text>
              <Text className="text-sm font-montserrat text-blue-700">
                Email: jey@example.com{'\n'}
                Mot de passe: 123456
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}