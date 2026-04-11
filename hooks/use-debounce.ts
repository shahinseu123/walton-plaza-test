import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce"; // Standard industry library

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  // useMemo ensures the debounced function is only created once
  const debouncedFn = useMemo(() => {
    return debounce(callback, delay);
  }, [callback, delay]);

  // Cleanup: cancel pending executions if the component unmounts
  useEffect(() => {
    return () => debouncedFn.cancel();
  }, [debouncedFn]);

  return debouncedFn;
}