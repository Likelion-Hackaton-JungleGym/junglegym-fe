import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/page";
import RootLayout from "./shared/layouts/RootLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
