import { useEffect, useState } from 'react';

export const useArrayNavigator = <T>(
  items: T[],
  initialIndex = 0,
  initialItem: T,
) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentItem, setCurrentItem] = useState(
    initialItem ? initialItem : items[initialIndex],
  );

  useEffect(() => {
    if (initialItem) {
      items.map((_, index) => {
        if (items[index] === initialItem) {
          setCurrentIndex(index);
        }
      });
    }
  }, [initialItem]);

  useEffect(() => {
    if (items.length) {
      const newItem = items[currentIndex];
      setCurrentItem(newItem);
    }
  }, [currentIndex, items]);

  return { currentIndex, currentItem, setCurrentIndex };
};
