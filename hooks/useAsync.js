import { useState, useCallback } from 'react';

function useAsync(fn) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (...args) => {
      setLoading(true);
      setValue(null);
      setError(null);

      return fn(...args)
        .then((value) => {
          setValue(value);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    },
    [fn]
  );

  return { execute, loading, value, error };
}

export default useAsync;
