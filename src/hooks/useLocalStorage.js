import { useState, useEffect, useCallback } from 'react';

const isClient = typeof window !== 'undefined';

const useLocalStorage = (key, initialValue, noState) => {
  const [state, updateState] = useState(() => {
    if (!isClient) {
      // We're SSRing; can't use local storage here!
      return [initialValue, () => {}];
    }

    try {
      const localStorageValue = window.localStorage.getItem(key);
      if (localStorageValue === null) {
        // Initialize local storage with default state
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        return JSON.parse(localStorageValue);
      }
    } catch {
      // User might be facing storage restrictions, or JSON
      // serialization/deserialization may have failed. We can just fall back
      // to using React state here.
      return initialValue;
    }
  });

  const localStorageChanged = e => {
    if (e.key === key) {
      updateState(JSON.parse(e.newValue));
    }
  };

  const setState = useCallback(
    value => {
      window.localStorage.setItem(key, JSON.stringify(value));
      updateState(value);
    },
    [key, updateState]
  );

  useEffect(() => {
    window.addEventListener('storage', localStorageChanged);
    return () => {
      window.removeEventListener('storage', localStorageChanged);
    };
  });

  return !noState ? [state, setState] : [setState];
};

export default useLocalStorage;
