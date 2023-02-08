import { useEffect, useState } from "react";

const useDebounce = (inputValue: string, timeout = 300) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(inputValue);
    }, timeout);
    return () => clearTimeout(timer);
  }, [inputValue, timeout]);

  return value;
};

export default useDebounce;
