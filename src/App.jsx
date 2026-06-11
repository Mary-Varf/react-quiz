import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<div>main</div>} />
          <Route path="/addquestion" element={<div>addquestion</div>} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
