import React from 'react';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { AntiquityFilterOptionChip } from '@atoms/AntiquityFilterOptionChip';
import { ScrollView, View } from 'react-native';

const filterOptions = ['Last week', 'Last month', 'Last 6 months', 'Last year'];

export const AntiquityFilterOptionsList = () => {
  const { currentIndex, setCurrentIndex } = useArrayNavigator(filterOptions);

  return (
    <View style={{marginHorizontal: 10, marginBottom: 10}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {filterOptions.map((option, index) => (
          <AntiquityFilterOptionChip
            key={index}
            label={option}
            isSelected={currentIndex === index}
            onPress={() => setCurrentIndex(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
