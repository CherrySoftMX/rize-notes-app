import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { styles } from '@atoms/AntiquityFilterOptionChip/AntiquityFilterOptionChip.style';
import { Surface } from '@react-native-material/core';
import { border } from '../../../design/tokens';

interface AntiquityFilterOptionChipProps extends TouchableOpacityProps {
  label: string;
  isSelected: boolean;
}

export const AntiquityFilterOptionChip = ({
  label,
  isSelected,
  ...rest
}: AntiquityFilterOptionChipProps) => {
  return (
    <TouchableOpacity {...rest} style={styles.contentContainer}>
      <Surface elevation={4} style={{ borderRadius: border.radius.xl }}>
        <View style={[styles.defaultLabel, isSelected && styles.selectedLabel]}>
          <Text style={[styles.defaultText, isSelected && styles.selectedText]}>
            {label}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};
