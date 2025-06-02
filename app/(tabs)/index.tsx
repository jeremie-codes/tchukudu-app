import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Truck, Package, Users, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary pt-12 pb-4 px-4 rounded-b-3xl shadow-md">
        <Text className="text-3xl font-montserrat-bold text-white">Chukudu</Text>
        <Text className="text-base font-montserrat text-white mt-2">
          Votre solution de transport à portée de main
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Services */}
        <Text className="text-xl font-montserrat-bold text-gray-800 mb-4">
          Nos services
        </Text>

        <View className="flex-row justify-between mb-8">
          <TouchableOpacity 
            className="bg-primary-light rounded-xl p-4 w-[48%] items-center"
            activeOpacity={0.7}
          >
            <Truck size={32} color={Colors.primary} />
            <Text className="font-montserrat-medium text-gray-800 mt-2 text-center">
              Transport Express
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-secondary-light rounded-xl p-4 w-[48%] items-center"
            activeOpacity={0.7}
          >
            <Package size={32} color={Colors.secondary} />
            <Text className="font-montserrat-medium text-gray-800 mt-2 text-center">
              Livraison Marchandises
            </Text>
          </TouchableOpacity>
        </View>

        {/* Call to Action */}
        <View className="bg-gray-100 rounded-xl p-6 mb-8">
          <Text className="text-lg font-montserrat-bold text-gray-800 mb-3">
            Besoin d'un transport?
          </Text>
          <Text className="font-montserrat text-gray-600 mb-4">
            Commandez rapidement et facilement sans inscription préalable.
          </Text>
          <Link href="/client" asChild>
            <TouchableOpacity 
              className="bg-primary py-3 rounded-lg items-center"
              activeOpacity={0.7}
            >
              <Text className="font-montserrat-bold text-white">
                Commander maintenant
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Transporteur Section */}
        <View className="bg-gray-100 rounded-xl p-6 mb-8">
          <Text className="text-lg font-montserrat-bold text-gray-800 mb-3">
            Vous êtes transporteur?
          </Text>
          <Text className="font-montserrat text-gray-600 mb-4">
            Rejoignez notre réseau et recevez des commandes.
          </Text>
          <Link href="/transporteur" asChild>
            <TouchableOpacity 
              className="bg-secondary py-3 rounded-lg items-center"
              activeOpacity={0.7}
            >
              <Text className="font-montserrat-bold text-white">
                Espace transporteur
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* App Features */}
        <Text className="text-xl font-montserrat-bold text-gray-800 mb-4">
          Pourquoi choisir Chukudu?
        </Text>

        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <View className="bg-primary-light p-2 rounded-full mr-3">
              <Users size={24} color={Colors.primary} />
            </View>
            <View>
              <Text className="font-montserrat-medium text-gray-800">
                Réseau de confiance
              </Text>
              <Text className="font-montserrat text-gray-600">
                Transporteurs vérifiés et évalués
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="bg-secondary-light p-2 rounded-full mr-3">
              <Star size={24} color={Colors.secondary} />
            </View>
            <View>
              <Text className="font-montserrat-medium text-gray-800">
                Service de qualité
              </Text>
              <Text className="font-montserrat text-gray-600">
                Suivi en temps réel de vos commandes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}