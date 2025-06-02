import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Clock, CheckCircle, AlertTriangle, Truck } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type Course = {
  id: string;
  date: string;
  time: string;
  client: string;
  pickup: string;
  destination: string;
  status: 'completed' | 'cancelled' | 'in_progress';
  amount: string;
};

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'in_progress'>('all');
  
  const courses: Course[] = [
    {
      id: 'ORD-1234',
      date: '12/06/2025',
      time: '14:30',
      client: 'Marie Dubois',
      pickup: 'Boulevard du 30 Juin, Kinshasa',
      destination: 'Avenue Lukusa, Kinshasa',
      status: 'completed',
      amount: '15.000 FC',
    },
    {
      id: 'ORD-1235',
      date: '11/06/2025',
      time: '09:15',
      client: 'Jean Ngandu',
      pickup: 'Avenue de la Justice, Kinshasa',
      destination: 'Avenue du Commerce, Kinshasa',
      status: 'completed',
      amount: '20.000 FC',
    },
    {
      id: 'ORD-1236',
      date: '10/06/2025',
      time: '16:45',
      client: 'Paul Mutombo',
      pickup: 'Boulevard Lumumba, Kinshasa',
      destination: 'Avenue des Poids Lourds, Kinshasa',
      status: 'cancelled',
      amount: '0 FC',
    },
    {
      id: 'ORD-1237',
      date: '13/06/2025',
      time: '10:00',
      client: 'Sophie Mbala',
      pickup: 'Avenue Kasavubu, Kinshasa',
      destination: 'Avenue de l\'Université, Kinshasa',
      status: 'in_progress',
      amount: '18.000 FC',
    },
  ];
  
  const filteredCourses = 
    activeTab === 'all' 
      ? courses 
      : activeTab === 'completed'
        ? courses.filter(c => c.status === 'completed')
        : courses.filter(c => c.status === 'in_progress');
  
  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity 
      className="bg-white mb-3 rounded-xl overflow-hidden border border-gray-200"
      activeOpacity={0.7}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-montserrat-bold text-gray-800">
            {item.id}
          </Text>
          
          <View 
            className={`py-1 px-3 rounded-full ${
              item.status === 'completed' 
                ? 'bg-secondary-light' 
                : item.status === 'cancelled'
                  ? 'bg-danger-light'
                  : 'bg-primary-light'
            }`}
          >
            <Text 
              className={`font-montserrat-medium text-xs ${
                item.status === 'completed' 
                  ? 'text-secondary-dark' 
                  : item.status === 'cancelled'
                    ? 'text-danger-dark'
                    : 'text-primary-dark'
              }`}
            >
              {item.status === 'completed' 
                ? 'Terminée' 
                : item.status === 'cancelled'
                  ? 'Annulée'
                  : 'En cours'}
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center mb-2">
          <Calendar size={16} color="#6B7280" className="mr-2" />
          <Text className="font-montserrat text-gray-600">
            {item.date} • {item.time}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-2">
          <Truck size={16} color="#6B7280" className="mr-2" />
          <Text className="font-montserrat text-gray-600">
            Client: {item.client}
          </Text>
        </View>
        
        <View className="mb-3">
          <Text className="font-montserrat text-sm text-gray-500">Récupération:</Text>
          <Text className="font-montserrat text-gray-800">{item.pickup}</Text>
        </View>
        
        <View className="mb-3">
          <Text className="font-montserrat text-sm text-gray-500">Destination:</Text>
          <Text className="font-montserrat text-gray-800">{item.destination}</Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="font-montserrat text-sm text-gray-500">Montant:</Text>
          <Text className="font-montserrat-bold text-primary text-lg">{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary pt-12 pb-4 px-4">
        <Text className="text-2xl font-montserrat-bold text-white">Mes Courses</Text>
      </View>
      
      <View className="p-4">
        <View className="flex-row bg-gray-100 rounded-lg p-1 mb-4">
          <TouchableOpacity 
            className={`flex-1 py-2 ${
              activeTab === 'all' ? 'bg-white rounded-md shadow' : ''
            }`}
            onPress={() => setActiveTab('all')}
          >
            <Text 
              className={`text-center font-montserrat-medium ${
                activeTab === 'all' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Toutes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 ${
              activeTab === 'in_progress' ? 'bg-white rounded-md shadow' : ''
            }`}
            onPress={() => setActiveTab('in_progress')}
          >
            <Text 
              className={`text-center font-montserrat-medium ${
                activeTab === 'in_progress' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              En cours
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2 ${
              activeTab === 'completed' ? 'bg-white rounded-md shadow' : ''
            }`}
            onPress={() => setActiveTab('completed')}
          >
            <Text 
              className={`text-center font-montserrat-medium ${
                activeTab === 'completed' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              Terminées
            </Text>
          </TouchableOpacity>
        </View>
        
        {filteredCourses.length === 0 ? (
          <View className="flex-1 justify-center items-center p-8">
            <AlertTriangle size={48} color="#9CA3AF" />
            <Text className="font-montserrat-medium text-gray-600 mt-4 text-center">
              Aucune course trouvée dans cette catégorie
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredCourses}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}