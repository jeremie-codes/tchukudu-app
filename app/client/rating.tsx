import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Star, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function RatingScreen() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleRating = (value: number) => {
    setRating(value);
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    
    // Simulate API call to submit rating
    setTimeout(() => {
      router.replace('/(tabs)/');
    }, 2000);
  };
  
  if (submitted) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-4">
        <View className="items-center">
          <CheckCircle size={80} color={Colors.secondary} />
          <Text className="text-2xl font-montserrat-bold text-gray-900 mt-6 text-center">
            Merci pour votre évaluation!
          </Text>
          <Text className="text-base font-montserrat text-gray-600 mt-2 text-center">
            Vous serez redirigé vers la page d'accueil...
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-white">
      <View className="p-4 pt-12">
        <Text className="text-2xl font-montserrat-bold text-gray-900 mb-2">
          Évaluez votre expérience
        </Text>
        
        <Text className="font-montserrat text-gray-600 mb-8">
          Votre avis nous aide à améliorer notre service
        </Text>
        
        <View className="items-center mb-8">
          <View className="flex-row mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                className="mx-2"
              >
                <Star
                  size={40}
                  color={star <= rating ? Colors.primary : '#D1D5DB'}
                  fill={star <= rating ? Colors.primary : 'none'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="font-montserrat text-gray-600">
            {rating === 0 ? 'Appuyez pour noter' :
             rating === 1 ? 'Décevant' :
             rating === 2 ? 'Moyen' :
             rating === 3 ? 'Satisfaisant' :
             rating === 4 ? 'Très bien' :
             'Excellent'}
          </Text>
        </View>
        
        <View className="mb-8">
          <Text className="font-montserrat-medium text-gray-800 mb-2">
            Commentaire (optionnel)
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-md px-3 py-3 font-montserrat"
            value={comment}
            onChangeText={setComment}
            placeholder="Partagez votre expérience..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity
          className={`py-3 rounded-lg items-center ${
            rating === 0 ? 'bg-gray-400' : 'bg-primary'
          }`}
          onPress={handleSubmit}
          disabled={rating === 0}
          activeOpacity={0.7}
        >
          <Text className="font-montserrat-bold text-white">
            Soumettre mon évaluation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}