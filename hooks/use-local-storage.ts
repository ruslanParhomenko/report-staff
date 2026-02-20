import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function useLocalStorageForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  key: string,
) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
    setIsLoaded(true);
  }, [form, key]);

  const watchAllFields = form.watch();

  useEffect(() => {
    if (isLoaded && watchAllFields) {
      localStorage.setItem(key, JSON.stringify(watchAllFields));
    }
  }, [watchAllFields, isLoaded, key]);

  return { isLoaded };
}
