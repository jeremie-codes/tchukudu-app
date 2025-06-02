import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router, Link } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would make an API call to authenticate
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      if (email === 'demo@example.com' && password === 'password') {
        // Would set auth token in AsyncStorage here
        router.replace('/(tabs)/transporteur');
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      }
    }, 1500);
  };
  
  return (
    <View className="flex-1 bg-white p-4">
      <View className="mt-8 mb-8">
        <Text className="text-3xl font-montserrat-bold text-gray-900 mb-2">
          Connexion
        </Text>
        <Text className="font-montserrat text-gray-600">
          Accédez à votre compte transporteur
        </Text>
      </View>
      
      <View className="mb-4">
        <Text className="font-montserrat-medium text-gray-800 mb-2">
          Email
        </Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
          value={email}
          onChangeText={setEmail}
          placeholder="Votre email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View className="mb-6">
        <Text className="font-montserrat-medium text-gray-800 mb-2">
          Mot de passe
        </Text>
        <View className="relative">
          <TextInput
            className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat pr-10"
            value={password}
            onChangeText={setPassword}
            placeholder="Votre mot de passe"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="self-end mt-2">
          <Text className="font-montserrat text-primary text-sm">
            Mot de passe oublié?
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        className={`py-3 rounded-lg items-center ${
          isLoading ? 'bg-gray-400' : 'bg-primary'
        }`}
        onPress={handleLogin}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text className="font-montserrat-bold text-white">
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-6">
        <Text className="font-montserrat text-gray-600">
          Pas encore de compte?
        </Text>
        <Link href="/transporteur/signup" asChild>
          <TouchableOpacity className="ml-1">
            <Text className="font-montserrat text-primary">
              S'inscrire
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      <Text className="font-montserrat text-sm text-gray-500 mt-6 text-center">
        Conseil: Pour la démo, utilisez demo@example.com / password
      </Text>
    </View>
  );
}