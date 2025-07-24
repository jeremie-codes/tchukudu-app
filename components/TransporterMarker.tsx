import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Car, Bike } from 'lucide-react-native';

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
      return <Bike size={20} color="#ffffff" />;
    } else {
      return <Car size={20} color="#ffffff" />;
    }
  };


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
      <View className="items-center">
        {/* Vehicle Icon with background */}
        <View className="w-10 h-10 bg-primary-500 rounded-full items-center justify-center border-2 border-white shadow-lg">
          {getVehicleIcon()}
        </View>
        {/* Small triangle pointer */}
        <View 
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 6,
            borderRightWidth: 6,
            borderTopWidth: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: '#f59e0b',
            marginTop: -2
          }}
        />
      </View>
    </Marker>
  );
};

export default TransporterMarker;