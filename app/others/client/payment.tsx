import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ArrowLeft, CreditCard, Smartphone, DollarSign, CheckCircle } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  type: 'mobile_money' | 'card';
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'orange_money',
    name: 'Orange Money',
    icon: Smartphone,
    type: 'mobile_money',
    description: 'Paiement via Orange Money'
  },
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: Smartphone,
    type: 'mobile_money',
    description: 'Paiement via M-Pesa'
  },
  {
    id: 'airtel_money',
    name: 'Airtel Money',
    icon: Smartphone,
    type: 'mobile_money',
    description: 'Paiement via Airtel Money'
  },
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: CreditCard,
    type: 'card',
    description: 'Visa, Mastercard'
  }
];

export default function PaymentScreen() {
  const router = useRouter();
  const { orderId, amount } = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'details' | 'processing' | 'success'>('select');

  const orderAmount = amount as string || '2000 FC';

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setPaymentStep('details');
  };

  const handlePayment = async () => {
    if (!phoneNumber && selectedMethod !== 'card') {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro de téléphone');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');
    }, 3000);
  };

  const handleSuccess = () => {
    Alert.alert(
      'Paiement réussi',
      'Votre paiement a été traité avec succès. Le transporteur a été notifié.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(yellow)/orders')
        }
      ]
    );
  };

  const renderSelectMethod = () => (
    <View className="flex-1">
      <Text className="font-montserrat-bold text-xl text-gray-900 mb-6">
        Choisir un mode de paiement
      </Text>

      <View className="bg-primary-50 rounded-xl p-4 mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="font-montserrat-semibold text-gray-900">
            Montant à payer
          </Text>
          <View className="flex-row items-center">
            <DollarSign size={20} color="#f59e0b" />
            <Text className="font-montserrat-bold text-xl text-primary-500 ml-1">
              {orderAmount}
            </Text>
          </View>
        </View>
      </View>

      <View className="space-y-3">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <TouchableOpacity
              key={method.id}
              onPress={() => handleMethodSelect(method.id)}
              className="bg-white rounded-xl p-4 border border-gray-200 flex-row items-center"
            >
              <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
                <IconComponent size={24} color="#6b7280" />
              </View>
              <View className="flex-1">
                <Text className="font-montserrat-semibold text-gray-900">
                  {method.name}
                </Text>
                <Text className="font-montserrat text-sm text-gray-600">
                  {method.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderPaymentDetails = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method) return null;

    return (
      <View className="flex-1">
        <TouchableOpacity
          onPress={() => setPaymentStep('select')}
          className="flex-row items-center mb-6"
        >
          <ArrowLeft size={20} color="#6b7280" />
          <Text className="font-montserrat text-gray-600 ml-2">
            Changer de méthode
          </Text>
        </TouchableOpacity>

        <Text className="font-montserrat-bold text-xl text-gray-900 mb-6">
          Paiement via {method.name}
        </Text>

        <View className="bg-primary-50 rounded-xl p-4 mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="font-montserrat-semibold text-gray-900">
              Montant à payer
            </Text>
            <Text className="font-montserrat-bold text-xl text-primary-500">
              {orderAmount}
            </Text>
          </View>
        </View>

        {method.type === 'mobile_money' && (
          <View className="mb-6">
            <Text className="font-montserrat-semibold text-gray-900 mb-2">
              Numéro de téléphone
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 font-montserrat"
              placeholder="+243 XXX XXX XXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Text className="font-montserrat text-sm text-gray-600 mt-2">
              Vous recevrez un code de confirmation sur ce numéro
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handlePayment}
          disabled={isProcessing}
          className="bg-primary-500 rounded-xl py-4"
        >
          <Text className="text-white font-montserrat-bold text-center text-lg">
            {isProcessing ? 'Traitement...' : `Payer ${orderAmount}`}
          </Text>
        </TouchableOpacity>

        <View className="mt-6 p-4 bg-blue-50 rounded-xl">
          <Text className="font-montserrat-semibold text-blue-800 mb-2">
            Instructions de paiement :
          </Text>
          <Text className="font-montserrat text-sm text-blue-700">
            1. Composez le code USSD sur votre téléphone{'\n'}
            2. Entrez le montant et confirmez{'\n'}
            3. Saisissez votre code PIN{'\n'}
            4. Attendez la confirmation
          </Text>
        </View>
      </View>
    );
  };

  const renderProcessing = () => (
    <View className="flex-1 items-center justify-center">
      <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-6">
        <DollarSign size={32} color="#f59e0b" />
      </View>
      <Text className="font-montserrat-bold text-xl text-gray-900 mb-2">
        Traitement du paiement
      </Text>
      <Text className="font-montserrat text-gray-600 text-center">
        Veuillez patienter pendant que nous traitons votre paiement...
      </Text>
    </View>
  );

  const renderSuccess = () => (
    <View className="flex-1 items-center justify-center">
      <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
        <CheckCircle size={32} color="#22c55e" />
      </View>
      <Text className="font-montserrat-bold text-xl text-gray-900 mb-2">
        Paiement réussi !
      </Text>
      <Text className="font-montserrat text-gray-600 text-center mb-8">
        Votre paiement de {orderAmount} a été traité avec succès.
      </Text>
      
      <TouchableOpacity
        onPress={handleSuccess}
        className="bg-primary-500 rounded-xl py-4 px-8"
      >
        <Text className="text-white font-montserrat-bold text-lg">
          Continuer
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 px-4 py-4 pt-12">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-montserrat-bold text-xl ml-4">
            Paiement
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {paymentStep === 'select' && renderSelectMethod()}
        {paymentStep === 'details' && renderPaymentDetails()}
        {paymentStep === 'processing' && renderProcessing()}
        {paymentStep === 'success' && renderSuccess()}
      </ScrollView>
    </SafeAreaView>
  );
}