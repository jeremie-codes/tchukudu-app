import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CreditCard, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function PaymentScreen() {
  const { orderId } = useLocalSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  const handlePayment = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Erreur', 'Veuillez saisir un numéro de téléphone valide');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      
      // Simulate redirect after payment
      setTimeout(() => {
        router.push('/client/rating');
      }, 2000);
    }, 2000);
  };
  
  if (paymentComplete) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-4">
        <View className="items-center">
          <CheckCircle size={80} color={Colors.secondary} />
          <Text className="text-2xl font-montserrat-bold text-gray-900 mt-6 text-center">
            Paiement réussi!
          </Text>
          <Text className="text-base font-montserrat text-gray-600 mt-2 text-center">
            Votre commande a été confirmée. Vous serez redirigé vers la page d'évaluation...
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-white">
      <View className="p-4 pt-12">
        <Text className="text-2xl font-montserrat-bold text-gray-900 mb-6">
          Paiement
        </Text>
        
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="font-montserrat-medium text-lg text-gray-800 mb-4">
            Résumé de la commande
          </Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="font-montserrat text-gray-600">ID Commande:</Text>
            <Text className="font-montserrat text-gray-900">{orderId}</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="font-montserrat text-gray-600">Type:</Text>
            <Text className="font-montserrat text-gray-900">Express</Text>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="font-montserrat text-gray-600">Destination:</Text>
            <Text className="font-montserrat text-gray-900">Boulevard du 30 Juin</Text>
          </View>
          
          <View className="h-px bg-gray-200 my-3" />
          
          <View className="flex-row justify-between">
            <Text className="font-montserrat-medium text-gray-800">Total:</Text>
            <Text className="font-montserrat-bold text-gray-900">15.000 FC</Text>
          </View>
        </View>
        
        <Text className="font-montserrat-medium text-lg text-gray-800 mb-4">
          Méthode de paiement
        </Text>
        
        <TouchableOpacity 
          className={`flex-row items-center p-4 rounded-lg border mb-3 ${
            paymentMethod === 'mobile' ? 'border-primary bg-primary-light' : 'border-gray-300 bg-white'
          }`}
          onPress={() => setPaymentMethod('mobile')}
          activeOpacity={0.7}
        >
          <CreditCard 
            size={24} 
            color={paymentMethod === 'mobile' ? Colors.primary : '#6B7280'} 
          />
          <Text className={`ml-3 font-montserrat ${
            paymentMethod === 'mobile' ? 'text-gray-900' : 'text-gray-600'
          }`}>
            Mobile Money
          </Text>
        </TouchableOpacity>
        
        <View className="mt-4">
          <Text className="font-montserrat-medium text-gray-800 mb-2">
            Numéro de téléphone
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Ex: 0812345678"
            keyboardType="phone-pad"
          />
          <Text className="font-montserrat text-sm text-gray-500 mt-1">
            Entrez le numéro associé à votre compte Mobile Money
          </Text>
        </View>
        
        <TouchableOpacity
          className={`mt-8 py-3 rounded-lg items-center ${
            processing ? 'bg-gray-400' : 'bg-primary'
          }`}
          onPress={handlePayment}
          disabled={processing}
          activeOpacity={0.7}
        >
          <Text className="font-montserrat-bold text-white">
            {processing ? 'Traitement en cours...' : 'Payer maintenant'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}