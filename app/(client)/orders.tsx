import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Package, MapPin, Clock, Star, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Order {
  id: string;
  transporterName: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'cancelled';
  pickup: string;
  destination: string;
  price: string;
  date: string;
  rating?: number;
  canRate?: boolean;
}

const mockOrders: Order[] = [
  {
    id: '1',
    transporterName: 'Jean Mukendi',
    status: 'in_progress',
    pickup: 'Gombe, Kinshasa',
    destination: 'Lemba, Kinshasa',
    price: '2000 FC',
    date: '2024-01-15 14:30',
  },
  {
    id: '2',
    transporterName: 'Marie Tshala',
    status: 'delivered',
    pickup: 'Bandalungwa, Kinshasa',
    destination: 'Matete, Kinshasa',
    price: '5000 FC',
    date: '2024-01-14 09:15',
    canRate: true,
  },
  {
    id: '3',
    transporterName: 'Pierre Ngoy',
    status: 'delivered',
    pickup: 'Kintambo, Kinshasa',
    destination: 'Ngiri-Ngiri, Kinshasa',
    price: '3500 FC',
    date: '2024-01-13 16:45',
    rating: 5,
  },
  {
    id: '4',
    transporterName: 'Grace Mbuyi',
    status: 'cancelled',
    pickup: 'Kintambo, Kinshasa',
    destination: 'Ngiri-Ngiri, Kinshasa',
    price: '3500 FC',
    date: '2024-01-12 16:45',
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'accepted': return 'bg-blue-100 text-blue-800';
    case 'in_progress': return 'bg-green-100 text-green-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente';
    case 'accepted': return 'Acceptée';
    case 'in_progress': return 'En cours';
    case 'delivered': return 'Livrée';
    case 'cancelled': return 'Annulée';
    default: return status;
  }
};

export default function OrdersScreen() {
  const router = useRouter();
  const [orders] = useState(mockOrders);

  const handleRateTransporter = (order: Order) => {
    router.push(`/others/client/rating?transporterId=${order.id}&transporterName=${order.transporterName}&orderId=${order.id}`);
  };

  const handleTrackingOrder = (order: Order) => {
    router.push(`/others/client/tracking?orderId=${order.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <Text className="text-white font-montserrat-bold text-xl">
          Mes Commandes
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {orders.map((order) => (
          <View key={order.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-montserrat-bold text-lg text-gray-900">
                {order.transporterName}
              </Text>
              <View className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                <Text className="font-montserrat-semibold text-xs">
                  {getStatusText(order.status)}
                </Text>
              </View>
            </View>

            <View className="space-y-2 mb-3">
              <View className="flex-row items-center">
                <MapPin size={16} color="#6b7280" />
                <Text className="font-montserrat text-gray-600 ml-2 flex-1">
                  De: {order.pickup}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                <MapPin size={16} color="#f59e0b" />
                <Text className="font-montserrat text-gray-600 ml-2 flex-1">
                  Vers: {order.destination}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Clock size={16} color="#6b7280" />
                <Text className="font-montserrat text-gray-600 ml-2">
                  {order.date}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat-bold text-xl text-yellow-500">
                {order.price}
              </Text>

              <View className="flex-row space-x-2">
                {order.status === 'in_progress' && (
                  <>
                    <TouchableOpacity className="bg-gray-800 px-4 py-2 rounded-lg">
                      <Phone size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handleTrackingOrder}
                      className="bg-yellow-500 px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white font-montserrat-semibold text-sm">
                        Suivre
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {order.status === 'delivered' && order.canRate && (
                  <TouchableOpacity 
                    onPress={() => handleRateTransporter(order)}
                    className="bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    <View className="flex-row items-center">
                      <Star size={16} color="white" />
                      <Text className="text-white font-montserrat-semibold text-sm ml-1">
                        Noter
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {order.rating && (
                  <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg">
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <Text className="font-montserrat-semibold text-gray-700 ml-1">
                      {order.rating}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}