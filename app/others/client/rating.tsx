import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Clock, Package, MessageCircle } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface RatingCriteria {
  id: string;
  label: string;
  rating: number;
}

const ratingCriteria: RatingCriteria[] = [
  { id: 'punctuality', label: 'Ponctualité', rating: 0 },
  { id: 'communication', label: 'Communication', rating: 0 },
  { id: 'care', label: 'Soin du colis', rating: 0 },
  { id: 'professionalism', label: 'Professionnalisme', rating: 0 }
];

const quickComments = [
  'Service excellent',
  'Très professionnel',
  'Livraison rapide',
  'Bon contact',
  'Colis bien protégé',
  'À recommander'
];

export default function RatingScreen() {
  const router = useRouter();
  const { transporterId, transporterName, orderId } = useLocalSearchParams();
  const [overallRating, setOverallRating] = useState(0);
  const [criteria, setCriteria] = useState(ratingCriteria);
  const [comment, setComment] = useState('');
  const [selectedQuickComments, setSelectedQuickComments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transporterInfo = {
    name: transporterName as string || 'Jean Mukendi',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    vehicleType: 'Moto',
    orderDate: '15 janvier 2024'
  };

  const handleStarPress = (rating: number, type: 'overall' | string) => {
    if (type === 'overall') {
      setOverallRating(rating);
    } else {
      setCriteria(prev => 
        prev.map(item => 
          item.id === type ? { ...item, rating } : item
        )
      );
    }
  };

  const renderStars = (currentRating: number, onPress: (rating: number) => void, size: number = 24) => {
    return (
      <View className="flex-row">
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(index + 1)}
            className="mr-1"
          >
            <Star
              size={size}
              color="#f59e0b"
              fill={index < currentRating ? "#f59e0b" : "transparent"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleQuickCommentToggle = (commentText: string) => {
    setSelectedQuickComments(prev => {
      if (prev.includes(commentText)) {
        return prev.filter(c => c !== commentText);
      } else {
        return [...prev, commentText];
      }
    });
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      Alert.alert('Erreur', 'Veuillez donner une note globale');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi de l'évaluation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const finalComment = [
        ...selectedQuickComments,
        comment.trim()
      ].filter(Boolean).join('. ');

      Alert.alert(
        'Évaluation envoyée',
        `Merci pour votre évaluation de ${overallRating} étoile(s) !`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(client)/orders')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'évaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Très mauvais';
      case 2: return 'Mauvais';
      case 3: return 'Correct';
      case 4: return 'Bon';
      case 5: return 'Excellent';
      default: return 'Non noté';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    if (rating >= 1) return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-montserrat-bold text-xl ml-4">
            Évaluer le transporteur
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4" >
        {/* Transporter Info */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center">
            <Image
              source={{ uri: transporterInfo.photo }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="font-montserrat-bold text-lg text-gray-900">
                {transporterInfo.name}
              </Text>
              <Text className="font-montserrat text-gray-600">
                {transporterInfo.vehicleType} • {transporterInfo.orderDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Overall Rating */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4 text-center">
            Note globale
          </Text>
          
          <View className="items-center mb-4">
            {renderStars(overallRating, (rating) => handleStarPress(rating, 'overall'), 32)}
            <Text className={`font-montserrat-semibold text-lg mt-2 ${getRatingColor(overallRating)}`}>
              {getRatingText(overallRating)}
            </Text>
          </View>
        </View>

        {/* Detailed Criteria */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Évaluation détaillée
          </Text>
          
          {criteria.map((criterion) => (
            <View key={criterion.id} className="flex-row items-center justify-between mb-4">
              <Text className="font-montserrat text-gray-700 flex-1">
                {criterion.label}
              </Text>
              <View className="flex-row items-center">
                {renderStars(criterion.rating, (rating) => handleStarPress(rating, criterion.id), 20)}
              </View>
            </View>
          ))}
        </View>

        {/* Quick Comments */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Commentaires rapides
          </Text>
          
          <View className="flex-row flex-wrap gap-2">
            {quickComments.map((commentText) => (
              <TouchableOpacity
                key={commentText}
                onPress={() => handleQuickCommentToggle(commentText)}
                className={`px-3 py-2 rounded-full border ${
                  selectedQuickComments.includes(commentText)
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Text className={`font-montserrat text-sm ${
                  selectedQuickComments.includes(commentText)
                    ? 'text-yellow-500'
                    : 'text-gray-600'
                }`}>
                  {commentText}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Comment */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Commentaire personnalisé
          </Text>
          
          <View className="flex-row items-start bg-gray-50 rounded-xl px-4 py-4">
            <MessageCircle size={20} color="#6b7280" className="mt-1" />
            <TextInput
              className="flex-1 ml-3 font-montserrat"
              placeholder="Partagez votre expérience avec ce transporteur..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />
          </View>
          
          <Text className="font-montserrat text-sm text-gray-500 mt-2">
            {comment.length}/500 caractères
          </Text>
        </View>

        {/* Tips Section */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6">
          <Text className="font-montserrat-semibold text-blue-800 mb-2">
            💡 Conseils pour une bonne évaluation
          </Text>
          <Text className="font-montserrat text-sm text-blue-700">
            • Soyez honnête et constructif{'\n'}
            • Mentionnez les points positifs et les améliorations{'\n'}
            • Votre avis aide les autres clients et le transporteur{'\n'}
            • Les évaluations sont publiques et anonymes
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || overallRating === 0}
          className={`rounded-xl py-4 ${
            isSubmitting || overallRating === 0
              ? 'bg-gray-300'
              : 'bg-yellow-500'
          }`}
        >
          <Text className="text-white font-montserrat-bold text-center text-lg">
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer l\'évaluation'}
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 py-3" style={{ paddingBottom: 50 }}
        >
          <Text className="text-gray-500 font-montserrat text-center">
            Évaluer plus tard
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}