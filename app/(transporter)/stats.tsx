import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { DollarSign, TrendingUp, Package, Clock, Star } from 'lucide-react-native';

export default function TransporterStatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-yellow-500 px-4 py-4 pt-12">
        <Text className="text-white font-montserrat-bold text-xl">
          Revenus & Statistiques
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Today's earnings */}
        <View className="bg-gray-800 rounded-xl p-6 mb-4">
          <Text className="text-white font-montserrat text-lg mb-2">
            Revenus d'aujourd'hui
          </Text>
          <Text className="text-white font-montserrat-bold text-3xl mb-1">
            15,800 FC
          </Text>
          <Text className="text-white/80 font-montserrat text-sm">
            +23% par rapport à hier
          </Text>
        </View>

        {/* Stats cards */}
        <View className="flex-row space-x-3 mb-4">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-2">
              <Package size={20} color="#f59e0b" />
              <Text className="font-montserrat-bold text-lg text-gray-900">8</Text>
            </View>
            <Text className="font-montserrat text-sm text-gray-600">
              Courses aujourd'hui
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-2">
              <Clock size={20} color="#22c55e" />
              <Text className="font-montserrat-bold text-lg text-gray-900">6h</Text>
            </View>
            <Text className="font-montserrat text-sm text-gray-600">
              Temps actif
            </Text>
          </View>
        </View>

        {/* Weekly earnings */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-montserrat-bold text-lg text-gray-900">
              Revenus de la semaine
            </Text>
            <TrendingUp size={20} color="#22c55e" />
          </View>

          <Text className="font-montserrat-bold text-2xl text-gray-900 mb-2">
            87,500 FC
          </Text>

          <View className="space-y-3">
            {[
              { day: 'Lundi', amount: '12,300 FC', trips: 6 },
              { day: 'Mardi', amount: '18,700 FC', trips: 9 },
              { day: 'Mercredi', amount: '14,200 FC', trips: 7 },
              { day: 'Jeudi', amount: '16,500 FC', trips: 8 },
              { day: 'Vendredi', amount: '25,800 FC', trips: 12 },
              { day: 'Samedi', amount: '15,800 FC', trips: 8 },
              { day: 'Dimanche', amount: '0 FC', trips: 0 },
            ].map((item, index) => (
              <View key={index} className="flex-row items-center justify-between">
                <Text className="font-montserrat text-gray-700">
                  {item.day}
                </Text>
                <View className="flex-row items-center space-x-2">
                  <Text className="font-montserrat text-sm text-gray-600">
                    {item.trips} courses
                  </Text>
                  <Text className="font-montserrat-semibold text-gray-900">
                    {item.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Performance
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Star size={20} color="#f59e0b" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  Note moyenne
                </Text>
              </View>
              <Text className="font-montserrat-bold text-gray-900">4.9</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Package size={20} color="#6b7280" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  Courses totales
                </Text>
              </View>
              <Text className="font-montserrat-bold text-gray-900">142</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <TrendingUp size={20} color="#22c55e" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  Taux d'acceptation
                </Text>
              </View>
              <Text className="font-montserrat-bold text-green-600">94%</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <DollarSign size={20} color="#f59e0b" />
                <Text className="font-montserrat text-gray-700 ml-3">
                  Revenus total
                </Text>
              </View>
              <Text className="font-montserrat-bold text-yellow-500">
                425,300 FC
              </Text>
            </View>
          </View>
        </View>

        {/* Monthly goals */}
        <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <Text className="font-montserrat-bold text-lg text-gray-900 mb-4">
            Objectifs du mois
          </Text>

          <View className="space-y-3 mb-12">
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-montserrat text-gray-700">
                  Revenus (350,000 FC)
                </Text>
                <Text className="font-montserrat-semibold text-yellow-500">
                  68%
                </Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2">
                <View className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }} />
              </View>
            </View>

            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-montserrat text-gray-700">
                  Courses (180)
                </Text>
                <Text className="font-montserrat-semibold text-green-500">
                  79%
                </Text>
              </View>
              <View className="bg-gray-200 rounded-full h-2">
                <View className="bg-green-500 h-2 rounded-full" style={{ width: '79%' }} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 90 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}