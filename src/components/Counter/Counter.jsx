import { useState } from "react";
import { Button } from "../Button/Button";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount(++count)}>count is {count}</Button>;
};
