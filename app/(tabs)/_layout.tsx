import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Truck, User, Home, History, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#6B7280', // gray-500
        tabBarLabelStyle: {
          fontFamily: 'Montserrat_500Medium',
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="client/index"
        options={{
          title: 'Client',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transporteur/index"
        options={{
          title: 'Transporteur',
          tabBarIcon: ({ color, size }) => (
            <Truck size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transporteur/courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transporteur/carte"
        options={{
          title: 'Carte',
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}