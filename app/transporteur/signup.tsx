import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router, Link } from 'expo-router';
import { Eye, EyeOff, CheckCircle } from 'lucide-react-native';
import { Picker } from '@/components/common/Picker';
import Colors from '@/constants/Colors';

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    vehicleType: 'moto',
    vehiclePlate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [registered, setRegistered] = useState(false);
  
  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNextStep = () => {
    // Validate first step
    if (step === 1) {
      if (!form.name || !form.email || !form.phone) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs');
        return;
      }
      
      if (!form.email.includes('@')) {
        Alert.alert('Erreur', 'Veuillez entrer un email valide');
        return;
      }
      
      setStep(2);
      return;
    }
    
    // Validate second step
    if (step === 2) {
      if (!form.password || !form.confirmPassword) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs');
        return;
      }
      
      if (form.password.length < 6) {
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      
      if (form.password !== form.confirmPassword) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
        return;
      }
      
      setStep(3);
      return;
    }
  };
  
  const handleSignup = () => {
    if (!form.vehicleType || !form.vehiclePlate) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would make an API call to register
    setTimeout(() => {
      setIsLoading(false);
      setRegistered(true);
      
      // Redirect after registration
      setTimeout(() => {
        router.replace('/transporteur/login');
      }, 2000);
    }, 1500);
  };
  
  const vehicleTypes = [
    { label: 'Moto', value: 'moto' },
    { label: 'Voiture', value: 'voiture' },
    { label: 'Camion (< 3T)', value: 'petit_camion' },
    { label: 'Camion (3-7T)', value: 'moyen_camion' },
    { label: 'Camion (> 7T)', value: 'grand_camion' },
  ];
  
  if (registered) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-4">
        <View className="items-center">
          <CheckCircle size={80} color={Colors.secondary} />
          <Text className="text-2xl font-montserrat-bold text-gray-900 mt-6 text-center">
            Inscription réussie!
          </Text>
          <Text className="text-base font-montserrat text-gray-600 mt-2 text-center">
            Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion...
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="mt-8 mb-8">
          <Text className="text-3xl font-montserrat-bold text-gray-900 mb-2">
            Inscription
          </Text>
          <Text className="font-montserrat text-gray-600">
            Créez votre compte transporteur
          </Text>
        </View>
        
        <View className="flex-row mb-8 justify-between">
          {[1, 2, 3].map((s) => (
            <View 
              key={s} 
              className={`h-2 rounded-full ${
                s === step ? 'bg-primary' : s < step ? 'bg-primary-light' : 'bg-gray-300'
              }`}
              style={{ width: '30%' }}
            />
          ))}
        </View>
        
        {step === 1 && (
          <>
            <View className="mb-4">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Nom complet
              </Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
                value={form.name}
                onChangeText={(value) => updateForm('name', value)}
                placeholder="Votre nom et prénom"
              />
            </View>
            
            <View className="mb-4">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Email
              </Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
                value={form.email}
                onChangeText={(value) => updateForm('email', value)}
                placeholder="Votre email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View className="mb-6">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Téléphone
              </Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
                value={form.phone}
                onChangeText={(value) => updateForm('phone', value)}
                placeholder="Votre numéro de téléphone"
                keyboardType="phone-pad"
              />
            </View>
          </>
        )}
        
        {step === 2 && (
          <>
            <View className="mb-4">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Mot de passe
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat pr-10"
                  value={form.password}
                  onChangeText={(value) => updateForm('password', value)}
                  placeholder="Créez un mot de passe"
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
              <Text className="font-montserrat text-sm text-gray-500 mt-1">
                Minimum 6 caractères
              </Text>
            </View>
            
            <View className="mb-6">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Confirmer le mot de passe
              </Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
                value={form.confirmPassword}
                onChangeText={(value) => updateForm('confirmPassword', value)}
                placeholder="Confirmez votre mot de passe"
                secureTextEntry={!showPassword}
              />
            </View>
          </>
        )}
        
        {step === 3 && (
          <>
            <View className="mb-4">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Type de véhicule
              </Text>
              <Picker
                selectedValue={form.vehicleType}
                onValueChange={(value) => updateForm('vehicleType', value)}
                items={vehicleTypes}
              />
            </View>
            
            <View className="mb-6">
              <Text className="font-montserrat-medium text-gray-800 mb-2">
                Plaque d'immatriculation
              </Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
                value={form.vehiclePlate}
                onChangeText={(value) => updateForm('vehiclePlate', value)}
                placeholder="Ex: ABC-123"
                autoCapitalize="characters"
              />
            </View>
            
            <Text className="font-montserrat text-sm text-gray-500 mb-6">
              En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </Text>
          </>
        )}
        
        {step < 3 ? (
          <TouchableOpacity
            className="bg-primary py-3 rounded-lg items-center"
            onPress={handleNextStep}
            activeOpacity={0.7}
          >
            <Text className="font-montserrat-bold text-white">
              Continuer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className={`py-3 rounded-lg items-center ${
              isLoading ? 'bg-gray-400' : 'bg-primary'
            }`}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <Text className="font-montserrat-bold text-white">
              {isLoading ? 'Création en cours...' : 'Créer mon compte'}
            </Text>
          </TouchableOpacity>
        )}
        
        <View className="flex-row justify-center mt-6">
          <Text className="font-montserrat text-gray-600">
            Déjà un compte?
          </Text>
          <Link href="/transporteur/login" asChild>
            <TouchableOpacity className="ml-1">
              <Text className="font-montserrat text-primary">
                Se connecter
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}