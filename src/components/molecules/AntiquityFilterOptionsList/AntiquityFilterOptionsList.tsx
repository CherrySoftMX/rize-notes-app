import React from 'react';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { AntiquityFilterOptionChip } from '@atoms/AntiquityFilterOptionChip';
import { ScrollView, View } from 'react-native';
import {
  ALL_TIME,
  AntiquityOption,
  antiquityOptions,
} from '../../../library/constants';

interface AntiquityFilterOptionsListProps {
  selectedOption?: AntiquityOption;
  onOptionPressed?: (option: AntiquityOption) => void;
}

export const AntiquityFilterOptionsList = ({
  selectedOption = ALL_TIME,
  onOptionPressed = () => {},
}: AntiquityFilterOptionsListProps) => {
  const { currentIndex, setCurrentIndex } = useArrayNavigator(
    antiquityOptions,
    0,
    selectedOption,
  );

  return (
    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {antiquityOptions.map((option, index) => (
          <AntiquityFilterOptionChip
            key={index}
            label={option.label}
            isSelected={currentIndex === index}
            onPress={() => {
              onOptionPressed(option);
              setCurrentIndex(index);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
