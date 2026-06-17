import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

export const useFetch = (
  callback: (arg: any) => void,
): [(...args: any[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = async (...args: any[]) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();

      const response = await callback([...args]);
      return response;
    } catch (e: any) {
      setError(e?.message);
      toast.error(e?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
