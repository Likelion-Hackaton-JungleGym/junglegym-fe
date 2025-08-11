import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./shared/layouts/RootLayout";
import JungleTownPage from "./pages/jungletown/JungleTownPage";
import JunglePeoplePage from "./pages/junglepeople/JunglePeoplePage";
import JunglechatPage from "./pages/junglechat/JunglechatPage";
import JungleSoundPage from "./pages/junglesound/JungleSoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<JungleTownPage />} />
          <Route path="/junglepeople" element={<JunglePeoplePage />} />
          <Route path="/junglechat" element={<JunglechatPage />} />
          <Route path="/junglesound" element={<JungleSoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
