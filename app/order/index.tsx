import React, { useState } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OrderForm from '@/components/OrderForm';

export default function OrderScreen() {
  const router = useRouter();
  const { transporterId } = useLocalSearchParams();

  const handleOrderSubmit = (orderData: any) => {
    Alert.alert(
      'Commande confirmée',
      'Votre commande a été envoyée au transporteur. Vous recevrez une notification dès qu\'elle sera acceptée.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(client)/tracking')
        }
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <OrderForm
        transporterId={transporterId as string}
        onSubmit={handleOrderSubmit}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}