import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import Colors from '@/constants/Colors';

type PickerItem = {
  label: string;
  value: string;
};

type PickerProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  placeholder?: string;
};

export const Picker: React.FC<PickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
}) => {
  return (
    <View className="bg-white border border-gray-300 rounded-md overflow-hidden">
      <RNPicker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {placeholder && (
          <RNPicker.Item 
            label={placeholder} 
            value="" 
            color="#9CA3AF" // gray-400
          />
        )}
        {items.map((item) => (
          <RNPicker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            color="#111827" // gray-900
          />
        ))}
      </RNPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    height: 50,
    fontFamily: 'Montserrat_400Regular',
  },
});