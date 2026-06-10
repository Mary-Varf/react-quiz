import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Button } from "./components/Button/Button";
import { Counter } from "./components/Counter/Counter";
import { List } from "./List";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <Counter />
        <List />
      </section>
    </>
  );
}

export default App;
