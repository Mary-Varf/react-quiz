export const delayFn = async (delay = 1000): Promise<void> => {
  return await new Promise((resolve) => setTimeout(resolve, delay));
};
