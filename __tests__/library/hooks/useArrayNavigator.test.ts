import { act, renderHook } from '@testing-library/react-native';
import { useArrayNavigator } from '@hooks/useArrayNavigator';

const build = () => {
  const { result } = renderHook(() =>
    useArrayNavigator(['first', 'second', 'third']),
  );
  return { result };
};

it('should update index', () => {
  const { result } = build();
  act(() => {
    result.current.setCurrentIndex(1);
  });
  expect(result.current.currentIndex).toBe(1);
});

it('should update selected item when current index is updated', () => {
  const { result } = build();
  act(() => {
    result.current.setCurrentIndex(1);
  });
  expect(result.current.currentItem).toBe('second');
});

export {};
