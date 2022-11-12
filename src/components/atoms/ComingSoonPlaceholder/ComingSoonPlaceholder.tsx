import React from 'react';
import { Text } from 'react-native';
import { Ghost } from 'react-kawaii/lib/native/';
import { spacing } from '../../../design/tokens';
import { Flex, Surface, VStack } from '@react-native-material/core';
import { styles } from './ComingSoonPlaceholder.style';
import Animated, {
  withSequence,
  withTiming,
  withRepeat,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ComingSoonPlaceholderProps {
  content?: string;
}

export const ComingSoonPlaceholder = ({
  content,
}: ComingSoonPlaceholderProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(
            withSequence(
              withTiming(-25, { duration: 1000 }),
              withTiming(-15, { duration: 1000 }),
            ),
            -1,
            true,
          ),
        },
      ],
    };
  });

  return (
    <Flex style={styles.background} fill center>
      <VStack spacing={spacing.md} center>
        <Surface elevation={4} style={styles.iconCircleBackground}>
          <Animated.View style={[animatedStyles]}>
            <Ghost size={245} mood="happy" color="#E0E4E8" />
          </Animated.View>
        </Surface>
        <Text style={styles.title}>COMING SOON</Text>
        <Text style={styles.content}>
          We're currently working on this feature.
        </Text>
        {content && <Text style={styles.content}>{content}</Text>}
      </VStack>
    </Flex>
  );
};
