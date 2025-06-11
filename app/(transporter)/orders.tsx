import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Package, MapPin, Clock, DollarSign } from 'lucide-react-native';

interface TransporterOrder {
  id: string;
  clientName: string;
  status: 'completed' | 'in_progress' | 'pending';
  pickup: string;
  destination: string;
  price: string;
  date: string;
  distance: string;
}

const mockOrders: TransporterOrder[] = [
  {
    id: '1',
    clientName: 'Marie Kasongo',
    status: 'in_progress',
    pickup: 'Gombe, Kinshasa',
    destination: 'Lemba, Kinshasa',
    price: '3500 FC',
    date: '2024-01-15 14:30',
    distance: '5.2 km'
  },
  {
    id: '2',
    clientName: 'Jean Baptiste',
    status: 'completed',
    pickup: 'Bandalungwa, Kinshasa',
    destination: 'Matete, Kinshasa',
    price: '4500 FC',
    date: '2024-01-14 09:15',
    distance: '7.8 km'
  },
  {
    id: '3',
    clientName: 'Grace Mbuyi',
    status: 'completed',
    pickup: 'Kintambo, Kinshasa',
    destination: 'Ngiri-Ngiri, Kinshasa',
    price: '2800 FC',
    date: '2024-01-13 16:45',
    distance: '3.5 km'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'in_progress': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente';
    case 'in_progress': return 'En cours';
    case 'completed': return 'Terminée';
    default: return status;
  }
};

export default function TransporterOrdersScreen() {
  const [orders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') return order.status === 'in_progress';
    if (activeTab === 'completed') return order.status === 'completed';
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <Text className="text-white font-montserrat-bold text-xl">
          Mes Courses
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setActiveTab('all')}
          className={`flex-1 py-4 ${activeTab === 'all' ? 'border-b-2 border-yellow-500' : ''}`}
        >
          <Text className={`text-center font-montserrat-semibold ${
            activeTab === 'all' ? 'text-yellow-500' : 'text-gray-600'
          }`}>
            Toutes ({orders.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('active')}
          className={`flex-1 py-4 ${activeTab === 'active' ? 'border-b-2 border-yellow-500' : ''}`}
        >
          <Text className={`text-center font-montserrat-semibold ${
            activeTab === 'active' ? 'text-yellow-500' : 'text-gray-600'
          }`}>
            En cours ({orders.filter(o => o.status === 'in_progress').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('completed')}
          className={`flex-1 py-4 ${activeTab === 'completed' ? 'border-b-2 border-yellow-500' : ''}`}
        >
          <Text className={`text-center font-montserrat-semibold ${
            activeTab === 'completed' ? 'text-yellow-500' : 'text-gray-600'
          }`}>
            Terminées ({orders.filter(o => o.status === 'completed').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {filteredOrders.map((order) => (
          <View key={order.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-montserrat-bold text-lg text-gray-900">
                {order.clientName}
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

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Clock size={16} color="#6b7280" />
                  <Text className="font-montserrat text-gray-600 ml-2">
                    {order.date}
                  </Text>
                </View>

                <Text className="font-montserrat text-gray-600">
                  {order.distance}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-montserrat-bold text-xl text-yellow-500">
                {order.price}
              </Text>

              {order.status === 'in_progress' && (
                <TouchableOpacity className="bg-yellow-500 px-4 py-2 rounded-lg">
                  <Text className="text-white font-montserrat-semibold text-sm">
                    Continuer
                  </Text>
                </TouchableOpacity>
              )}

              {order.status === 'completed' && (
                <View className="flex-row items-center">
                  <DollarSign size={16} color="#22c55e" />
                  <Text className="font-montserrat-semibold text-green-600 ml-1">
                    Payé
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

          <View style={{ height: 90 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}