import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>home</div>} />
          <Route path="/main" element={<div>main</div>} />
          <Route path="/addquestion" element={<div>addquestion</div>} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
