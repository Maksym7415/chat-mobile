import {useEffect, useState} from 'react';

export function useDebounce(value, delay) {
  // STATES
  const [debouncedValue, setDebouncedValue] = useState(value);

  // USEEFFECTS
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
