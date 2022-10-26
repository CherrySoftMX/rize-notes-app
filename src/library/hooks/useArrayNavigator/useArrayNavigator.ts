import { useEffect, useState } from 'react';

export const useArrayNavigator = <T>(items: T[], initialIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentItem, setCurrentItem] = useState(items[initialIndex]);

  useEffect(() => {
    if (items.length) {
      const newItem = items[currentIndex];
      setCurrentItem(newItem);
    }
  }, [currentIndex, items]);

  return { currentIndex, currentItem, setCurrentIndex };
};
