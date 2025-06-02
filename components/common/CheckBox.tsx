import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
  size?: number;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onPress,
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View 
        className={`
          ${checked ? 'bg-primary border-primary' : 'bg-white border-gray-400'} 
          rounded border flex items-center justify-center
        `}
        style={{ width: size, height: size }}
      >
        {checked && <Check size={size - 8} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
  );
};