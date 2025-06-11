import React from 'react';
import { View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Car, Bike, MapPin } from 'lucide-react-native';

interface TransporterMarkerProps {
  transporter: {
    id: string;
    name: string;
    vehicleType: string;
    latitude: number;
    longitude: number;
    photo?: string;
  };
  onPress?: () => void;
}

const TransporterMarker: React.FC<TransporterMarkerProps> = ({ transporter, onPress }) => {
  const getVehicleIcon = () => {
    const vehicleType = transporter.vehicleType.toLowerCase();
    if (vehicleType.includes('moto') || vehicleType.includes('bike')) {
      return <Bike size={24} color="#f59e0b" fill="#f59e0b" />;
    } else {
      return <Car size={24} color="#f59e0b" fill="#f59e0b" />;
    }
  };

  const driverPhoto = transporter.photo || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <Marker
      coordinate={{
        latitude: transporter.latitude,
        longitude: transporter.longitude,
      }}
      onPress={onPress}
      anchor={{ x: 0.5, y: 1 }}
      style={{ overflow: 'visible' }}
    >
      <View >
        {/* Driver Photo */}
        <View className="flex items-center justify-start " style={{ width: 33, height: 33 }}>
          <Image
            source={ require('@/assets/images/card-2.png') }
            className="w-full h-full"                                                                                                                                                                                                                                                          
            resizeMode="contain"
          />
        </View>
        {/* Vehicle Icon */}
        
        {/* <MapPin size={16} color="#6b7280" /> */}
      </View>
    </Marker>
  );
};

export default TransporterMarker;