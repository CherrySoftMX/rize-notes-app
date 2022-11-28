import React from 'react';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { AntiquityFilterOptionChip } from '@atoms/AntiquityFilterOptionChip';
import { ScrollView, View } from 'react-native';

const filterOptions = ['Last week', 'Last month', 'Last 6 months', 'Last year'];

interface AntiquityFilterOptionsListProps {
  mHorizontal?: number;
  onClick: (index: number) => void;
}

export const AntiquityFilterOptionsList = ({
  mHorizontal = 10,
  onClick,
}: AntiquityFilterOptionsListProps) => {
  const { currentIndex, setCurrentIndex } = useArrayNavigator(
    filterOptions,
    0,
    null,
  );

  return (
    <View style={{ marginHorizontal: mHorizontal, marginBottom: 10 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {filterOptions.map((option, index) => (
          <AntiquityFilterOptionChip
            key={index}
            label={option}
            isSelected={currentIndex === index}
            onPress={() => {
              onClick(index);
              setCurrentIndex(index);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
